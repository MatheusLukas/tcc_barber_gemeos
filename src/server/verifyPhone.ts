"use server";
import { db } from "@/src/db";
import { user, verification } from "@/src/db/schema";
import { eq, sql } from "drizzle-orm";
import z from "zod";
import { createServerAction } from "zsa";

export const verifyPhone = createServerAction()
	.input(
		z.object({
			phoneNumber: z.string(),
			code: z.string(),
			userId: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		const response = { data: false, hasExpired: false };

		const isVerify = await db
			.select()
			.from(verification)
			.where(
				sql`${verification.identifier} = ${input.phoneNumber} and ${verification.value} = ${input.code} and ${verification.expiresAt} > now()`,
			)
			.limit(1);

		const hasExpired = await db
			.select()
			.from(verification)
			.where(
				sql`${verification.identifier} = ${input.phoneNumber} and ${verification.value} = ${input.code} and ${verification.expiresAt} < now()`,
			);

		if (isVerify.length > 0) {
			await db
				.update(user)
				.set({
					phoneNumberVerified: true,
				})
				.where(eq(user.id, input.userId));
			response.data = true;
		}

		if (hasExpired.length > 0 || isVerify.length > 0) {
			if (hasExpired.length > 0) response.hasExpired = true;
			await db
				.delete(verification)
				.where(
					sql`${verification.identifier} = ${input.phoneNumber} and ${verification.value} = ${input.code}`,
				);
		}

		return response;
	});
