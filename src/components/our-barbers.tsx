import { Instagram } from "lucide-react";
import { Animation } from "./animation";
import { OurBarbersCard } from "./our-barbers-cards";

const cardBarbers = [
	{
		photo: "/barbeiro.jpg",
		name: "Daniel Freitas",
		role: "Barbeiro",
		icon: Instagram,
	},
	{
		photo: "/barbeiro.jpg",
		name: "Gabriel Freitas",
		role: "Barbeiro",
		icon: Instagram,
	},
	{
		photo: "/barbeiro.jpg",
		name: "Richard",
		role: "Agiota",
		icon: Instagram,
	},
	{
		photo: "/barbeiro.jpg",
		name: "Maionese",
		role: "Manicure",
		icon: Instagram,
	},
];

export function OurBarbers() {
	return (
		<div className="flex flex-col container mt-28 gap-4">
			<Animation once direction="left">
				<p className="text-3xl font-bold text-center sm:text-start w-full">
					Nossos barbeiros
				</p>
			</Animation>
			<div className="grid grid-cols-1 gap-8 sm:gap-0 sm:grid-cols-2 lg:grid-cols-3 place-items-center xl:grid-cols-4 h-fit">
				{cardBarbers.map((barber, idx) => {
					return (
						<OurBarbersCard
							key={barber.name}
							barber={barber.name}
							photo={barber.photo}
							role={barber.role}
							icon={barber.icon}
							idx={idx}
						/>
					);
				})}
			</div>
		</div>
	);
}
