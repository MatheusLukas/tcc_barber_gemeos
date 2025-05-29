"use client";
import { Animation } from "@/src/components/animation";
import { ResetFilters } from "@/src/components/reset-filters";
import { Input } from "@/src/components/ui/input";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/src/components/ui/tabs";
import { getScheduleClosed } from "@/src/server/admin/getScheduleClosed";
import { getSchedulePending } from "@/src/server/admin/getSchedulePending";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { FilterClient } from "./filter-client";
import { TableClients } from "./table-clients";

export function TabsTable() {
	const params = useSearchParams();
	const [filterValue, setFilterValue] = useState("");

	const [job] = useQueryState("jobs", parseAsString.withDefault(""));
	const [status] = useQueryState("status", parseAsString.withDefault(""));
	const [date] = useQueryState("date", parseAsString.withDefault(""));
	const [time] = useQueryState("time", parseAsString.withDefault(""));
	const [responsible] = useQueryState(
		"responsible",
		parseAsString.withDefault(""),
	);

	console.log(job, status, date, time, responsible, "filter");

	const { data: schedulePending, isLoading } = useQuery({
		queryKey: ["schedulePending", job, status, date, time, responsible],
		queryFn: async () => {
			console.log(job, status, date, time, responsible, "filter2");
			const statusValues = [
				"pending",
				"no_payed",
				"confirmed",
				"refunded",
				"canceled",
			] as const;
			const validStatus = statusValues.includes(status as any)
				? (status as (typeof statusValues)[number])
				: undefined;

			const jobIds = job
				? job.includes(",")
					? job.split(",").filter(Boolean)
					: job
						? [job]
						: []
				: [];
			const responsibleIds = responsible
				? responsible.includes(",")
					? responsible.split(",").filter(Boolean)
					: responsible
						? [responsible]
						: []
				: [];

			const [data, _] = await getSchedulePending({
				jobId: jobIds.length > 0 ? jobIds : undefined,
				status: validStatus,
				date: date || undefined,
				responsible: responsibleIds.length > 0 ? responsibleIds : undefined,
			});
			console.log(data);
			return data;
		},
	});

	const { data: scheduleClosed, isLoading: isLoadingClosed } = useQuery({
		queryKey: ["scheduleClosed", job, status, date, time, responsible],
		queryFn: async () => {
			const statusValues = ["canceled", "confirmed", "refunded"] as const;
			const validStatus = statusValues.includes(status as any)
				? (status as (typeof statusValues)[number])
				: undefined;

			const jobIds = job
				? job.includes(",")
					? job.split(",").filter(Boolean)
					: job
						? [job]
						: []
				: [];
			const responsibleIds = responsible
				? responsible.includes(",")
					? responsible.split(",").filter(Boolean)
					: responsible
						? [responsible]
						: []
				: [];

			const [data, _] = await getScheduleClosed({
				jobId: jobIds.length > 0 ? jobIds : undefined,
				status: validStatus,
				date: date || undefined,
				responsible: responsibleIds.length > 0 ? responsibleIds : undefined,
			});
			console.log(data);
			return data;
		},
	});

	return (
		<div>
			<Tabs defaultValue="abertos">
				<TabsList className="bg-transparent p-0 h-auto flex justify-between">
					<div className="h-10 flex">
						<Animation delay={0.7} once direction="down">
							<TabsTrigger
								value="abertos"
								className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none"
							>
								Abertos
							</TabsTrigger>
						</Animation>
						<Animation delay={0.7} once direction="down">
							<TabsTrigger
								value="fechados"
								className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none"
							>
								Fechados
							</TabsTrigger>
						</Animation>
					</div>
					<div className="flex items-center gap-4">
						<Animation
							delay={0.7}
							once
							direction="down"
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
						<Animation delay={0.7} once direction="down">
							<FilterClient />
						</Animation>
						{params.size > 0 && <ResetFilters />}
					</div>
				</TabsList>

				<TabsContent value="abertos" className="mt-4">
					<Animation delay={1} once direction="left">
						<TableClients
							filterValue={filterValue}
							setFilter={setFilterValue}
							data={schedulePending ?? []}
							isLoading={isLoading}
						/>
					</Animation>
				</TabsContent>

				<TabsContent value="fechados" className="mt-4">
					<Animation delay={1} once direction="left">
						<TableClients
							filterValue={filterValue}
							setFilter={setFilterValue}
							data={scheduleClosed ?? []}
							isLoading={isLoadingClosed}
						/>
					</Animation>
				</TabsContent>
			</Tabs>
		</div>
	);
}
