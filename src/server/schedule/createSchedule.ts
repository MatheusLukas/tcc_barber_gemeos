"use server";
import { db } from "@/src/db";
import { schedule, scheduleHasJobs } from "@/src/db/schema";
import z from "zod";
import { createServerAction } from "zsa";
import { getJobById } from "./getJobById";

export const createSchedule = createServerAction()
	.input(
		z.object({
			userId: z.string(),
			barberId: z.string(),
			date: z.coerce.date(),
			jobsId: z.array(z.string()),
			methodPayment: z.number(),
		}),
	)
	.handler(async ({ input }) => {
		const paymentMethod = {
			1: "MERCADO_PAGO",
			2: "DINHEIRO",
		} as const;

		const [data, _] = await getJobById({
			jobsId: input.jobsId,
		});

		const total_price =
			data?.reduce((acc, item) => {
				return acc + item.price;
			}, 0) || 0;

		const scheduleId = await db
			.insert(schedule)
			.values({
				userId: input.userId,
				barberId: input.barberId,
				date: input.date,
				price: total_price,
				paymentMethod:
					paymentMethod[input.methodPayment as keyof typeof paymentMethod],
			})
			.returning({ insertedId: schedule.id });

		console.log("scheduleId", scheduleId);

		data?.map(async (job) => {
			await db.insert(scheduleHasJobs).values({
				scheduleId: scheduleId[0].insertedId,
				jobId: job.id,
			});
		});
	});
