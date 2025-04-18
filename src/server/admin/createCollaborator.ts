"use server";
import { db } from "@/src/db";
import { barbers, user } from "@/src/db/schema";
import { ROLES } from "@/src/enum/roles";
import { signUp } from "@/src/lib/auth-client";
import { eq } from "drizzle-orm";
import z from "zod";
import { createServerAction } from "zsa";
import { imageUploader } from "../imageUploader";
import { userExist } from "../userExist";

export const createCollaborator = createServerAction()
	.input(
		z.object({
			name: z.string(),
			email: z.string(),
			file: z.instanceof(File),
			role: z.nativeEnum(ROLES),
			password: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		// Outra possivel maneira de fazer: https://www.better-auth.com/docs/plugins/admin
		const [userExistResponse] = await userExist({ email: input.email });

		if (userExistResponse) {
			throw "Esse email já foi utilizado";
		}

		const [image] = await imageUploader({ file: input.file });

		const { data } = await signUp.email({
			name: input.name,
			email: input.email,
			password: input.password,
			image: image?.data?.url,
		});

		if (!data) {
			throw "Erro ao criar o usuário";
		}

		await db.insert(barbers).values({
			name: data.user.name,
			email: data.user.email,
			image: data.user.image!,
			role: input.role,
		});

		await db
			.update(user)
			.set({ role: input.role })
			.where(eq(user.id, data.user.id));
	});
