"use server";
import { db } from "@/src/db";
import { barbers } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";
import { createServerAction } from "zsa";

export const deleteCollaborator = createServerAction()
	.input(
		z.object({
			collaboratorId: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		await db.delete(barbers).where(eq(barbers.id, input.collaboratorId));
	});
