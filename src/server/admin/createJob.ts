"use server";
import { db } from "@/src/db";
import { jobs } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";
import { createServerAction } from "zsa";

export const createJob = createServerAction()
	.input(
		z.object({
			id: z.string().optional(),
			name: z.string(),
			price: z.number(),
		}),
	)
	.handler(async ({ input }) => {
		if (input.id) {
			await db
				.update(jobs)
				.set({ name: input.name, price: input.price })
				.where(eq(jobs.id, input.id));
		} else {
			await db.insert(jobs).values({
				name: input.name,
				price: input.price,
			});
		}
	});
