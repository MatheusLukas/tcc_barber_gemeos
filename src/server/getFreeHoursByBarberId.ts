"use server";
import { db } from "@/src/db";
import { schedule } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";
import { createServerAction } from "zsa";

export const getFreeHoursByBarberd = createServerAction()
	.input(z.object({ barberId: z.string() }))
	.handler(async ({ input }) => {
		return await db
			.select({
				date: schedule.date,
			})
			.from(schedule)
			.where(eq(schedule.barberId, input.barberId));
	});
