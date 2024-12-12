import { cn } from "@/lib/utils";
import * as motion from "framer-motion/client";
import Image from "next/image";
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
		type: "Corte 2 pentea",
		value: "R$ 30,00",
	},
	{
		type: "Corte 3 pentea",
		value: "R$ 30,00",
	},
	{
		type: "Corte 4 pentea",
		value: "R$ 30,00",
	},
	{
		type: "Corte 5 pentea",
		value: "R$ 30,00",
	},
	{
		type: "Corte 6 pentea",
		value: "R$ 30,00",
	},
	{
		type: "Corte 7 pentea",
		value: "R$ 30,00",
	},
];
const servicesSecondary = [
	{
		type: "Corte 1 pentea",
		value: "R$ 30,00",
	},
	{
		type: "Corte 2 pentea",
		value: "R$ 30,00",
	},
	{
		type: "Corte 3 pentea",
		value: "R$ 30,00",
	},
	{
		type: "Corte 4 pentea",
		value: "R$ 30,00",
	},
	{
		type: "Corte 5 pentea",
		value: "R$ 30,00",
	},
	{
		type: "Corte 6 pentea",
		value: "R$ 30,00",
	},
	{
		type: "Corte 7 pentea",
		value: "R$ 30,00",
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
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-4 max-w-3xl">
				<p className="text-4xl font-bold text-center text-white">
					Nossos serviços
				</p>
				<Tabs defaultValue="early-week" className="w-full">
					<TabsList className="w-full bg-background gap-6">
						<TabsTrigger
							className="w-full bg-primary/80 data-[state=active]:bg-primary"
							value="early-week"
						>
							Segunda &bull; Terça &bull; Quarta
						</TabsTrigger>
						<TabsTrigger
							className="w-full bg-primary/80 data-[state=active]:bg-primary"
							value="end-week"
						>
							Quinta &bull; Sexta &bull; Sábado
						</TabsTrigger>
					</TabsList>
					<TabsContent value="early-week">
						<Table>
							<TableHeader>
								<TableRow className="bg-muted-foreground *:text-black *:pointer-events-none *:text-center">
									<TableHead>Serviço</TableHead>
									<TableHead>Preço</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{servicesPrimary.map((service, index) => (
									<TableRow
										key={service.type}
										className={cn(
											index % 2 === 0 ? "bg-background" : "bg-muted-foreground",
											"pointer-events-none",
										)}
									>
										<TableCell className="text-center">
											{service.type}
										</TableCell>
										<TableCell className="text-center">
											{service.value}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TabsContent>
					<TabsContent value="end-week">
						<Table>
							<TableHeader>
								<TableRow className="bg-muted-foreground *:text-black *:pointer-events-none *:text-center">
									<TableHead>Serviço</TableHead>
									<TableHead>Preço</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{servicesSecondary.map((service, index) => (
									<TableRow
										key={service.type}
										className={cn(
											index % 2 === 0 ? "bg-background" : "bg-muted-foreground",
											"pointer-events-none *:text-center",
										)}
									>
										<TableCell>{service.type}</TableCell>
										<TableCell>{service.value}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TabsContent>
				</Tabs>
			</div>
		</motion.div>
	);
}
