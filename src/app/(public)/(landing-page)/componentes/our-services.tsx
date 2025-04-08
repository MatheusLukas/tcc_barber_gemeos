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
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/src/components/ui/tabs";
import { cn } from "@/src/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const invoices = [
	{
		invoice: "INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV004",
		paymentStatus: "Paid",
		totalAmount: "$450.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV005",
		paymentStatus: "Paid",
		totalAmount: "$550.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV006",
		paymentStatus: "Pending",
		totalAmount: "$200.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
];

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
				<div className="container">
					<Tabs defaultValue="start-week">
						<Animation
							direction="up"
							className="flex items-center justify-center gap-6"
						>
							<TabsList className="w-full !bg-transparent gap-6 sm:inline-flex inline-table space-y-2 sm:space-y-0">
								<TabsTrigger
									className="w-full bg-primary/80 data-[state=active]:bg-primary"
									value="start-week"
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
						</Animation>
						<TabsContent value="start-week">
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
										{servicesPrimary.map((service, index) => (
											<TableRow
												key={service.type}
												className={cn(
													index % 2 === 0 ? "bg-black" : "bg-[#262626]",
													"pointer-events-none *:text-center border-none",
												)}
											>
												<TableCell className="text-center text-white">
													<Animation
														delay={0.4 + index * 0.1}
														direction="right"
													>
														{service.type}
													</Animation>
												</TableCell>
												<TableCell className="text-center text-white">
													<Animation delay={0.4 + index * 0.1} direction="left">
														{service.value}
													</Animation>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</Animation>
						</TabsContent>
						<TabsContent value="end-week">
							<Animation direction="right">
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
										{servicesSecondary.map((service, index) => (
											<TableRow
												key={service.type}
												className={cn(
													index % 2 === 0 ? "bg-black" : "bg-[#262626]",
													"pointer-events-none *:text-center border-none",
												)}
											>
												<TableCell className="text-center text-white">
													<Animation
														delay={0.4 + index * 0.1}
														direction="right"
													>
														{service.type}
													</Animation>
												</TableCell>
												<TableCell className="text-center text-white">
													<Animation delay={0.4 + index * 0.1} direction="left">
														{service.value}
													</Animation>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</Animation>
						</TabsContent>
					</Tabs>
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

// {
// 	<Table>
// 		<TableHeader>
// 			<TableRow className="bg-[#262626] *:text-white *:pointer-events-none *:text-center border-none">
// 				<TableHead>Serviço</TableHead>
// 				<TableHead>Preço</TableHead>
// 			</TableRow>
// 		</TableHeader>
// 		<TableBody>
// 			{servicesSecondary.map((service, index) => (
// 				<TableRow
// 					key={service.type}
// 					className={cn(
// 						index % 2 === 0 ? "bg-black" : "bg-[#262626]",
// 						"pointer-events-none *:text-center border-none",
// 					)}
// 				>
// 					<TableCell className="text-center text-white">
// 						{service.type}
// 					</TableCell>
// 					<TableCell className="text-center text-white">
// 						{service.value}
// 					</TableCell>
// 				</TableRow>
// 			))}
// 		</TableBody>
// 	</Table>;
// }
