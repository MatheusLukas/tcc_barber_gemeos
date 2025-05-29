import { Animation } from "@/src/components/animation";
import Image from "next/image";

export function OurBarbersCard({
	photo,
	barber,
	jobTitle,
	icon: IconComponent,
	idx: number,
}: any) {
	return (
		<Animation
			once
			direction="down"
			delay={0.3 + number * 0.1}
			className="w-72 flex justify-center flex-col gap-2"
		>
			<Image
				className="w-full h-60 object-cover"
				src={photo}
				alt={`${barber} photo`}
				width={1920}
				height={1080}
				quality={100}
			/>
			<div className="flex justify-between">
				<div>
					<p className="text-lg font-bold">{barber}</p>
					<p className="text-muted-foreground">{jobTitle}</p>
				</div>
				<div>
					<IconComponent className="text-muted-foreground" />
				</div>
			</div>
		</Animation>
	);
}
