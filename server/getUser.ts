"use server";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUser(userId: string | undefined) {
	console.log("here", userId);
	if (!userId) return null;
	return await db
		.select()
		.from(user)
		.where(eq(user.id, userId))
		.limit(1)
		.then((user) => user.at(0) ?? null);
}
