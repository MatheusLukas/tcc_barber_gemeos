"use server";
import { db } from "@/src/db";
import { stock } from "@/src/db/schema";
import { eq, sql } from "drizzle-orm";
import z from "zod";
import { createServerAction } from "zsa";

export const ChangeProductQuantity = createServerAction()
	.input(
		z.object({
			id: z.string(),
			operation: z.enum(["increment", "decrement"]),
		}),
	)
	.handler(async ({ input }) => {
		await db
			.update(stock)
			.set({
				quantity:
					input.operation === "increment"
						? sql`${stock.quantity} + 1`
						: sql`${stock.quantity} - 1`,
			})
			.where(eq(stock.id, input.id));
	});
