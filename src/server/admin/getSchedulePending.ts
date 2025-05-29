"use server";
import { db } from "@/src/db";
import {
	barbers,
	jobs,
	schedule,
	scheduleHasJobs,
	user,
} from "@/src/db/schema";
import { formatNumberToCurrency } from "@/src/utils/formatNumberToCurrency";
import { type SQL, and, asc, eq, gte, inArray, or, sql } from "drizzle-orm";
import { z } from "zod";
import { createServerAction } from "zsa";

function buildDateConditions(date?: string): SQL | undefined {
	if (!date) return undefined;

	// Parse date in YYYY-MM-DD format
	const [year, month, day] = date.split("-").map(Number);
	if (!year || !month || !day) return undefined;

	// Create date objects for the start and end of the day
	const startDate = new Date(year, month - 1, day, 0, 0, 0, 0);
	const endDate = new Date(year, month - 1, day, 23, 59, 59, 999);

	// SQL for date range (full day)
	return sql`${schedule.date} >= ${startDate.toISOString()} AND ${schedule.date} <= ${endDate.toISOString()}`;
}

async function getJobFilteredIds(
	jobId?: string[],
): Promise<string[] | undefined> {
	if (!jobId) return undefined;

	const jobSchedules = await db
		.select({ scheduleId: scheduleHasJobs.scheduleId })
		.from(scheduleHasJobs)
		.where(inArray(scheduleHasJobs.jobId, jobId));

	return jobSchedules.map((item) => item.scheduleId);
}

export const getSchedulePending = createServerAction()
	.input(
		z.object({
			jobId: z.array(z.string()).optional(),
			status: z
				.enum(["pending", "no_payed", "confirmed", "refunded", "canceled"])
				.optional(),
			date: z.string().optional(),
			responsible: z.array(z.string()).optional(),
		}),
	)
	.handler(async ({ input }) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		console.log("Input recebido:", input); // Log para debug

		// Start with base conditions
		const conditions: SQL[] = [gte(schedule.date, today)];

		// Add default or filtered status
		if (!input || Object.keys(input).length === 0) {
			console.log("Usando filtro padrão: pending ou no_payed");
			conditions.push(
				sql`${schedule.status} = 'pending' OR ${schedule.status} = 'no_payed'`,
			);
		} else {
			// Add status filter if provided
			if (input.status) {
				console.log("Adicionando filtro de status:", input.status);
				conditions.push(eq(schedule.status, input.status));
			}

			// Add barber filter if provided
			if (input.responsible && input.responsible.length > 0) {
				console.log("Adicionando filtro de responsável:", input.responsible);
				conditions.push(inArray(schedule.barberId, input.responsible));
			}

			// Add date filter if provided
			if (input.date) {
				console.log("Adicionando filtro de data:", input.date);
				const dateCondition = buildDateConditions(input.date);
				if (dateCondition) {
					conditions.push(dateCondition);
				}
			}
		}

		// Process job filter
		if (input?.jobId && input.jobId.length > 0) {
			console.log("Adicionando filtro de serviço:", input.jobId);
			const filteredScheduleIds = await getJobFilteredIds(input.jobId);
			if (filteredScheduleIds) {
				if (filteredScheduleIds.length === 0) {
					console.log(
						"Nenhum agendamento encontrado com os serviços especificados",
					);
					return [];
				}
				conditions.push(inArray(schedule.id, filteredScheduleIds));
			}
		}

		console.log("Condições finais:", conditions);

		// Query schedules with all conditions
		const scheduleReturning = await db
			.select()
			.from(schedule)
			.where(and(...conditions))
			.orderBy(asc(schedule.date));

		console.log("Quantidade de resultados:", scheduleReturning.length);

		// Format results
		return Promise.all(
			scheduleReturning.map(async (schedule) => {
				const [barber] = await db
					.select()
					.from(barbers)
					.where(eq(barbers.id, schedule.barberId));

				const [userFinded] = await db
					.select()
					.from(user)
					.where(eq(user.id, schedule.userId));

				const job = await db
					.select({
						job: jobs.name,
					})
					.from(scheduleHasJobs)
					.where(eq(scheduleHasJobs.scheduleId, schedule.id))
					.innerJoin(jobs, eq(scheduleHasJobs.jobId, jobs.id));

				return {
					id: schedule.id,
					name: userFinded.name,
					image: userFinded.image,
					price: formatNumberToCurrency(schedule.price),
					date: schedule.date.toLocaleDateString("pt-BR", {
						day: "2-digit",
						month: "2-digit",
						year: "numeric",
					}),
					time: schedule.date.toLocaleTimeString("pt-BR", {
						hour: "2-digit",
						minute: "2-digit",
					}),
					barber: {
						name: barber.name,
						image: barber.image,
					},
					job,
					paymentMethod: schedule.paymentMethod,
				};
			}),
		);
	});

export const getUserSchedulePending = createServerAction()
	.input(
		z.object({
			userId: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const scheduleReturning = await db
			.select()
			.from(schedule)
			.where(
				and(
					eq(schedule.userId, input.userId),
					or(eq(schedule.status, "pending"), eq(schedule.status, "no_payed")),
					gte(schedule.date, today),
				),
			)
			.orderBy(asc(schedule.date));

		const scheduleFormatted = await Promise.all(
			scheduleReturning.map(async (schedule) => {
				const barber = await db
					.select()
					.from(barbers)
					.where(eq(barbers.id, schedule.barberId));

				const job = await db
					.select({
						job: jobs.name,
					})
					.from(scheduleHasJobs)
					.where(eq(scheduleHasJobs.scheduleId, schedule.id))
					.innerJoin(jobs, eq(scheduleHasJobs.jobId, jobs.id));

				return {
					id: schedule.id,
					date: schedule.date,
					barber: {
						name: barber[0].name,
						image: barber[0].image,
					},
					job: job,
					price: schedule.price,
					paymentMethod: schedule.paymentMethod,
					status: schedule.status,
				};
			}),
		);
		return scheduleFormatted;
	});

export const getUserSchedulesConcluded = createServerAction()
	.input(
		z.object({
			userId: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		const scheduleReturning = await db
			.select()
			.from(schedule)
			.where(
				and(
					eq(schedule.userId, input.userId),
					or(eq(schedule.status, "confirmed"), eq(schedule.status, "refunded")),
				),
			);

		const scheduleFormatted = await Promise.all(
			scheduleReturning.map(async (schedule) => {
				const barber = await db
					.select()
					.from(barbers)
					.where(eq(barbers.id, schedule.barberId));

				const job = await db
					.select({
						job: jobs.name,
					})
					.from(scheduleHasJobs)
					.where(eq(scheduleHasJobs.scheduleId, schedule.id))
					.innerJoin(jobs, eq(scheduleHasJobs.jobId, jobs.id));

				return {
					id: schedule.id,
					date: schedule.date,
					barber: {
						name: barber[0].name,
						image: barber[0].image,
					},
					job: job,
					price: schedule.price,
					paymentMethod: schedule.paymentMethod,
					status: schedule.status,
				};
			}),
		);
		return scheduleFormatted;
	});
