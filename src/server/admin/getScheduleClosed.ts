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
import { eq, or } from "drizzle-orm";
import { createServerAction } from "zsa";

export const getScheduleClosed = createServerAction().handler(async () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const scheduleReturning = await db
		.select()
		.from(schedule)
		.where(
			or(
				eq(schedule.status, "canceled"),
				eq(schedule.status, "confirmed"),
				eq(schedule.status, "refunded"),
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
				name: userFinded[0].name,
				image: userFinded[0].image,
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
