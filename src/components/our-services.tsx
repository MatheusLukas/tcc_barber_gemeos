import { cn } from "@/src/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Animation } from "./animation";
import { Button } from "./ui/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
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

export function OurServices() {
	return (
		<div className="relative mt-28">
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
				<Animation once direction="up">
					<p className="text-4xl font-bold text-center text-white">
						Nossos serviços
					</p>
				</Animation>
				<Animation once direction="left">
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
						<Animation direction="right" key="early-week">
							<TabsContent value="early-week">
								<Table>
									<TableCaption>A list of your recent invoices.</TableCaption>
									<TableHeader>
										<TableRow>
											<TableHead className="w-[100px]">Invoice</TableHead>
											<TableHead>Status</TableHead>
											<TableHead>Method</TableHead>
											<TableHead className="text-right">Amount</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{invoices.map((invoice) => (
											<TableRow key={invoice.invoice}>
												<TableCell className="font-medium">
													{invoice.invoice}
												</TableCell>
												<TableCell>{invoice.paymentStatus}</TableCell>
												<TableCell>{invoice.paymentMethod}</TableCell>
												<TableCell className="text-right">
													{invoice.totalAmount}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
									<TableFooter>
										<TableRow>
											<TableCell colSpan={3}>Total</TableCell>
											<TableCell className="text-right">$2,500.00</TableCell>
										</TableRow>
									</TableFooter>
								</Table>
							</TabsContent>
							<TabsContent value="end-week">
								<Table>
									<TableHeader>
										<TableRow className="bg-[#262626] *:text-white *:pointer-events-none *:text-center border-none">
											<TableHead>Serviço</TableHead>
											<TableHead>Preço</TableHead>
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
						</Animation>
					</Tabs>
				</Animation>
				<div className="max-w-sm space-y-4">
					<Animation once direction="right">
						<p className="text-xl text-white text-pretty text-center">
							Aproveite nossos preços e agende seu corte com um dos nossos
							barbeiros
						</p>
					</Animation>
					<Animation once direction="left">
						<Button className="w-full group">
							Agendar
							<ArrowUpRight className="group-hover:translate-x-2 transition" />
						</Button>
					</Animation>
				</div>
			</div>
		</div>
	);
}
