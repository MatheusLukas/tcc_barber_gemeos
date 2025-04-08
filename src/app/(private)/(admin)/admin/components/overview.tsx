import { Animation } from "@/src/components/animation";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/src/components/ui/select";
import { ChartEarning } from "./chart-earning";
import { ChartSchedule } from "./chart-schedule";

export function Overview() {
	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<Animation delay={0.2} once direction="left">
					<p className="text-3xl font-bold text-center sm:text-start">
						Visão geral
					</p>
				</Animation>
				<Animation delay={0.2} once direction="right">
					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Filtrar por..." />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="today">Hoje</SelectItem>
							<SelectItem value="week">Semana</SelectItem>
							<SelectItem value="month">Mês</SelectItem>
						</SelectContent>
					</Select>
				</Animation>
			</div>
			<div className="grid grid-cols-[4fr_8fr] max-h-96 gap-4">
				<ChartEarning />
				<ChartSchedule />
			</div>
		</div>
	);
}
