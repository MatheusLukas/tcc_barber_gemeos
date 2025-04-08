import { Animation } from "@/src/components/animation";
import { CardBody, CardContainer, CardItem } from "@/src/components/ui/3d-card";

const infos = [
	{
		service: 20,
	},
	{
		service: 30,
	},
	{
		service: 40,
	},
	{
		service: 50,
	},
	{
		service: 60,
	},
];

const textsCards = [
	{
		id: 1,
		label: "Agendados",
	},
	{
		id: 2,
		label: "Cancelados",
	},
	{
		id: 3,
		label: "Em atendimento",
	},
	{
		id: 4,
		label: "Finalizados",
	},
	{
		id: 5,
		label: "Média por dia",
	},
];

export function ShowInfosBarber() {
	return (
		<>
			{textsCards.map((text, idx) => (
				<Animation delay={0.3 + idx * 0.1} direction="down" key={text.id}>
					<CardContainer className="bg-muted w-full p-6 rounded-md">
						<CardBody className="w-full h-16 grid grid-rows-[5fr_5fr_2fr]">
							<CardItem translateZ="100" className="flex flex-col w-full">
								<p className="text-muted-foreground">{text.label}</p>
								<p className="text-2xl font-bold">
									{infos[idx].service}
									<span className="text-lg font-normal"> Hoje</span>
								</p>
							</CardItem>
						</CardBody>
					</CardContainer>
				</Animation>
			))}
		</>
	);
}
