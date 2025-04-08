"use client";

import { StatusBadge } from "@/src/app/(private)/(admin)/components/status-badge";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Appointment = {
	client: string;
	service: string;
	value: string;
	date: string;
	time: string;
	status: "Em andamento" | "Cancelado" | "Agendado" | "Atrasado";
	responsible: string;
};

export const columns: ColumnDef<Appointment>[] = [
	{
		accessorKey: "client",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="p-0 hover:bg-transparent"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					<span className="flex items-center">
						Cliente
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</span>
				</Button>
			);
		},
	},
	{
		accessorKey: "service",
		header: "Serviços",
	},
	{
		accessorKey: "value",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="p-0 hover:bg-transparent"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					<span className="flex items-center">
						Valor
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</span>
				</Button>
			);
		},
	},
	{
		accessorKey: "date",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="p-0 hover:bg-transparent"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					<span className="flex items-center">
						Data
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</span>
				</Button>
			);
		},
	},
	{
		accessorKey: "time",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="p-0 hover:bg-transparent"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					<span className="flex items-center">
						Horário
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</span>
				</Button>
			);
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			return <StatusBadge status={row.getValue("status")} />;
		},
	},
	{
		accessorKey: "responsible",
		header: "Responsável",
		cell: ({ row }) => {
			const responsible = row.getValue("responsible") as string;
			return (
				<div className="flex items-center gap-2">
					<Avatar className="h-6 w-6">
						<AvatarImage src="/placeholder-avatar.jpg" alt={responsible} />
						<AvatarFallback>
							{responsible
								.split(" ")
								.map((name) => name[0])
								.join("")
								.toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<span>{responsible}</span>
				</div>
			);
		},
	},
];
