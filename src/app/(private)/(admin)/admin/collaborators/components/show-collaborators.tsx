import { Animation } from "@/src/components/animation";
import { CardBody, CardContainer, CardItem } from "@/src/components/ui/3d-card";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/src/components/ui/avatar";
import { Skeleton } from "@/src/components/ui/skeleton";
import { getAllBarbersFormatteds } from "@/src/server/admin/getAllBarbersFormatteds";
import { useQuery } from "@tanstack/react-query";
import { EditCollaborators } from "./edit-collaborator";

export function ShowCollaborators() {
	const { data, isLoading } = useQuery({
		queryKey: ["getBarberInfo"],
		queryFn: async () => {
			const [data, _] = await getAllBarbersFormatteds();
			console.log(data);
			return data;
		},
	});

	const roles = {
		user: "Usuário",
		admin: "Administrador",
		collaborator: "Colaborador",
	};

	return (
		<>
			{isLoading ? (
				<>
					<SkeletonCard />
					<SkeletonCard />
					<SkeletonCard />
					<SkeletonCard />
					<SkeletonCard />
				</>
			) : (
				data?.map((collaborator, idx) => (
					<Animation
						delay={0.3 + idx * 0.1}
						direction="down"
						key={collaborator.id}
						once
					>
						<CardContainer className="bg-muted w-60 p-6 rounded-md">
							<CardBody className="w-full h-64 grid grid-rows-[5fr_5fr_2fr]">
								<CardItem
									translateZ="100"
									className="flex flex-col items-center justify-center w-full"
								>
									<Avatar>
										<AvatarFallback>{collaborator.name}</AvatarFallback>
										<AvatarImage src={collaborator.image} />
									</Avatar>
									<p className="font-semibold text-lg text-center">
										{collaborator.name}
									</p>
									<p className="text-sm text-muted-foreground text-center">
										{roles[collaborator.role]}
									</p>
								</CardItem>
								<CardItem
									translateZ="100"
									className="*:flex *:justify-between *:items-center w-full flex flex-col justify-center"
								>
									<div className="*:text-sm">
										<p>Atendimentos:</p>
										<span>{collaborator.confirmedCount}</span>
									</div>
									<div className="*:text-sm">
										<p>Ganhos:</p>
										<span className="text-green-500">
											{collaborator.totalPrice}
										</span>
									</div>
									<div className="*:text-sm">
										<p>Role:</p>
										<span>{roles[collaborator.role]}</span>
									</div>
								</CardItem>
								<CardItem translateZ="50" className="place-self-end space-x-4">
									<EditCollaborators collaboratorId={collaborator.id} />
								</CardItem>
							</CardBody>
						</CardContainer>
					</Animation>
				))
			)}
		</>
	);
}

function SkeletonCard() {
	return (
		<div className="h-[304px] w-[250px] flex flex-col justify-between bg-muted p-6 rounded-md">
			<div className="flex flex-col items-center justify-center gap-2">
				<Skeleton className="rounded-full size-10" />
				<Skeleton className="w-16 h-5" />
				<Skeleton className="w-20 h-5" />
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex justify-between">
					<Skeleton className="w-36 h-5" />
					<Skeleton className="w-9 h-5" />
				</div>
				<div className="flex justify-between">
					<Skeleton className="w-24 h-5" />
					<Skeleton className="w-9 h-5" />
				</div>
				<div className="flex justify-between">
					<Skeleton className="w-16 h-5" />
					<Skeleton className="w-9 h-5" />
				</div>
			</div>
			<div className="flex gap-4 justify-end">
				<Skeleton className="h-9 w-12 rounded-md" />
				<Skeleton className="h-9 w-12 rounded-md" />
			</div>
		</div>
	);
}
