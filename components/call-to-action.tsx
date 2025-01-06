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
			className="bg-muted flex items-center justify-center py-10 gap-10"
		>
			<Image
				alt="Gemeos"
				src="/gemeos-barbers.jpeg"
				width={1920}
				height={1080}
				className="rounded-full size-60 object-cover"
			/>
			<div className="max-w-md space-y-4">
				<p className="text-4xl font-bold">Hora de renovar o visual!</p>
				<p className="text-xl text-pretty">
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
