import { cn } from "@/lib/utils";
import * as motion from "framer-motion/client";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

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
const servicesSecondary = [
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
		value: "R$ 40,00",
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
	return (
		<motion.div
			initial={{ opacity: 0, x: -50 }}
			whileInView={{
				opacity: 1,
				x: 0,
				transition: { duration: 0.4, delay: 0.2 },
			}}
			viewport={{ once: true, margin: "-64px" }}
			className="relative mt-28"
		>
			<Image
				className="w-full h-[700px] object-cover"
				src="/barber-image.jpg"
				alt="Barber Image"
				width={1920}
				height={1080}
				quality={100}
			/>
			<div className="absolute inset-0 bg-black opacity-50 h-[700px]" />
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-4 flex flex-col items-center justify-center">
				<p className="text-4xl font-bold text-center text-white">
					Nossos serviços
				</p>
				<Tabs defaultValue="early-week" className="max-w-[800px]">
					<TabsList className="w-full !bg-transparent gap-6">
						<TabsTrigger
							className="w-full bg-primary/80 data-[state=active]:bg-primary"
							value="early-week"
						>
							Segunda &bull; Terça &bull; Quarta
						</TabsTrigger>
						<TabsTrigger
							className="w-full bg-primary/90 data-[state=active]:bg-primary"
							value="end-week"
						>
							Quinta &bull; Sexta &bull; Sábado
						</TabsTrigger>
					</TabsList>
					<TabsContent value="early-week">
						<Table>
							<TableHeader>
								<TableRow className="bg-[#262626] *:text-white *:pointer-events-none *:text-center border-none">
									<TableHead className="w-[400px]">Serviço</TableHead>
									<TableHead className="w-[400px]">Preço</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{servicesPrimary.map((service, index) => (
									<TableRow
										key={service.type}
										className={cn(
											index % 2 === 0 ? "bg-black" : "bg-[#262626]",
											"pointer-events-none border-none",
										)}
									>
										<TableCell className="text-center text-white">
											{service.type}
										</TableCell>
										<TableCell className="text-center text-white">
											{service.value}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TabsContent>
					<TabsContent className="overflow-x-auto" value="end-week">
						<Table>
							<TableHeader>
								<TableRow className="bg-[#262626] *:text-white *:pointer-events-none *:text-center border-none">
									<TableHead className="w-[400px]">Serviço</TableHead>
									<TableHead className="w-[400px]">Preço</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{servicesSecondary.map((service, index) => (
									<TableRow
										key={service.type}
										className={cn(
											index % 2 === 0 ? "bg-black" : "bg-[#262626]",
											"pointer-events-none *:text-center border-none",
										)}
									>
										<TableCell className="text-center text-white">
											{service.type}
										</TableCell>
										<TableCell className="text-center text-white">
											{service.value}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TabsContent>
				</Tabs>

				<div className="max-w-sm space-y-2">
					<p className="text-xl text-white text-pretty text-center">
						Aproveite nossos preços e agende seu corte com um dos nossos
						barbeiros
					</p>
					<Button className="w-full group">
						Agendar
						<ArrowUpRight className="group-hover:translate-x-2 transition" />
					</Button>
				</div>
			</div>
		</motion.div>
	);
}
