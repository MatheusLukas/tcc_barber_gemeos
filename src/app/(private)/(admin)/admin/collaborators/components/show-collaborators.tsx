import { Animation } from "@/src/components/animation";
import { CardBody, CardContainer, CardItem } from "@/src/components/ui/3d-card";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Pen, Trash } from "lucide-react";

const collaborators = [
	{
		name: "João Carlos",
		avatar: "https://github.com/shadcn.png",
		service: 20,
		early: 198.29,
		created_at: "2021-10-10",
		role: "Barbeiro",
	},
	{
		name: "Maria Eduarda",
		avatar: "https://github.com/shadcn.png",
		service: 20,
		early: 198.29,
		created_at: "2021-10-10",
		role: "Barbeiro",
	},
	{
		name: "José Netto",
		avatar: "https://github.com/shadcn.png",
		service: 20,
		early: 198.29,
		created_at: "2021-10-10",
		role: "Barbeiro",
	},
	{
		name: "Ana Beatriz",
		avatar: "https://github.com/shadcn.png",
		service: 20,
		early: 198.29,
		created_at: "2021-10-10",
		role: "Barbeiro",
	},
	{
		name: "Teste De nome grande ate demais",
		avatar: "https://github.com/shadcn.png",
		service: 20,
		early: 198.29,
		created_at: "2021-10-10",
		role: "Barbeiro",
	},
];

export function ShowCollaborators() {
	return (
		<>
			{collaborators.map((collaborator, idx) => (
				<Animation
					delay={0.3 + idx * 0.1}
					direction="down"
					key={collaborator.name}
					once
				>
					<CardContainer className="bg-muted w-full p-6 rounded-md">
						<CardBody className="w-full h-64 grid grid-rows-[5fr_5fr_2fr]">
							<CardItem
								translateZ="100"
								className="flex flex-col items-center justify-center w-full"
							>
								<Avatar>
									<AvatarFallback>{collaborator.name}</AvatarFallback>
									<AvatarImage src={collaborator.avatar} />
								</Avatar>
								<p className="font-semibold text-lg text-center">
									{collaborator.name}
								</p>
								<p className="text-sm text-muted-foreground text-center">
									{collaborator.role}
								</p>
							</CardItem>
							<CardItem
								translateZ="100"
								className="*:flex *:justify-between *:items-center w-full flex flex-col justify-center"
							>
								<div className="*:text-sm">
									<p>Atendimentos:</p>
									<span>{collaborator.service}</span>
								</div>
								<div className="*:text-sm">
									<p>Ganhos:</p>
									<span className="text-green-500">{collaborator.early}</span>
								</div>
								<div className="*:text-sm">
									<p>Admissão:</p>
									<span>{collaborator.created_at}</span>
								</div>
							</CardItem>
							<CardItem translateZ="50" className="place-self-end space-x-4">
								<Button variant="destructive">
									<Trash />
								</Button>
								<Button>
									<Pen />
								</Button>
							</CardItem>
						</CardBody>
					</CardContainer>
				</Animation>
			))}
		</>
	);
}
