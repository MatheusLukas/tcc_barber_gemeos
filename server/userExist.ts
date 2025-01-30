"use server";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function userExist(email: string) {
	const userExist = await db.select().from(user).where(eq(user.email, email));
	console.log(userExist);
	return userExist;
}
