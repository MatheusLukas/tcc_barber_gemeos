"use server";
import { db } from "@/src/db";
import { barbers } from "@/src/db/schema";
import { createServerAction } from "zsa";

export const getBarbers = createServerAction().handler(async () => {
	const barber = await db.select().from(barbers);

	const barberWithDetails = barber.map((barber) => {
		return {
			...barber,
			barberInfo: {
				name: barber.name,
				image: barber.image,
			},
		};
	});

	return barberWithDetails;
});
