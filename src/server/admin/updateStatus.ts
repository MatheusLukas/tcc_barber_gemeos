"use server";
import { db } from "@/src/db";
import { schedule } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";
import { createServerAction } from "zsa";

export const UpdateStatus = createServerAction()
	.input(
		z.object({
			id: z.string(),
			status: z.enum([
				"no_payed",
				"refunded",
				"canceled",
				"confirmed",
				"pending",
			]),
		}),
	)
	.handler(async ({ input }) => {
		await db
			.update(schedule)
			.set({
				status: input.status,
			})
			.where(eq(schedule.id, input.id));
	});
