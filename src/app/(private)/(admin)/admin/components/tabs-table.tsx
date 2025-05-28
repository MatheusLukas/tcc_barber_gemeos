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

	const [filter] = useQueryState("jobs", parseAsString.withDefault(""));
	console.log(filter, "here");

	const { data: schedulePending, isLoading } = useQuery({
		queryKey: ["schedulePending"],
		queryFn: async () => {
			const [data, _] = await getSchedulePending();
			console.log(data);
			return data;
		},
	});

	const { data: scheduleClosed, isLoading: isLoadingClosed } = useQuery({
		queryKey: ["scheduleClosed"],
		queryFn: async () => {
			const [data, _] = await getScheduleClosed();
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
