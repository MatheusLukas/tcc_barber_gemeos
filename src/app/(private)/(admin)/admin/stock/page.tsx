"use client";
import { Animation } from "@/src/components/animation";
import { Input } from "@/src/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { ModalCreateProduct } from "./components/modal-create-product";
import { TableStock } from "./components/table-stock";

export default function StockAdmin() {
	const [filterValue, setFilterValue] = useState("");

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between max-sm:gap-4">
				<Animation delay={0.2} once direction="left">
					<p className="text-3xl font-bold text-start">Estoque</p>
				</Animation>
				<div className="flex gap-4">
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
						<ModalCreateProduct />
					</Animation>
				</div>
			</div>
			<div>
				<Animation direction="up">
					<TableStock filterValue={filterValue} setFilter={setFilterValue} />
				</Animation>
			</div>
		</div>
	);
}
