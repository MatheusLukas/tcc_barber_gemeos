import * as motion from "framer-motion/client";
import Image from "next/image";
import { Contact } from "./contact";

export function HomeHero() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{
				opacity: 1,
				y: 0,
				transition: { duration: 0.5, delay: 0.2 },
			}}
			viewport={{ once: true, margin: "-64px" }}
		>
			<div className="relative">
				<Image
					className="w-full max-h-[900px] object-cover relative"
					src="/hero.jpg"
					alt="Home hero"
					width={1920}
					height={1080}
					quality={100}
				/>
				<div className="absolute inset-0 bg-black opacity-50 max-h-[900px]" />
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col *:font-bold *:text-6xl *:animate-fade-left animate-delay-300 text-white">
					<p>Seu estilo</p>
					<p>nossa</p>
					<p>especialidade</p>
				</div>
			</div>

			<Contact />
		</motion.div>
	);
}
