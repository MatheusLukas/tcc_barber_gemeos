"use server";
import z from "zod";
import { createServerAction } from "zsa";
import { utapi } from "./uploadthing";

export const imageUploader = createServerAction()
	.input(z.object({ file: z.instanceof(File) }))
	.handler(async ({ input }) => {
		return await utapi.uploadFiles(input.file);
	});
