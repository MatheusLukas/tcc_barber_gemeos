import { db } from "@/src/db";
import { barbers } from "@/src/db/schema";
import { ROLES } from "@/src/enum/roles";
import z from "zod";
import { createServerAction } from "zsa";
import { imageUploader } from "../imageUploader";

export const createCollaborator = createServerAction()
	.input(
		z.object({
			name: z.string(),
			email: z.string(),
			file: z.instanceof(File),
			role: z.nativeEnum(ROLES),
		}),
	)
	.handler(async ({ input }) => {
		const [data] = await imageUploader({ file: input.file });

		return await db.insert(barbers).values({
			email: input.email,
			name: input.name,
			role: input.role,
			image: data?.data?.url,
		});
	});
