"use client";
import { Animation } from "@/src/components/animation";
import { ResetFilters } from "@/src/components/reset-filters";
import { Input } from "@/src/components/ui/input";
import { getSchedules } from "@/src/server/admin/getSchedules";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { FilterSchedule } from "./components/filter-schedule";
import { ShowInfosBarber } from "./components/show-infos-barber";
import { TableSchedule } from "./components/table-schedule";

export default function ScheduleAdmin() {
	const [filterValue, setFilterValue] = useState("");
	const params = useSearchParams();

	const [jobs] = useQueryState("jobs");
	const [status] = useQueryState("status");
	const [date] = useQueryState("date");
	const [responsible] = useQueryState("responsible");
	const [paymentMethod] = useQueryState("payment");

	const { data: schedules, isLoading } = useQuery({
		queryKey: ["schedules", jobs, status, date, responsible, paymentMethod],
		queryFn: async () => {
			// Process string parameters
			const jobIds = jobs
				? jobs.includes(",")
					? jobs.split(",").filter(Boolean)
					: jobs
						? [jobs]
						: []
				: [];
			const responsibleIds = responsible
				? responsible.includes(",")
					? responsible.split(",").filter(Boolean)
					: responsible
						? [responsible]
						: []
				: [];
			const paymentMethods = paymentMethod
				? paymentMethod.includes(",")
					? paymentMethod.split(",").filter(Boolean)
					: paymentMethod
						? [paymentMethod]
						: []
				: [];

			// Status validation
			const statusValues = [
				"pending",
				"no_payed",
				"confirmed",
				"refunded",
				"canceled",
			] as const;
			const validStatus =
				status && statusValues.includes(status as any)
					? (status as (typeof statusValues)[number])
					: undefined;

			console.log("Enviando para API:", {
				jobId: jobIds.length > 0 ? jobIds : undefined,
				status: validStatus,
				date: date || undefined,
				responsible: responsibleIds.length > 0 ? responsibleIds : undefined,
				paymentMethod: paymentMethods.length > 0 ? paymentMethods : undefined,
			});

			const [data, _] = await getSchedules({
				jobId: jobIds.length > 0 ? jobIds : undefined,
				status: validStatus,
				date: date || undefined,
				responsible: responsibleIds.length > 0 ? responsibleIds : undefined,
				paymentMethod: paymentMethods.length > 0 ? paymentMethods : undefined,
			});

			console.log("Recebido da API:", data?.length || 0, "registros");
			return data;
		},
	});

	return (
		<div className="space-y-4">
			<div className="flex items-center">
				<Animation delay={0.2} once direction="left">
					<p className="text-3xl font-bold text-center sm:text-start">
						Atendimentos
					</p>
				</Animation>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:grid-cols-5 2xl:gap-20">
				<ShowInfosBarber />
			</div>
			<div className="space-y-4">
				<div className="flex justify-end gap-4">
					<Animation
						delay={0.7}
						once
						direction="left"
						className="relative w-full sm:w-64"
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
					{params.size > 0 && <ResetFilters />}
				</div>
				<Animation direction="up">
					<TableSchedule
						filterValue={filterValue}
						setFilter={setFilterValue}
						data={schedules ?? []}
						isLoading={isLoading}
					/>
				</Animation>
			</div>
		</div>
	);
}
