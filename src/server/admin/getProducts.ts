"use server";
import { db } from "@/src/db";
import { stock } from "@/src/db/schema";
import { createServerAction } from "zsa";

export const getProducts = createServerAction().handler(async () => {
	const products = await db.select().from(stock);

	return products.map((product) => ({
		...product,
		priceTotal: product.unityPrice * product.quantity,
	}));
});
