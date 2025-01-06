"use server";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

type Props = {
	url: string;
	id: string;
};

export async function uploadImage({ url, id }: Props) {
	console.log(url, id, "url, id");
	return await db
		.update(user)
		.set({
			image: url,
		})
		.where(eq(user.id, id));
}
