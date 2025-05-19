"use server";
import { db } from "@/src/db";
import { barbers, schedule } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { createServerAction } from "zsa";

export const getAllBarbersFormatteds = createServerAction().handler(
	async () => {
		const getBarbers = await db.select().from(barbers);

		const barbersWithDetails = await Promise.all(
			getBarbers.map(async (barber) => {
				const barberAppointments = await db
					.select()
					.from(schedule)
					.where(eq(schedule.barberId, barber.id));

				const confirmedAppointments = barberAppointments.filter(
					(appointment) => appointment.status === "confirmed",
				);

				const confirmedCount = confirmedAppointments.length;
				const totalPrice = confirmedAppointments.reduce(
					(sum, appointment) => sum + appointment.price,
					0,
				);

				return {
					id: barber.id,
					name: barber.name,
					image: barber.image,
					role: barber.role,
					confirmedCount,
					totalPrice,
				};
			}),
		);
		return barbersWithDetails;
	},
);
