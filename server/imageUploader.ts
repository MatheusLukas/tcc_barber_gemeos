"use server";
import { utapi } from "./uploadthing";

export async function imageUploader(file: File) {
	return await utapi.uploadFiles(file);
}
