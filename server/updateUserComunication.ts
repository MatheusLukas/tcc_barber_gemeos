"use server";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

type Props = {
	name: string;
	email: string;
	phoneNumber?: string;
};

export async function updateUserComunication({
	name,
	email,
	phoneNumber,
}: Props) {
	await db
		.update(user)
		.set({ name, email, phoneNumber })
		.where(eq(user.email, email));

	return { success: true };
}
