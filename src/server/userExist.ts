"use server";
import { db } from "@/src/db";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function userExist(email: string) {
	const userExist = await db.select().from(user).where(eq(user.email, email));
	console.log(userExist);
	return userExist;
}
