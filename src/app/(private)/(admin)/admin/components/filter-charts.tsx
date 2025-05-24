"use client";
import { Animation } from "@/src/components/animation";
import { Button } from "@/src/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/src/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filterOptions = [
	{ value: "dia", label: "Hoje" },
	{ value: "semana", label: "Semana" },
	{ value: "mes", label: "Mês" },
];

export function FilterCharts() {
	const params = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const handleFilterChange = (value: string) => {
		const searchParams = new URLSearchParams(params);
		searchParams.set("filter", value);

		router.push(`${pathname}?${searchParams.toString()}`);
	};

	const handleResetFilter = () => {
		const searchParams = new URLSearchParams(params);
		searchParams.delete("filter");
		router.push(`${pathname}?${searchParams.toString()}`);
	};

	return (
		<div className="flex items-center gap-2">
			<Animation delay={0.1} once direction="left">
				<Button disabled={!params.get("filter")} onClick={handleResetFilter}>
					Resetar Filtro
				</Button>
			</Animation>
			<Animation delay={0.2} once direction="right">
				<Select onValueChange={handleFilterChange}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Selecione um filtro" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Filtro</SelectLabel>
							{filterOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</Animation>
		</div>
	);
}
