"use client";
import { Button } from "@/src/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { queryClient } from "@/src/lib/query-client";
import { ChangeProductQuantity } from "@/src/server/admin/changeProductQuantity";
import { deleteProduct } from "@/src/server/admin/deleteProduct";
import { formatNumberToCurrency } from "@/src/utils/formatNumberToCurrency";
import { useMutation } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import {
	ArrowUpDown,
	Minus,
	MoreHorizontal,
	Pen,
	Plus,
	Trash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export type Products = {
	id: string;
	name: string;
	quantity: number;
	unityPrice: number;
	image: string;
	priceTotal: number;
};

export const columns: ColumnDef<Products>[] = [
	{
		accessorKey: "image",
		header: () => {
			return <span className="flex items-center">Image</span>;
		},
		cell: ({ row }) => {
			return (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger className="hover:cursor-pointer" asChild>
							<Image
								src={row.original.image}
								alt={row.original.name}
								width={100}
								height={100}
								className="w-28 h-14 object-cover"
							/>
						</TooltipTrigger>
						<TooltipContent>
							<Image
								src={row.original.image}
								alt={row.original.name}
								width={1920}
								height={1080}
								className="w-96 object-cover"
							/>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			);
		},
	},
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
						Nome
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</span>
				</Button>
			);
		},
	},
	{
		accessorKey: "unityPrice",
		header: () => {
			return (
				<span className="flex items-center justify-center">Preço Unitário</span>
			);
		},
		cell: ({ row }) => {
			return (
				<span className="flex items-center justify-center">
					{formatNumberToCurrency(row.original.unityPrice)}
				</span>
			);
		},
	},
	{
		accessorKey: "priceTotal",
		header: () => {
			return (
				<span className="flex items-center justify-center">Preço Total</span>
			);
		},
		cell: ({ row }) => {
			return (
				<span className="flex items-center justify-center">
					{formatNumberToCurrency(row.original.priceTotal)}
				</span>
			);
		},
	},
	{
		accessorKey: "quantity",
		header: () => {
			return (
				<span className="flex items-center justify-center">Quantidade</span>
			);
		},
		cell: ({ row }) => {
			const { isLoading, mutateAsync } = useMutation({
				mutationKey: ["changeProductQuantity", row.original.id],
				mutationFn: async (params: {
					id: string;
					operation: "increment" | "decrement";
				}) => {
					await ChangeProductQuantity(params);
				},
				onSettled: () => {
					queryClient.invalidateQueries({
						queryKey: ["products"],
					});
				},
			});

			return (
				<div className="flex items-center justify-center gap-4">
					<Button
						disabled={isLoading}
						onClick={() => {
							toast.promise(
								mutateAsync({
									id: row.original.id,
									operation: "increment",
								}),
								{
									loading: "Alterando quantidade...",
									success: "Quantidade alterada com sucesso",
									error: "Erro ao alterar quantidade",
								},
							);
						}}
					>
						<Plus />
					</Button>
					<span className="flex items-center justify-center">
						{row.original.quantity}
					</span>
					<Button
						disabled={isLoading}
						variant="destructive"
						onClick={() => {
							toast.promise(
								mutateAsync({
									id: row.original.id,
									operation: "decrement",
								}),
								{
									loading: "Alterando quantidade...",
									success: "Quantidade alterada com sucesso",
									error: "Erro ao alterar quantidade",
								},
							);
						}}
					>
						<Minus />
					</Button>
				</div>
			);
		},
	},
	{
		id: "action",
		header: () => {
			return <span className="flex items-center justify-center">Opções</span>;
		},
		cell: ({ row }) => {
			return (
				<div className="flex justify-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0 mx-auto">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="center">
							<DropdownMenuLabel>Ações</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => {
									const deletePromise = async () => {
										const [_, error] = await deleteProduct({
											productId: row.original.id,
										});
										if (error) throw error;
										return true;
									};

									toast.promise(deletePromise(), {
										loading: "Deletando...",
										success: "Produto deletado com sucesso",
										error: "Erro ao deletar produto",
									});

									queryClient.invalidateQueries({
										queryKey: ["products"],
									});
								}}
								className="text-red-500"
							>
								<Trash />
								Excluir
							</DropdownMenuItem>
							<DropdownMenuItem className="text-blue-500" asChild>
								<Link href={{ query: { productId: row.original.id } }}>
									<Pen />
									Editar
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];
