"use server";
import { db } from "@/src/db";
import { schedule, scheduleHasJobs } from "@/src/db/schema";
import { and, eq } from "drizzle-orm";
import z from "zod";
import { createServerAction } from "zsa";
import { createOrder } from "../mercado-pago/create-order";
import { getJobById } from "./getJobById";

export const createSchedule = createServerAction()
	.input(
		z.object({
			barberId: z.string(),
			date: z.date(),
			jobsId: z.array(z.string()),
			methodPayment: z.number(),
			userId: z.string(),
			userName: z.string(),
			userEmail: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		const existingSchedule = await db
			.select()
			.from(schedule)
			.where(
				and(
					eq(schedule.barberId, input.barberId),
					eq(schedule.date, input.date),
				),
			);
		if (existingSchedule.length > 0) {
			throw "Já existe um agendamento para este barbeiro neste horário.";
		}

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
				status: "pending",
			})
			.returning({ insertedId: schedule.id });

		data?.map(async (job) => {
			await db.insert(scheduleHasJobs).values({
				scheduleId: scheduleId[0].insertedId,
				jobId: job.id,
			});
		});

		if (input.methodPayment === 1) {
			const [response, _] = await createOrder({
				email: input.userEmail,
				firstName: input.userName,
				priceTotal: total_price,
				items: data!.map((item) => ({
					categoryId: item.id,
					description: item.name,
					quantity: 1,
					unitPrice: item.price,
				})),
			});

			return response;
		}
	});
