"use client";
import { Animation } from "@/src/components/animation";
import { getAllBarbers } from "@/src/server/getAllBarbers";
import { useQuery } from "@tanstack/react-query";
import { Instagram } from "lucide-react";
import { OurBarbersCard } from "./our-barbers-cards";

export function OurBarbers() {
	const { data, isLoading } = useQuery({
		queryKey: ["barbers"],
		queryFn: async () => {
			const [data, _] = await getAllBarbers();
			return data;
		},
	});

	return (
		<div className="flex flex-col container mt-28 gap-4">
			<Animation once direction="left">
				<p className="text-3xl font-bold text-center sm:text-start w-full">
					Nossos barbeiros
				</p>
			</Animation>
			<div className="grid grid-cols-1 gap-8 sm:gap-0 sm:grid-cols-2 lg:grid-cols-3 place-items-center xl:grid-cols-4 h-fit">
				{data?.map((barber, idx) => {
					return (
						<OurBarbersCard
							key={barber.id}
							barber={barber.name}
							photo={barber.image}
							jobTitle="Barbeiro"
							icon={Instagram}
							idx={idx}
						/>
					);
				})}
			</div>
		</div>
	);
}
