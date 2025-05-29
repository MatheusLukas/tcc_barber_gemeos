"use server";
import { db } from "@/src/db";
import { stock } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";
import { createServerAction } from "zsa";
import { imageUploader } from "../imageUploader";

export const createProduct = createServerAction()
	.input(
		z.object({
			id: z.string().optional(),
			name: z.string(),
			image: z.instanceof(File),
			unityPrice: z.number(),
			quantity: z.number(),
		}),
	)
	.handler(async ({ input }) => {
		const [image, _] = await imageUploader({ file: input.image });
		if (input.id) {
			await db
				.update(stock)
				.set({
					name: input.name,
					quantity: input.quantity,
					unityPrice: input.unityPrice,
					image: image?.data?.url,
				})
				.where(eq(stock.id, input.id));
		} else {
			await db.insert(stock).values({
				name: input.name,
				quantity: input.quantity,
				unityPrice: input.unityPrice,
				image: image?.data?.url,
			});
		}
	});
