"use server";
import { db } from "@/src/db";
import { stock } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";
import { createServerAction } from "zsa";

export const deleteProduct = createServerAction()
	.input(
		z.object({
			productId: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		await db.delete(stock).where(eq(stock.id, input.productId));
	});
