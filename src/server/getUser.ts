"use server";
import { db } from "@/src/db";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";
import { createServerAction } from "zsa";

export const getUser = createServerAction()
	.input(z.object({ userId: z.string().optional() }))
	.handler(async ({ input }) => {
		if (!input.userId) return null;
		return await db
			.select()
			.from(user)
			.where(eq(user.id, input.userId))
			.limit(1)
			.then((user) => user.at(0) ?? null);
	});
