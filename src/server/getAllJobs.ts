"use server";
import { db } from "@/src/db";
import { jobs } from "@/src/db/schema";
import { createServerAction } from "zsa";

export const getAllJobs = createServerAction().handler(async () => {
	return await db.select().from(jobs);
});
