import { Animation } from "@/src/components/animation";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/src/components/ui/avatar";
import { formatNumberToCurrency } from "@/src/utils/formatNumberToCurrency";

type Props = {
	name: string;
	image: string;
	appointments: number;
	earnings: number;
	color?: string;
};

export function CardExposedCollaborator({
	name,
	image,
	appointments,
	earnings,
	color = "var(--color-chart-1, hsl(var(--chart-1)))",
}: Props) {
	return (
		<Animation
			className="w-full border shadow rounded-lg p-4 flex justify-between"
			direction="down"
			once
			delay={0.7}
			margin="0px"
		>
			<div className="flex gap-4 items-center">
				<div
					className="size-2 rounded-full"
					style={{ backgroundColor: color }}
				/>
				<Avatar>
					<AvatarImage src={image} />
					<AvatarFallback>{name}</AvatarFallback>
				</Avatar>
				<p>{name}</p>
			</div>
			<div className="*:text-xs flex flex-col justify-center">
				<p>{appointments} Atendimentos</p>
				<p className="text-green-500">{formatNumberToCurrency(earnings)}</p>
			</div>
		</Animation>
	);
}
