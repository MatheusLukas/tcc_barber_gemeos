"use server";
import { db } from "@/src/db";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createServerAction } from "zsa";

export const updateUserComunication = createServerAction()
	.input(
		z.object({
			name: z.string(),
			email: z.string(),
			phoneNumber: z.string().optional(),
		}),
	)
	.handler(async ({ input }) => {
		await db
			.update(user)
			.set({
				name: input.name,
				email: input.email,
				phoneNumber: input.phoneNumber,
			})
			.where(eq(user.email, input.email));
	});
