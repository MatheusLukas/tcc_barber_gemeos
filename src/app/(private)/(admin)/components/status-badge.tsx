import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/lib/utils";

export type StatusType =
	| "Em andamento"
	| "Em atendimento"
	| "Cancelado"
	| "Falta"
	| "Agendado"
	| "Aguardando Cliente"
	| "Atrasado";

type MappedStatusType = "in_progress" | "canceled" | "scheduled" | "delayed";

interface StatusBadgeProps {
	status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
	const statusMapping: Record<StatusType, MappedStatusType> = {
		"Em andamento": "in_progress",
		"Em atendimento": "in_progress",
		Falta: "canceled",
		Cancelado: "canceled",
		"Aguardando Cliente": "scheduled",
		Agendado: "scheduled",
		Atrasado: "delayed",
	};

	const statusStyles: Record<MappedStatusType, string> = {
		in_progress:
			"bg-blue-100 hover:bg-blue-100 text-blue-800 border-transparent",
		canceled: "bg-red-100 hover:bg-red-100 text-red-800 border-transparent",
		scheduled:
			"bg-green-100 hover:bg-green-100 text-green-800 border-transparent",
		delayed:
			"bg-orange-100 hover:bg-orange-100 text-orange-800 border-transparent",
	};

	const mappedStatus = statusMapping[status];

	return (
		<Badge
			variant="outline"
			className={cn("rounded-md font-medium", statusStyles[mappedStatus])}
		>
			{status}
		</Badge>
	);
}
