import { Animation } from "@/src/components/animation";
import { ChartEarning } from "./chart-earning";
import { ChartSchedule } from "./chart-schedule";
import { FilterCharts } from "./filter-charts";

export function Overview() {
	return (
		<div className="space-y-4">
			<div className="flex sm:flex-row flex-col justify-between sm:items-center max-sm:gap-2">
				<Animation delay={0.2} once direction="left">
					<p className="text-3xl font-bold text-start">Visão geral</p>
				</Animation>
				<FilterCharts />
			</div>
			<div className="grid grid-cols-[4fr_8fr] max-2xl:grid-rows-[min_min] max-2xl:grid-cols-1 h-fit 2xl:max-h-96 gap-4">
				<ChartEarning />
				<ChartSchedule />
			</div>
		</div>
	);
}
