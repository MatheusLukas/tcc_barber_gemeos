"use server";
import { db } from "@/src/db";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createServerAction } from "zsa";

export const uploadImage = createServerAction()
	.input(
		z.object({
			url: z.string(),
			id: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		await db
			.update(user)
			.set({
				image: input.url,
			})
			.where(eq(user.id, input.id));
	});
