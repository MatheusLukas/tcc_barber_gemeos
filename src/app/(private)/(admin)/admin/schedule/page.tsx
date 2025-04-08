"use client";
import { Animation } from "@/src/components/animation";
import { Input } from "@/src/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { FilterSchedule } from "./components/filter-schedule";
import { ShowInfosBarber } from "./components/show-infos-barber";
import { TableSchedule } from "./components/table-schedule";

export default function ScheduleAdmin() {
	const [filterValue, setFilterValue] = useState("");

	return (
		<div className="space-y-4">
			<div className="flex items-center">
				<Animation delay={0.2} once direction="left">
					<p className="text-3xl font-bold text-center sm:text-start">
						Atendimentos
					</p>
				</Animation>
			</div>
			<div className="grid grid-cols-5 gap-20">
				<ShowInfosBarber />
			</div>
			<div className="space-y-4">
				<div className="flex justify-end gap-4">
					<Animation
						delay={0.7}
						once
						direction="left"
						className="relative w-64"
					>
						<Input
							placeholder="Procurar..."
							className="pl-9"
							value={filterValue}
							onChange={(e) => setFilterValue(e.target.value)}
						/>
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
					</Animation>
					<Animation delay={0.7} once direction="left">
						<FilterSchedule />
					</Animation>
				</div>
				<Animation direction="up">
					<TableSchedule filterValue={filterValue} setFilter={setFilterValue} />
				</Animation>
			</div>
		</div>
	);
}
