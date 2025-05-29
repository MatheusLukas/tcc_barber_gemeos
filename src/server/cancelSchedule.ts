"use server";
import { db } from "@/src/db";
import { schedule } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";
import { createServerAction } from "zsa";

export const cancelSchedule = createServerAction()
	.input(
		z.object({
			scheduleId: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		await db
			.update(schedule)
			.set({
				status: "canceled",
			})
			.where(eq(schedule.id, input.scheduleId));
	});
