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
import { and, eq, gte, or } from "drizzle-orm";
import { createServerAction } from "zsa";

export const getSchedulePending = createServerAction().handler(async () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const scheduleReturning = await db
		.select()
		.from(schedule)
		.where(
			and(
				gte(schedule.date, today),
				or(eq(schedule.status, "pending"), eq(schedule.status, "no_payed")),
			),
		);

	const scheduleFormatted = await Promise.all(
		scheduleReturning.map(async (schedule) => {
			const barber = await db
				.select()
				.from(barbers)
				.where(eq(barbers.id, schedule.barberId));

			const userFinded = await db
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
				client: {
					name: userFinded[0].name,
					image: userFinded[0].image,
				},
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
					name: barber[0].name,
					image: barber[0].image,
				},
				job: job,
				paymentMethod: schedule.paymentMethod,
			};
		}),
	);

	return scheduleFormatted;
});
