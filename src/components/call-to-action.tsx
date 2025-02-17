import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Animation } from "./animation";
import { Button } from "./ui/button";

export function CallToAction() {
	return (
		<Animation
			once
			direction="up"
			className="bg-muted flex flex-col md:flex-row items-center justify-center py-10 md:gap-10 gap-4 overflow-x-hidden"
		>
			<Animation once margin="0px" delay={0.3} direction="left">
				<Image
					alt="Gemeos"
					src="/gemeos-barbers.jpeg"
					width={1920}
					height={1080}
					className="rounded-full size-60 object-cover"
				/>
			</Animation>
			<div className="max-w-md md:space-y-4 space-y-2 px-8 md:px-0">
				<Animation once margin="0px" delay={0.3} direction="right">
					<p className="md:text-4xl text-3xl font-bold md:text-left text-center">
						Hora de renovar o visual!
					</p>
				</Animation>
				<Animation once margin="0px" delay={0.4} direction="right">
					<p className="md:text-xl text-lg text-pretty md:text-left text-center">
						Agende agora mesmo o seu corte de cabelo com nossos barbeiros
						especialistas. Reserve seu horário e fique no estilo que você merece
					</p>
				</Animation>
				<Animation once margin="0px" delay={0.5} direction="right">
					<Button className="w-full group">
						Agendar
						<ArrowUpRight className="group-hover:translate-x-2 transition" />
					</Button>
				</Animation>
			</div>
		</Animation>
	);
}
