import Image from "next/image";
import { Animation } from "./animation";
import { CardAbout } from "./card-about";
import { CardBody, CardContainer } from "./ui/3d-card";
import BlurFade from "./ui/blur-fade";

const itemsAbout = [
	{
		title: "Mais de 20 Funcionarios",
		description:
			"Nossa equipe de 20 profissionais qualificados oferece o melhor em cortes e cuidados masculinos para garantir uma experiência.",
	},
	{
		title: "5 Anos de experiencia",
		description:
			"Com 5 anos de experiência, oferecemos serviços de alta qualidade em cortes e cuidados masculinos.",
	},
	{
		title: "25+ tipos de corte",
		description:
			"Oferecemos 25 estilos de cortes de cabelo, desde os clássicos até os mais modernos, para atender a todos os gostos.",
	},
];

export function About() {
	return (
		<div className="container grid md:grid-rows-[4fr_4fr] lg:grid-rows-[8fr_4fr] mt-28 gap-16 md:gap-0 lg:gap-16 overflow-hidden">
			<div className="grid lg:grid-cols-[6fr_6fr] sm:grid-cols-[8fr_4fr] grid-cols-1">
				<div className="space-y-4">
					<Animation once delay={0.5} direction="left">
						<p className="text-2xl font-bold text-center sm:text-start">
							Sobre nós
						</p>
					</Animation>
					<Animation once delay={0.6} direction="left">
						<p className="text-muted-text text-balance text-justify sm:text-start">
							Bem-vindo à Barbearia Gêmeos, localizada em São Paulo, onde
							tradição e estilo se encontram. Fundada por dois irmãos,
							oferecemos atendimento personalizado, unindo técnicas clássicas e
							modernas. Nossa equipe qualificada está sempre atualizada com as
							últimas tendências, garantindo uma experiência única de cuidado e
							bem-estar.
						</p>
					</Animation>
					<Animation once delay={0.7} direction="left">
						<p className="text-muted-text text-balance text-justify sm:text-start">
							Bem-vindo à Barbearia Gêmeos, localizada em São Paulo, onde
							tradição e estilo se encontram. Fundada por dois irmãos,
							oferecemos atendimento personalizado, unindo técnicas clássicas e
							modernas. Nossa equipe qualificada está sempre atualizada com as
							últimas tendências, garantindo uma experiência única de cuidado e
							bem-estar.
						</p>
					</Animation>
				</div>
				<Animation
					once
					delay={0.8}
					direction="right"
					className="lg:flex block relative lg:px-24"
				>
					<div className="bg-muted p-3 shadow-lg absolute md:left-48 md:top-4 lg:top-0 xl:left-80 rotate-12 -z-10 lg:block hidden">
						<Image
							src="/barbers.jpeg"
							alt="About"
							width={1920}
							height={1080}
							quality={100}
							className="lg:w-72 md:w-60 w-48"
						/>
					</div>
					<CardContainer className="bg-muted p-3">
						<CardBody className="w-fit h-fit">
							<Image
								src="/gemeos-barbers.jpeg"
								alt="About"
								width={1920}
								height={1080}
								quality={100}
								className="lg:w-72 md:w-72 w-64"
							/>
						</CardBody>
					</CardContainer>
				</Animation>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 place-items-center">
				{itemsAbout.map((item, idx) => (
					<BlurFade key={item.title} delay={0.5 + idx * 0.05} inView>
						<CardAbout title={item.title} description={item.description} />
					</BlurFade>
				))}
			</div>
		</div>
	);
}
