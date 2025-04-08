"use server";
import { db } from "@/src/db";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createServerAction } from "zsa";

export const userExist = createServerAction()
	.input(z.object({ email: z.string() }))
	.handler(async ({ input }) => {
		return await db.select().from(user).where(eq(user.email, input.email));
	});
