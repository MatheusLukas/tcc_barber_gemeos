"use client";
import { Animation } from "@/src/components/animation";
import { Input } from "@/src/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/src/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { FilterCollaborator } from "./components/filter-collaborator";
import { ModalCreateCollaborator } from "./components/modal-create-collaborator";
import { ShowCollaborators } from "./components/show-collaborators";
import { TableCollaborators } from "./components/table-collaborators";

export default function Collaborators() {
	const [filterValue, setFilterValue] = useState("");

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<Animation delay={0.2} once direction="left">
					<p className="text-3xl font-bold text-center sm:text-start">
						Colaboradores
					</p>
				</Animation>
				<Animation
					className="flex items-center gap-4"
					delay={0.2}
					once
					direction="right"
				>
					<ModalCreateCollaborator />
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
			<div className="grid grid-cols-5 gap-20">
				<ShowCollaborators />
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
						<FilterCollaborator />
					</Animation>
				</div>
				<Animation direction="up">
					<TableCollaborators
						filterValue={filterValue}
						setFilter={setFilterValue}
					/>
				</Animation>
			</div>
		</div>
	);
}
