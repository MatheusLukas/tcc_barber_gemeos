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
import { type SQL, and, asc, eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";
import { createServerAction } from "zsa";

// Helper functions to reduce handler complexity
function buildDateConditions(date?: string): SQL | undefined {
	if (!date) return undefined;

	console.log("Função buildDateConditions recebeu:", date);

	try {
		// Cria a data no formato YYYY-MM-DD às 00:00:00
		const startDate = new Date(`${date}T00:00:00`);
		// Cria a data no formato YYYY-MM-DD às 23:59:59
		const endDate = new Date(`${date}T23:59:59.999`);

		// Verifica se as datas são válidas
		if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
			console.error("Data inválida:", date);
			return undefined;
		}

		console.log("Data início:", startDate.toISOString());
		console.log("Data fim:", endDate.toISOString());

		// SQL para intervalo de datas (dia inteiro)
		return sql`${schedule.date} >= ${startDate.toISOString()} AND ${schedule.date} <= ${endDate.toISOString()}`;
	} catch (error) {
		console.error("Erro ao processar data:", error);
		return undefined;
	}
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

export const getSchedules = createServerAction()
	.input(
		z.object({
			jobId: z.array(z.string()).optional(),
			status: z
				.enum(["pending", "no_payed", "confirmed", "refunded", "canceled"])
				.optional(),
			date: z.string().optional(),
			responsible: z.array(z.string()).optional(),
			paymentMethod: z.array(z.string()).optional(),
		}),
	)
	.handler(async ({ input }) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		console.log("Input recebido:", input); // Log para debug

		// Start with base conditions
		const conditions: SQL[] = [];

		// Add filters if provided
		if (input) {
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

			// Add payment method filter if provided
			if (input.paymentMethod && input.paymentMethod.length > 0) {
				console.log(
					"Adicionando filtro de método de pagamento:",
					input.paymentMethod,
				);
				conditions.push(inArray(schedule.paymentMethod, input.paymentMethod));
			}

			// Add date filter if provided
			if (input.date) {
				console.log("Adicionando filtro de data:", input.date);
				const dateCondition = buildDateConditions(input.date);
				if (dateCondition) {
					conditions.push(dateCondition);
				}
			}

			// Process job filter
			if (input.jobId && input.jobId.length > 0) {
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
		}

		console.log("Condições finais:", conditions);

		// Query schedules with conditions (or all if no conditions)
		const scheduleReturning = await db
			.select()
			.from(schedule)
			.where(conditions.length ? and(...conditions) : undefined)
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
					status: schedule.status,
				};
			}),
		);
	});
