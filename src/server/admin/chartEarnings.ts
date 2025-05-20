"use server";
import { db } from "@/src/db";
import { schedule } from "@/src/db/schema";
import { and, eq, gte, sql } from "drizzle-orm";
import { z } from "zod";
import { createServerAction } from "zsa";

const filterSchema = z.enum(["mes", "semana", "dia"]);

export const ChartEarnings = createServerAction()
  .input(
    z.object({
      filter: filterSchema,
    })
  )
  .handler(async ({ input }) => {
    const today = new Date();
    let startDate: Date;

    if (input.filter === "mes") {
      console.log("mes");
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (input.filter === "semana") {
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 7);
    } else {
      startDate = new Date(today.setHours(0, 0, 0, 0));
    }

    const results = await db
      .select({
        date: sql`DATE_TRUNC('month', ${schedule.date})`.as("date"),
        total: sql`SUM(price)`,
      })
      .from(schedule)
      .where(
        and(eq(schedule.status, "confirmed"), gte(schedule.date, startDate))
      )
      .groupBy(sql`DATE_TRUNC('month', ${schedule.date})`);

    const formattedResults = results
      .map((result) => ({
        date: result.date,
        total: result.total,
      }))
      .slice(0, 7);

    return formattedResults;
  });
