"use server";
import { db } from "@/src/db";
import { barbers } from "@/src/db/schema";
import { createServerAction } from "zsa";

export const getAllBarbers = createServerAction().handler(async () => {
	return await db.select().from(barbers);
});
