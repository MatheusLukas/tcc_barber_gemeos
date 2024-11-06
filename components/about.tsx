import * as motion from "framer-motion/client";
import Image from "next/image";
import { CardAbout } from "./card-about";
import { CardBody, CardContainer } from "./ui/3d-card";
import BlurFade from "./ui/blur-fade";

const itemsAbout = [
	{
		title: "Mais de 20 Funcionarios",
		description:
			"Nossa equipe de 20 profissionais qualificados oferece o melhor em cortes e cuidados masculinos para garantir uma experiência ",
	},
	{
		title: "5 Anos de experiencia",
		description:
			"Com 5 anos de experiência, oferecemos serviços de alta qualidade em cortes e cuidados masculinos, ",
	},
	{
		title: "25+ tipos de corte",
		description:
			"Oferecemos 25 estilos de cortes de cabelo, desde os clássicos até os mais modernos, para atender a todos os gostos.",
	},
];

export function About() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{
				opacity: 1,
				y: 0,
				transition: { duration: 0.3, delay: 0.2 },
			}}
			viewport={{ once: true, margin: "-64px" }}
			className="container grid grid-rows-2 mt-28 gap-16"
		>
			<div className="grid grid-cols-[5fr_7fr]">
				<div className="space-y-4">
					<p className="text-2xl font-bold">Sobre nós</p>
					<p className="text-muted-foreground text-balance">
						Bem-vindo à Barbearia Gêmeos, localizada em São Paulo, onde tradição
						e estilo se encontram. Fundada por dois irmãos, oferecemos
						atendimento personalizado, unindo técnicas clássicas e modernas.
						Nossa equipe qualificada está sempre atualizada com as últimas
						tendências, garantindo uma experiência única de cuidado e bem-estar.
					</p>
					<p className="text-muted-foreground text-balance">
						Bem-vindo à Barbearia Gêmeos, localizada em São Paulo, onde tradição
						e estilo se encontram. Fundada por dois irmãos, oferecemos
						atendimento personalizado, unindo técnicas clássicas e modernas.
						Nossa equipe qualificada está sempre atualizada com as últimas
						tendências, garantindo uma experiência única de cuidado e bem-estar.
					</p>
				</div>
				<div className="flex relative px-24">
					<div className="bg-muted p-3 shadow-lg absolute top-0 left-80 rotate-12 -z-10">
						<Image
							src="/barbers.jpeg"
							alt="About"
							width={1920}
							height={1080}
							quality={100}
							className="w-72"
						/>
					</div>
					<CardContainer className="bg-muted p-3 max-w-[309px]">
						<CardBody>
							<Image
								src="/gemeos-barbers.jpeg"
								alt="About"
								width={1920}
								height={1080}
								quality={100}
								className="w-72"
							/>
						</CardBody>
					</CardContainer>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-40">
				{itemsAbout.map((item, idx) => (
					<BlurFade key={item.title} delay={0.5 + idx * 0.05} inView>
						<CardAbout title={item.title} description={item.description} />
					</BlurFade>
				))}
			</div>
		</motion.div>
	);
}
