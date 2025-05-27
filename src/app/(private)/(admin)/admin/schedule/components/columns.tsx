"use client";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
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
import { queryClient } from "@/src/lib/query-client";
import { UpdateStatus } from "@/src/server/admin/updateStatus";
import { useMutation } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
	status: string;
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
		accessorKey: "status",
		header: () => {
			return <span className="flex items-center justify-center">Status</span>;
		},
		cell: ({ row }) => {
			const [edit, setEdit] = useState(false);

			const { mutateAsync, isLoading } = useMutation({
				mutationKey: ["updateStatus", row.original.id],
				mutationFn: async (status: string) => {
					await UpdateStatus({ id: row.original.id, status: status as any });
				},
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ["schedules"] });
				},
			});

			const handleStatusChange = (value: string) => {
				toast.promise(mutateAsync(value), {
					loading: "Atualizando status...",
					success: "Status atualizado com sucesso!",
					error: "Erro ao atualizar status!",
				});
				setEdit(false);
			};

			const status = {
				no_payed: "Sem pagamento",
				refunded: "Reembolsado",
				canceled: "Cancelado",
				confirmed: "Confirmado",
				pending: "Pendente",
			};

			return (
				<div className="flex items-center justify-center">
					{!edit ? (
						<Button
							variant="outline"
							onClick={() => setEdit(true)}
							disabled={isLoading}
							className="w-[180px]"
						>
							{status[row.original.status as keyof typeof status]}
						</Button>
					) : (
						<Select
							disabled={isLoading}
							defaultValue={row.original.status}
							onValueChange={handleStatusChange}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Selecione o status" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Status</SelectLabel>
									<SelectItem value="no_payed">Sem pagamento</SelectItem>
									<SelectItem value="refunded">Reembolsado</SelectItem>
									<SelectItem value="canceled">Cancelado</SelectItem>
									<SelectItem value="confirmed">Confirmado</SelectItem>
									<SelectItem value="pending">Pendente</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					)}
				</div>
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
