"use client";
import { Icons } from "@/src/components/icons";
import { Button } from "@/src/components/ui/button";
import { Choicebox } from "@/src/components/ui/choicebox";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { DateTimePicker24h } from "./date-timer-picker-24h";

const cardBarbers = [
	{
		photo: "/barbeiro.jpg",
		name: "Daniel Freitas",
		role: "Barbeiro",
	},
	{
		photo: "/barbeiro.jpg",
		name: "Gabriel Freitas",
		role: "Barbeiro",
	},
	{
		photo: "/barbeiro.jpg",
		name: "Richard",
		role: "Agiota",
	},
	{
		photo: "/barbeiro.jpg",
		name: "Maionese",
		role: "Manicure",
	},
];

const teste = [
	{
		id: 1,
		title: "Corte 1 pente",
		description: "R$ 30,00",
	},
	{
		id: 2,
		title: "Social",
		description: "R$ 35,00",
	},
	{
		id: 3,
		title: "Disfarçado zero",
		description: "R$ 35,00",
	},
	{
		id: 4,
		title: "Disfarçado zero",
		description: "R$ 35,00",
	},
	{
		id: 5,
		title: "Disfarçado zero",
		description: "R$ 35,00",
	},
	{
		id: 6,
		title: "Disfarçado zero",
		description: "R$ 35,00",
	},
	{
		id: 7,
		title: "Disfarçado zero",
		description: "R$ 35,00",
	},
];

const paymenthMethods = [
	{
		id: 1,
		name: "Mercado Pago",
		description: "Äceitamos cartão e pix",
		icon: Icons.CreditCard,
	},
	{
		id: 2,
		name: "Pagar na hora",
		description:
			"Este método de pagamento serve para pagamento na hora junto ao barbeiro",
		icon: Icons.Coins,
	},
];

export function ScheduleComponent() {
	const [hovered, setHovered] = useState<number | null>(null);
	const [clicked, setClicked] = useState<number | null>(null);

	return (
		<div className="container my-10 space-y-6">
			<p className="text-3xl font-bold">Agendamento</p>
			<p className="text-2xl font-medium">Selecione um barbeiro</p>
			<div className="grid grid-cols-4">
				{cardBarbers.map((barber, idx) => (
					<button
						key={barber.name}
						type="button"
						onMouseEnter={() => setHovered(idx)}
						onMouseLeave={() => setHovered(null)}
						onClick={() => setClicked(idx)}
						className={cn(
							"hover:bg-muted w-fit p-2 rounded-lg transition-all duration-500",
							hovered !== null && hovered !== idx && "blur-[2px] scale-[0.98]",
							clicked !== null && clicked === idx && "bg-muted",
						)}
					>
						<Image
							src={barber.photo}
							alt={barber.name}
							width={200}
							height={200}
						/>
						<div className="*:text-start">
							<p className="text-lg font-bold">{barber.name}</p>
							<p className="text-muted-foreground">{barber.role}</p>
						</div>
					</button>
				))}
			</div>
			<p className="text-2xl font-medium">
				Selecione o serviço e o dia desejado!
			</p>
			<div className="grid grid-cols-2 gap-4">
				<DateTimePicker24h />
				<Choicebox
					className="mx-auto w-full"
					selectionMode="multiple"
					defaultSelectedKeys={["Standard"]}
					aria-label="Select job"
					gap={0}
					columns={1}
					selectionBehavior="toggle"
				>
					{teste.map((item, idx) => (
						<Choicebox.Item
							key={item.id}
							className={cn(
								"w-full p-4 first:!rounded-t-md last:!rounded-b-md rounded-r-none rounded-l-none",
								idx % 2 === 0 ? "bg-card" : "bg-muted",
							)}
							title={item.title}
							description={item.description}
						/>
					))}
				</Choicebox>
			</div>
			<div className="space-y-6">
				<div className="max-w-sm space-y-2">
					<p className="text-2xl font-medium">Opções de pagamento</p>
					<p className="text-muted-foreground text-pretty">
						Preencha todos os campos e seleções para continuar o processo e
						finalizar sua compra
					</p>
				</div>
				<Choicebox
					className="mx-auto w-full"
					selectionMode="single"
					defaultSelectedKeys={["Standard"]}
					aria-label="Select job"
					gap={0}
					columns={1}
					selectionBehavior="toggle"
				>
					{paymenthMethods.map((item, idx) => (
						<Choicebox.Item
							key={item.id}
							className={cn(
								"w-full p-4 first:!rounded-t-md last:!rounded-b-md rounded-r-none rounded-l-none",
								idx % 2 === 0 ? "bg-card" : "bg-muted",
							)}
							title={item.name}
							description={item.description}
							icon={item.icon}
						/>
					))}
				</Choicebox>
				<div className="w-full flex gap-4 justify-end">
					<Button variant="outline">Cancelar</Button>
					<Button>Continuar</Button>
				</div>
			</div>
		</div>
	);
}
