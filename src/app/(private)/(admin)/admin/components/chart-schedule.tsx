"use client";

import { Animation } from "@/src/components/animation";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/src/components/ui/chart";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Skeleton } from "@/src/components/ui/skeleton";
import { getBarberScheduleCount } from "@/src/server/admin/chartSchedule";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { CardExposedCollaborator } from "./card-exposed-collaborator";

// Config para o gráfico de pizza (cores dinâmicas)
const chartConfig = {
	appointments: {
		label: "Atendimentos",
	},
} satisfies ChartConfig;

// Cores para o gráfico
const colors = [
	"var(--color-chart-1, hsl(var(--chart-1)))",
	"var(--color-chart-2, hsl(var(--chart-2)))",
	"var(--color-chart-3, hsl(var(--chart-3)))",
	"var(--color-chart-4, hsl(var(--chart-4)))",
	"var(--color-chart-5, hsl(var(--chart-5)))",
];

// Interface para os dados de barbeiros com contagem de agendamentos
interface BarberData {
	id: string;
	name: string;
	image: string;
	completedAppointments: number;
	totalEarnings: number;
}

// Componente de Skeleton para loading
function ChartSkeleton() {
	return (
		<div className="grid grid-cols-[4fr_8fr] gap-4">
			<div className="flex justify-center items-center">
				<Skeleton className="aspect-square w-48 h-48 rounded-full" />
			</div>
			<div className="flex flex-col gap-4">
				{[1, 2, 3].map((index) => (
					<div
						key={index}
						className="w-full border shadow rounded-lg p-4 flex justify-between"
					>
						<div className="flex gap-4 items-center">
							<div className="bg-primary size-2 rounded-full" />
							<Skeleton className="h-10 w-10 rounded-full" />
							<Skeleton className="h-4 w-24" />
						</div>
						<div className="flex flex-col justify-center gap-2">
							<Skeleton className="h-3 w-28" />
							<Skeleton className="h-3 w-20" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

// Componente para exibir quando não há dados
function NoDataAlert() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
			<div className="rounded-full bg-muted/30 p-4 mb-4">
				<AlertCircle className="h-8 w-8 text-muted-foreground" />
			</div>
			<h3 className="text-lg font-medium mb-2">Sem dados de barbeiros</h3>
			<p className="text-sm text-muted-foreground max-w-xs">
				Não encontramos registros de agendamentos para este período. Experimente
				selecionar outro intervalo de tempo ou verifique se há agendamentos
				confirmados.
			</p>
		</div>
	);
}

export function ChartSchedule() {
	const searchParams = useSearchParams();
	const filterParams = searchParams.get("filter");

	const allowedFilters = ["mes", "semana", "dia"] as const;
	type FilterType = (typeof allowedFilters)[number];
	const filter: FilterType = allowedFilters.includes(filterParams as FilterType)
		? (filterParams as FilterType)
		: "mes";

	const {
		data = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["chart-schedule", filter],
		queryFn: async () => {
			const [data, _] = await getBarberScheduleCount({ filter });
			return data;
		},
	});

	// Verificar se os dados estão vazios
	const hasNoData =
		data?.length === 0 ||
		data?.every((item) => item.completedAppointments === 0);

	// Calcular total de atendimentos
	const totalAppointments = React.useMemo(() => {
		return data?.reduce(
			(acc, curr) => acc + (curr.completedAppointments || 0),
			0,
		);
	}, [data]);

	// Preparar dados para o gráfico de pizza
	const chartData = React.useMemo(() => {
		return data?.map((barber, index) => ({
			name: barber.name,
			appointments: barber.completedAppointments,
			fill: colors[index % colors.length],
		}));
	}, [data]);

	return (
		<Animation className="h-full" once direction="down">
			<Card className="flex flex-col w-full h-full">
				<CardHeader>
					<Animation once direction="left" delay={0.6}>
						<CardTitle>Atendimentos por Barbeiro</CardTitle>
					</Animation>
				</CardHeader>
				<CardContent className="pb-0">
					<Animation
						className="size-full h-full"
						once
						direction="up"
						delay={0.6}
					>
						{isLoading ? (
							<ChartSkeleton />
						) : isError || hasNoData ? (
							<NoDataAlert />
						) : (
							<div className="grid grid-cols-[4fr_8fr] max-xl:grid-rows-2 max-xl:grid-cols-1">
								<ChartContainer
									config={chartConfig}
									className="max-2xl:h-80 max-2xl:w-full"
								>
									<PieChart>
										<ChartTooltip
											cursor={false}
											content={<ChartTooltipContent hideLabel />}
										/>
										<Pie
											data={chartData}
											dataKey="appointments"
											nameKey="name"
											innerRadius={60}
											strokeWidth={5}
										>
											<Label
												content={({ viewBox }) => {
													if (viewBox && "cx" in viewBox && "cy" in viewBox) {
														return (
															<text
																x={viewBox.cx}
																y={viewBox.cy}
																textAnchor="middle"
																dominantBaseline="middle"
															>
																<tspan
																	x={viewBox.cx}
																	y={viewBox.cy}
																	className="fill-foreground text-3xl font-bold"
																>
																	{totalAppointments?.toLocaleString()}
																</tspan>
																<tspan
																	x={viewBox.cx}
																	y={(viewBox.cy || 0) + 24}
																	className="fill-muted-foreground"
																>
																	Atendimentos
																</tspan>
															</text>
														);
													}
												}}
											/>
										</Pie>
									</PieChart>
								</ChartContainer>
								<ScrollArea className="w-full max-h-64">
									<div className="px-3 space-y-3">
										{data?.map((barber: BarberData, index: number) => (
											<CardExposedCollaborator
												key={barber.id}
												name={barber.name}
												image={barber.image}
												appointments={barber.completedAppointments}
												earnings={barber.totalEarnings}
												color={colors[index % colors.length]}
											/>
										))}
									</div>
								</ScrollArea>
							</div>
						)}
					</Animation>
				</CardContent>
			</Card>
		</Animation>
	);
}
