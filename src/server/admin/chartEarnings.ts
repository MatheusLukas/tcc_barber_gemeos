"use server";
import { db } from "@/src/db";
import { schedule } from "@/src/db/schema";
import { and, eq, gte, lte, sql } from "drizzle-orm";
import { z } from "zod";
import { createServerAction } from "zsa";

const filterSchema = z.enum(["mes", "semana", "dia"]);

// Formatos de data para diferentes filtros
const formatters = {
	mes: (date: Date) => {
		const monthNames = [
			"Jan",
			"Fev",
			"Mar",
			"Abr",
			"Mai",
			"Jun",
			"Jul",
			"Ago",
			"Set",
			"Out",
			"Nov",
			"Dez",
		];
		return `${monthNames[date.getMonth()]}/${date.getFullYear()}`;
	},
	dia: (date: Date) => `${date.getDate()}/${date.getMonth() + 1}`,
	semana: (date: Date) => `${date.getDate()}/${date.getMonth() + 1}`,
};

// Função para obter resumo mensal
async function getMonthlySummary(
	startDate: Date,
	formatDate: (date: Date) => string,
) {
	const results = await db
		.select({
			date: sql`DATE_TRUNC('month', ${schedule.date})`.as("date"),
			total: sql`SUM(price)`,
		})
		.from(schedule)
		.where(and(eq(schedule.status, "confirmed"), gte(schedule.date, startDate)))
		.groupBy(sql`DATE_TRUNC('month', ${schedule.date})`)
		.orderBy(sql`date`);

	return results.map((result) => ({
		date: formatDate(new Date(result.date as string)),
		total: Number(result.total),
	}));
}

// Função para obter resumo semanal
async function getWeeklySummary(
	startDate: Date,
	endDate: Date,
	today: Date,
	formatDate: (date: Date) => string,
) {
	// Prepara o array com os 7 dias
	const daysArray = [];
	const dailyTotals: Record<string, number> = {};

	for (let i = 6; i >= 0; i--) {
		const date = new Date(today);
		date.setDate(today.getDate() - i);
		date.setHours(0, 0, 0, 0);

		const dateKey = formatDate(date);
		dailyTotals[dateKey] = 0;
		daysArray.push({
			date: date,
			formattedDate: dateKey,
		});
	}

	// Busca os dados dos últimos 7 dias
	const weekResults = await db
		.select({
			date: sql`DATE_TRUNC('day', ${schedule.date})`.as("date"),
			total: sql`SUM(price)`,
		})
		.from(schedule)
		.where(
			and(
				eq(schedule.status, "confirmed"),
				gte(schedule.date, startDate),
				lte(schedule.date, endDate),
			),
		)
		.groupBy(sql`DATE_TRUNC('day', ${schedule.date})`)
		.orderBy(sql`date`);

	// Preenche os totais encontrados
	for (const result of weekResults) {
		const resultDate = new Date(result.date as string);
		const key = formatDate(resultDate);
		dailyTotals[key] = Number(result.total);
	}

	// Converte para o formato final
	return daysArray.map((day) => ({
		date: day.formattedDate,
		total: dailyTotals[day.formattedDate],
	}));
}

// Função para obter resumo diário
async function getDailySummary(
	startDate: Date,
	endDate: Date,
	formatDate: (date: Date) => string,
) {
	const dayResult = await db
		.select({
			total: sql`SUM(price)`,
		})
		.from(schedule)
		.where(
			and(
				eq(schedule.status, "confirmed"),
				gte(schedule.date, startDate),
				sql`${schedule.date} <= ${endDate}`,
			),
		);

	return [
		{
			date: formatDate(startDate),
			total: Number(dayResult[0]?.total || 0),
		},
	];
}

export const ChartEarnings = createServerAction()
	.input(
		z.object({
			filter: filterSchema,
		}),
	)
	.handler(async ({ input }) => {
		const today = new Date();
		const formatDate = formatters[input.filter];

		// Função auxiliar para criar datas de início e fim
		const getDateRange = () => {
			let startDate: Date;
			let endDate: Date | null = null;

			if (input.filter === "mes") {
				// Últimos 12 meses
				startDate = new Date(today.getFullYear(), today.getMonth() - 11, 1);
			} else if (input.filter === "semana") {
				// Últimos 7 dias
				startDate = new Date(today);
				startDate.setDate(today.getDate() - 6);
				startDate.setHours(0, 0, 0, 0);
				endDate = new Date(today);
				endDate.setHours(23, 59, 59, 999);
			} else {
				// Apenas hoje
				startDate = new Date(today);
				startDate.setHours(0, 0, 0, 0);
				endDate = new Date(startDate);
				endDate.setHours(23, 59, 59, 999);
			}

			return { startDate, endDate };
		};

		const { startDate, endDate } = getDateRange();

		// Processamento específico para cada tipo de filtro
		if (input.filter === "mes") {
			return await getMonthlySummary(startDate, formatDate);
		}

		if (input.filter === "semana") {
			return await getWeeklySummary(startDate, endDate!, today, formatDate);
		}

		// Caso padrão: dia
		return await getDailySummary(startDate, endDate!, formatDate);
	});
