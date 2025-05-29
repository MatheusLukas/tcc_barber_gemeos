import { Animation } from "@/src/components/animation";
import { CardBody, CardContainer, CardItem } from "@/src/components/ui/3d-card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { getScheduleData } from "@/src/server/admin/scheduleData";
import { useQuery } from "@tanstack/react-query";

const textsCards = [
	{
		id: 1,
		label: "Agendados hoje",
		queryKey: "scheduledToday",
	},
	{
		id: 2,
		label: "Cancelados hoje",
		queryKey: "canceledToday",
	},
	{
		id: 3,
		label: "Pendentes de confirmação",
		queryKey: "pendingAppointments",
	},
	{
		id: 4,
		label: "Finalizados hoje",
		queryKey: "completedToday",
	},
	{
		id: 5,
		label: "Ganhos hoje",
		queryKey: "earningsToday",
	},
];

export function ShowInfosBarber() {
	const { data, isLoading } = useQuery({
		queryKey: ["scheduleData"],
		queryFn: async () => {
			const [data, _] = await getScheduleData();
			return data;
		},
	});

	if (isLoading) {
		return <SkeletonCards />;
	}

	return (
		<>
			{textsCards?.map((text, idx) => (
				<Animation delay={0.3 + idx * 0.1} direction="down" key={text.id}>
					<CardContainer className="bg-muted w-full p-6 rounded-md">
						<CardBody className="w-full h-16 grid grid-rows-[5fr_5fr_2fr]">
							<CardItem translateZ="100" className="flex flex-col w-full">
								<p className="text-muted-foreground">{text.label}</p>
								<p className="text-2xl font-bold">
									{data?.[text.queryKey as keyof typeof data]}
								</p>
							</CardItem>
						</CardBody>
					</CardContainer>
				</Animation>
			))}
		</>
	);
}

function SkeletonCards() {
	return (
		<>
			{Array.from({ length: 5 }).map((_, idx) => (
				<div key={idx} className="bg-muted w-full p-6 rounded-md">
					<div className="w-full h-16 grid grid-rows-[5fr_5fr_2fr]">
						<div className="flex flex-col w-full">
							<Skeleton className="h-4 w-32 mb-2" />
							<Skeleton className="h-8 w-20" />
						</div>
					</div>
				</div>
			))}
		</>
	);
}
