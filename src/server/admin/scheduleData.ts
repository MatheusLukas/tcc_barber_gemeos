"use server";
import { db } from "@/src/db";
import { schedule } from "@/src/db/schema";
import { formatNumberToCurrency } from "@/src/utils/formatNumberToCurrency";
import { and, eq, sql } from "drizzle-orm";
import { createServerAction } from "zsa";

export const getScheduleData = createServerAction().handler(async () => {
	// Get today's date at midnight (start of day)
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	// Get tomorrow's date at midnight (end of day)
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	// 1. Get all scheduled appointments for today (pending)
	const scheduledToday = await db
		.select()
		.from(schedule)
		.where(
			and(
				eq(schedule.status, "pending"),
				sql`${schedule.date} >= ${today}`,
				sql`${schedule.date} < ${tomorrow}`,
			),
		);

	// 2. Get all canceled appointments for today
	const canceledToday = await db
		.select()
		.from(schedule)
		.where(
			and(
				eq(schedule.status, "canceled"),
				sql`${schedule.date} >= ${today}`,
				sql`${schedule.date} < ${tomorrow}`,
			),
		);

	// 3. Get all pending appointments (not necessarily today)
	const allPending = await db
		.select()
		.from(schedule)
		.where(eq(schedule.status, "pending"));

	// 4. Get all completed (confirmed) appointments for today
	const completedToday = await db
		.select()
		.from(schedule)
		.where(
			and(
				eq(schedule.status, "confirmed"),
				sql`${schedule.date} >= ${today}`,
				sql`${schedule.date} < ${tomorrow}`,
			),
		);

	// 5. Calculate total money made today
	const totalEarningsToday = completedToday.reduce(
		(total, appointment) => total + appointment.price,
		0,
	);

	return {
		scheduledToday: scheduledToday.length || 0,
		canceledToday: canceledToday.length || 0,
		pendingAppointments: allPending.length || 0,
		completedToday: completedToday.length || 0,
		earningsToday: formatNumberToCurrency(totalEarningsToday) || 0,
	};
});
