import * as motion from "framer-motion/client";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

export function CallToAction() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{
				opacity: 1,
				y: 0,
				transition: { duration: 0.3, delay: 0.2 },
			}}
			viewport={{ once: true, margin: "-64px" }}
			className="bg-muted flex flex-col md:flex-row items-center justify-center py-10 md:gap-10 gap-4"
		>
			<Image
				alt="Gemeos"
				src="/gemeos-barbers.jpeg"
				width={1920}
				height={1080}
				className="rounded-full size-60 object-cover"
			/>
			<div className="max-w-md md:space-y-4 space-y-2 px-8 md:px-0">
				<p className="md:text-4xl text-3xl font-bold md:text-left text-center">
					Hora de renovar o visual!
				</p>
				<p className="md:text-xl text-lg text-pretty md:text-left text-center">
					Agende agora mesmo o seu corte de cabelo com nossos barbeiros
					especialistas. Reserve seu horário e fique no estilo que você merece
				</p>
				<Button className="w-full group">
					Agendar
					<ArrowUpRight className="group-hover:translate-x-2 transition" />
				</Button>
			</div>
		</motion.div>
	);
}
