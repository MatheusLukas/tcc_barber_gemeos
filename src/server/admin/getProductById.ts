"use server";
import { db } from "@/src/db";
import { stock } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";
import { createServerAction } from "zsa";

export const getProductById = createServerAction()
	.input(
		z.object({
			productId: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		return await db
			.select()
			.from(stock)
			.where(eq(stock.id, input.productId))
			.then((res) => res[0]);
	});
