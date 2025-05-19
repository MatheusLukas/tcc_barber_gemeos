"use server";
import { db } from "@/src/db";
import { account, barbers, user } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";
import { createServerAction } from "zsa";

export const getCollaboratorById = createServerAction()
	.input(
		z.object({
			collaboratorId: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		const getBarber = await db
			.select()
			.from(barbers)
			.where(eq(barbers.id, input.collaboratorId))
			.limit(1)
			.then((barber) => barber.at(0) ?? null);

		if (!getBarber) throw "Barbeiro não encontrado";

		const getUser = await db
			.select({ id: user.id })
			.from(user)
			.where(eq(user.email, getBarber.email))
			.limit(1)
			.then((user) => user.at(0) ?? null);

		if (!getUser) throw "Usuário não encontrado";

		const getAccount = await db
			.select({ password: account.password })
			.from(account)
			.where(eq(account.userId, getUser?.id))
			.limit(1)
			.then((account) => account.at(0) ?? null);

		return {
			...getBarber,
			password: getAccount?.password,
		};
	});
