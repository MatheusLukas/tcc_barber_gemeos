"use client";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Appointment = {
	id: string;
	name: string;
	image: string | null;
	price: string;
	date: string;
	time: string;
	barber: {
		name: string;
		image: string;
	};
	job: {
		job: string;
	}[];
	paymentMethod: string;
};

export const columns: ColumnDef<Appointment>[] = [
	{
		accessorKey: "name",
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
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					{row.original.image && (
						<Avatar className="h-6 w-6">
							<AvatarImage src={row.original.image} alt={row.original.name} />
							<AvatarFallback>
								{row.original.name.split(" ")[0][0].toUpperCase()}
							</AvatarFallback>
						</Avatar>
					)}
					{!row.original.image && (
						<Avatar className="h-6 w-6">
							<AvatarFallback>
								{row.original.name.split(" ")[0][0].toUpperCase()}
							</AvatarFallback>
						</Avatar>
					)}
					<span>{row.original.name}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "job",
		header: "Serviços",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					{row.original.job.map((job) => (
						<Badge variant="outline" key={job.job}>
							{job.job}
						</Badge>
					))}
				</div>
			);
		},
	},
	{
		accessorKey: "price",
		header: () => {
			return <span className="flex items-center">Valor</span>;
		},
	},
	{
		accessorKey: "paymentMethod",
		header: () => {
			return <span className="flex items-center">Método de pagamento</span>;
		},
		cell: ({ row }) => {
			const payments = {
				DINHEIRO: "Dinheiro",
				MERCADO_PAGO: "Mercado Pago",
			};

			const paymentMethod =
				payments[row.original.paymentMethod as keyof typeof payments];

			return <Badge>{paymentMethod}</Badge>;
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
		accessorKey: "barber",
		header: "Responsável",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<Avatar className="h-6 w-6">
						<AvatarImage
							src={row.original.barber.image}
							alt={row.original.barber.name}
						/>
						<AvatarFallback>
							{row.original.barber.name.split(" ")[0][0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<span>{row.original.barber.name}</span>
				</div>
			);
		},
	},
];
