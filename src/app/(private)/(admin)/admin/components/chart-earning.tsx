"use client";
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	ResponsiveContainer,
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
const chartData = [
	{ month: "January", desktop: 186 },
	{ month: "February", desktop: 305 },
	{ month: "March", desktop: 237 },
	{ month: "April", desktop: 73 },
	{ month: "May", desktop: 209 },
	{ month: "June", desktop: 214 },
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export function ChartEarning() {
	return (
		<Animation once direction="down">
			<Card className="size-full">
				<CardHeader>
					<Animation once direction="left" delay={0.6}>
						<CardTitle>Ganhos</CardTitle>
					</Animation>
				</CardHeader>
				<CardContent>
					<Animation once className="size-full" direction="up" delay={0.6}>
						<ChartContainer config={chartConfig}>
							<ResponsiveContainer width="100%">
								<BarChart
									accessibilityLayer
									data={chartData}
									margin={{
										top: 20,
										left: 0,
										right: 20,
										bottom: 5,
									}}
								>
									<CartesianGrid vertical={false} />
									<XAxis
										dataKey="month"
										tickLine={false}
										tickMargin={10}
										axisLine={false}
										tickFormatter={(value) => value.slice(0, 3)}
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tickMargin={4}
										tickCount={5}
										width={30}
										tickFormatter={(value) => value.toString()}
									/>
									<ChartTooltip
										cursor={false}
										content={<ChartTooltipContent hideLabel />}
									/>
									<Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
										<LabelList
											position="top"
											offset={12}
											className="fill-foreground"
											fontSize={12}
										/>
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</ChartContainer>
					</Animation>
				</CardContent>
			</Card>
		</Animation>
	);
}
