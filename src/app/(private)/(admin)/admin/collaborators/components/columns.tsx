"use client";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

type Collaborators = {
	id: string;
	name: string;
	image: string;
	role: string;
	email: string;
};

export const columns: ColumnDef<Collaborators>[] = [
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
						Barbeiro
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
		accessorKey: "email",
		header: () => <span className="flex items-center">Email</span>,
	},
	{
		accessorKey: "role",
		header: () => <span className="flex items-center">Telefone</span>,
	},
];
