"use server";
import { db } from "@/src/db";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";

type Props = {
	url: string;
	id: string;
};

export async function uploadImage({ url, id }: Props) {
	console.log("uploadImage", url, id);
	try {
		await db
			.update(user)
			.set({
				image: url,
			})
			.where(eq(user.id, id));
		return { success: true };
	} catch (error) {
		console.error("Error updating image:", error);
		return { success: false, error: "Failed to update image" };
	}
}
