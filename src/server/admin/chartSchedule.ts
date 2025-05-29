"use server";
import { db } from "@/src/db";
import { barbers, schedule } from "@/src/db/schema";
import { and, eq, gte, lte } from "drizzle-orm";
import { z } from "zod";
import { createServerAction } from "zsa";

const filterSchema = z.enum(["mes", "semana", "dia"]);

export const getBarberScheduleCount = createServerAction()
	.input(
		z
			.object({
				filter: filterSchema,
			})
			.optional(),
	)
	.handler(async ({ input }) => {
		const today = new Date();
		const filter = input?.filter || "mes"; // Default to monthly if no filter provided

		// Define date ranges based on filter
		let startDate: Date;
		const endDate: Date = new Date(today);
		endDate.setHours(23, 59, 59, 999);

		if (filter === "mes") {
			// Last month
			startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
		} else if (filter === "semana") {
			// Last week
			startDate = new Date(today);
			startDate.setDate(today.getDate() - 7);
			startDate.setHours(0, 0, 0, 0);
		} else {
			// Current day
			startDate = new Date(today);
			startDate.setHours(0, 0, 0, 0);
		}

		// Get all barbers
		const getBarbers = await db.select().from(barbers);

		// Get barber details with appointment counts and earnings
		const barbersWithDetails = await Promise.all(
			getBarbers.map(async (barber) => {
				// Get all completed appointments for the barber within the date range
				const barberAppointments = await db
					.select()
					.from(schedule)
					.where(
						and(
							eq(schedule.barberId, barber.id),
							eq(schedule.status, "confirmed"),
							gte(schedule.date, startDate),
							lte(schedule.date, endDate),
						),
					);

				// Calculate total appointments and earnings
				const completedCount = barberAppointments.length;
				const totalEarnings = barberAppointments.reduce(
					(total, appointment) => total + appointment.price,
					0,
				);

				return {
					id: barber.id,
					name: barber.name,
					image: barber.image,
					completedAppointments: completedCount,
					totalEarnings,
				};
			}),
		);

		return barbersWithDetails;
	});
