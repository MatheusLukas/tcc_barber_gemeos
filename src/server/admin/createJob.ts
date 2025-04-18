"use server";
import { db } from "@/src/db";
import { jobs } from "@/src/db/schema";
import z from "zod";
import { createServerAction } from "zsa";

export const createJob = createServerAction()
	.input(
		z.object({
			name: z.string(),
			price: z.number(),
		}),
	)
	.handler(async ({ input }) => {
		await db.insert(jobs).values({
			name: input.name,
			price: input.price,
		});
	});
