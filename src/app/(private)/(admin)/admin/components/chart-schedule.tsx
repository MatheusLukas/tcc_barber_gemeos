"use client";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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
import { CardExposedCollaborator } from "./card-exposed-collaborator";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const collaborators = [
  {
    image: "/barbeiro.jpg",
    name: "Maionese",
    earnings: 800,
    appointments: 150,
  },
  {
    image: "/barbeiro.jpg",
    name: "Maionese1",
    earnings: 800,
    appointments: 150,
  },
  {
    image: "/barbeiro.jpg",
    name: "Maionese2",
    earnings: 800,
    appointments: 150,
  },
  {
    image: "/barbeiro.jpg",
    name: "Maionese3",
    earnings: 800,
    appointments: 150,
  },
  {
    image: "/barbeiro.jpg",
    name: "Maiones1e",
    earnings: 800,
    appointments: 150,
  },
  {
    image: "/barbeiro.jpg",
    name: "Maionese11",
    earnings: 800,
    appointments: 150,
  },
  {
    image: "/barbeiro.jpg",
    name: "Maionese21",
    earnings: 800,
    appointments: 150,
  },
  {
    image: "/barbeiro.jpg",
    name: "Maionese31",
    earnings: 800,
    appointments: 150,
  },
];

export function ChartSchedule() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Animation once direction="down">
      <Card className="flex flex-col size-full">
        <CardHeader>
          <Animation once direction="left" delay={0.6}>
            <CardTitle>Atedimentos</CardTitle>
          </Animation>
        </CardHeader>
        <CardContent className="grid grid-cols-[4fr_8fr] pb-0">
          <Animation once direction="up" delay={0.6}>
            <ChartContainer
              config={chartConfig}
              className="aspect-square w-full h-72"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
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
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Visitors
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </Animation>
          <ScrollArea className="w-full max-h-64">
            <div className="px-3 space-y-3">
              {collaborators.map((collaborator) => (
                <CardExposedCollaborator
                  {...collaborator}
                  key={collaborator.name}
                />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </Animation>
  );
}
