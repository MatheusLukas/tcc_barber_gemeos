"use client";
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
} from "recharts";

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
import { Skeleton } from "@/src/components/ui/skeleton";
import { ChartEarnings } from "@/src/server/admin/chartEarnings";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

// Interface para os dados formatados para exibição
interface ChartDisplayProps {
	date: string;
	ganhos: number;
	total: number;
}

// Função para formatar valores em moeda (R$)
const formatCurrency = (value: number) => {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value);
};

const chartConfig = {
	earnings: {
		label: "Ganhos",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

// Componente de Skeleton para loading
function ChartSkeleton() {
	// Alturas fixas predefinidas em vez de aleatórias
	const barHeights = [60, 120, 80, 100, 70, 90, 110];

	return (
		<div className="flex h-full w-full flex-col gap-4">
			<div className="flex flex-1 items-center justify-center">
				<div className="flex h-[250px] w-full flex-col justify-end gap-2 px-8">
					<div className="flex w-full items-end justify-between gap-2">
						{barHeights.map((height, i) => (
							<Skeleton
								key={height}
								className="w-full"
								style={{ height: `${height}px` }}
							/>
						))}
					</div>
					<Skeleton className="h-6 w-full mt-4" />
				</div>
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
			<h3 className="text-lg font-medium mb-2">Sem dados de ganhos</h3>
			<p className="text-sm text-muted-foreground max-w-xs">
				Não encontramos registros de ganhos para este período. Experimente
				selecionar outro intervalo de tempo ou verifique se há agendamentos
				confirmados.
			</p>
		</div>
	);
}

// Componente do gráfico propriamente dito
function ChartContent({ data }: { data: ChartDisplayProps[] }) {
	return (
		<ChartContainer
			className="max-2xl:h-80 max-2xl:w-full"
			config={chartConfig}
		>
			<BarChart
				accessibilityLayer
				data={data}
				margin={{
					top: 25,
					left: 0,
					right: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="date"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
				/>
				<YAxis
					tickLine={false}
					axisLine={false}
					tickMargin={4}
					tickCount={6}
					width={30}
					tickFormatter={(value) => value}
				/>
				<ChartTooltip
					cursor={false}
					content={
						<ChartTooltipContent
							formatter={(value) => formatCurrency(Number(value))}
						/>
					}
				/>
				<Bar
					dataKey="ganhos"
					name="Ganhos"
					fill="var(--color-earnings)"
					radius={8}
				>
					<LabelList
						position="top"
						offset={12}
						className="fill-foreground"
						fontSize={12}
						formatter={(value: number) => formatCurrency(value)}
					/>
				</Bar>
			</BarChart>
		</ChartContainer>
	);
}

export function ChartEarning() {
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
		queryKey: ["chart-earnings", filter],
		queryFn: async () => {
			const [data, _] = await ChartEarnings({ filter });
			return data?.map((item) => ({
				date: item.date,
				ganhos: item.total,
				total: item.total,
			}));
		},
	});

	// Verificar se os dados estão vazios (todos os valores de ganhos são zero)
	const hasNoData =
		data.length === 0 || data.every((item) => item.ganhos === 0);

	return (
		<Animation className="h-full" once direction="down">
			<Card className="w-full h-fit">
				<CardHeader>
					<Animation once direction="left" delay={0.6}>
						<CardTitle>Ganhos</CardTitle>
					</Animation>
				</CardHeader>
				<CardContent className="min-h-[300px]">
					<Animation
						once
						className="size-full h-full"
						direction="up"
						delay={0.6}
					>
						{isLoading ? (
							<ChartSkeleton />
						) : isError ? (
							<NoDataAlert />
						) : hasNoData ? (
							<NoDataAlert />
						) : (
							<ChartContent data={data} />
						)}
					</Animation>
				</CardContent>
			</Card>
		</Animation>
	);
}
