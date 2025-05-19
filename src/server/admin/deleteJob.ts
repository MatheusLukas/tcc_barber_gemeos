"use server";
import { db } from "@/src/db";
import { jobs } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";
import { createServerAction } from "zsa";

export const deleteJob = createServerAction()
	.input(
		z.object({
			jobId: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		await db.delete(jobs).where(eq(jobs.id, input.jobId));
	});
