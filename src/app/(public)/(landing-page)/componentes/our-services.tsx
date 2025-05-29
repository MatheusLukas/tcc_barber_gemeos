"use client";
import { Animation } from "@/src/components/animation";
import { Button } from "@/src/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/src/components/ui/table";
import { cn } from "@/src/lib/utils";
import { getAllJobs } from "@/src/server/getAllJobs";
import { formatNumberToCurrency } from "@/src/utils/formatNumberToCurrency";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const servicesPrimary = [
	{
		type: "Corte 1 pentea",
		value: "R$ 30,00",
	},
	{
		type: "Social",
		value: "R$ 35,00",
	},
	{
		type: "Disfarçado 0",
		value: "R$ 35,00",
	},
	{
		type: "Navalhado",
		value: "R$ 35,00",
	},
	{
		type: "Sobrancelha",
		value: "R$ 10,00",
	},
	{
		type: "Barba",
		value: "R$ 20,00",
	},
	{
		type: "Barba Desenhada",
		value: "R$ 25,00",
	},
];

export function OurServices() {
	const { data, isLoading } = useQuery({
		queryKey: ["services"],
		queryFn: async () => {
			const [data, _] = await getAllJobs();
			return data;
		},
	});

	return (
		<div className="mt-28 relative">
			<Image
				className="w-full h-[800px] sm:h-[700px] object-cover"
				src="/barber-image.jpg"
				alt="Barber Image"
				width={1920}
				height={1080}
				quality={100}
			/>
			<div className="absolute inset-0 bg-black opacity-50 h-[800px] sm:h-[700px]" />
			<div className="absolute z-10 left-1/2 transform -translate-x-1/2 top-10 w-full space-y-4">
				<Animation direction="up">
					<p className="text-4xl font-bold text-center text-white">
						Nossos serviços
					</p>
				</Animation>
				<div className="container top-10">
					<Animation direction="left">
						<Table>
							<TableHeader>
								<TableRow className="bg-[#262626] *:text-white *:pointer-events-none *:text-center border-none">
									<TableHead>
										<Animation direction="up" from={20}>
											Serviço
										</Animation>
									</TableHead>
									<TableHead>
										<Animation direction="up" from={20}>
											Preço
										</Animation>
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.map((service, index) => (
									<TableRow
										key={service.id}
										className={cn(
											index % 2 === 0 ? "bg-black" : "bg-[#262626]",
											"pointer-events-none *:text-center border-none",
										)}
									>
										<TableCell className="text-center text-white">
											<Animation delay={0.4 + index * 0.1} direction="right">
												{service.name}
											</Animation>
										</TableCell>
										<TableCell className="text-center text-white">
											<Animation delay={0.4 + index * 0.1} direction="left">
												{formatNumberToCurrency(service.price)}
											</Animation>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Animation>
					<div className="max-w-sm space-y-4 mx-auto mt-4">
						<Animation direction="right">
							<p className="text-xl text-white text-pretty text-center">
								Aproveite nossos preços e agende seu corte com um dos nossos
								barbeiros
							</p>
						</Animation>
						<Animation direction="left">
							<Button className="w-full group">
								Agendar
								<ArrowUpRight className="group-hover:translate-x-2 transition" />
							</Button>
						</Animation>
					</div>
				</div>
			</div>
		</div>
	);
}
