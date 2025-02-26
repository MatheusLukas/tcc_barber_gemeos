"use server";
import { db } from "@/src/db";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function getUser(userId: string | undefined) {
	if (!userId) return null;
	return await db
		.select()
		.from(user)
		.where(eq(user.id, userId))
		.limit(1)
		.then((user) => user.at(0) ?? null);
}
