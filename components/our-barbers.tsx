import * as motion from "framer-motion/client";
import { Instagram } from "lucide-react";
import Barbeiro from "../public/barbeiro.jpg";
import { OurBarbersCard } from "./our-barbers-cards";

const cardBarbers = [
	{
		photo: Barbeiro,
		name: "Daniel Freitas",
		role: "Barbeiro",
		icon: Instagram,
	},
	{
		photo: Barbeiro,
		name: "Gabriel Freitas",
		role: "Barbeiro",
		icon: Instagram,
	},
	{
		photo: Barbeiro,
		name: "Richard",
		role: "Agiota",
		icon: Instagram,
	},
	{
		photo: Barbeiro,
		name: "Maionese",
		role: "Manicure",
		icon: Instagram,
	},
];

export function OurBarbers() {
	return (
		<motion.div
			initial={{ opacity: 0, x: -50 }}
			whileInView={{
				opacity: 1,
				x: 0,
				transition: { duration: 0.8, delay: 0.2 },
			}}
			viewport={{ once: true, margin: "-64px" }}
			className="flex flex-col container mt-28 gap-4"
		>
			<p className="text-3xl font-bold text-center sm:text-start w-full">
				Nossos barbeiros
			</p>
			<div className="grid grid-cols-1 gap-8 sm:gap-0 sm:grid-cols-2 lg:grid-cols-3 place-items-center xl:grid-cols-4 h-fit">
				{cardBarbers.map((barber) => {
					return (
						<OurBarbersCard
							key={barber.name}
							barber={barber.name}
							photo={barber.photo}
							role={barber.role}
							icon={barber.icon}
						/>
					);
				})}
			</div>
		</motion.div>
	);
}
