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
import { ChartEarnings } from "@/src/server/admin/chartEarnings";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface ChartEarningProps {
  date: string;
  total: number;
}

const chartConfig = {
  earnings: {
    label: "Ganhos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartEarning() {
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");

  const allowedFilters = ["mes", "semana", "dia"] as const;
  type FilterType = (typeof allowedFilters)[number];
  const filter: FilterType = allowedFilters.includes(filterParams as FilterType)
    ? (filterParams as FilterType)
    : "mes";

  console.log(filter);

  const { data = [], isLoading } = useQuery<ChartEarningProps[]>({
    queryKey: ["chart-earnings", filter],
    queryFn: async () => {
      const [data, _] = await ChartEarnings({
        filter,
      });
      return data as ChartEarningProps[];
    },
  });

  console.log(data);

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
                  data={data}
                  margin={{
                    top: 20,
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
                    tickFormatter={(value) => value.slice(5, 7)}
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
                  <Bar dataKey="total" fill="var(--color-earnings)" radius={8}>
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
