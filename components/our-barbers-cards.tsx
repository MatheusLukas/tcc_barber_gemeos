import Image from "next/image";

export function OurBarbersCard({
	photo,
	barber,
	role,
	icon: IconComponent,
}: any) {
	return (
		<div className="w-72 flex justify-center flex-col gap-2">
			<Image
				className="w-full h-full object-cover"
				src={photo}
				alt={`${barber} photo`}
				width={280}
				height={310}
				quality={100}
			/>
			<div className="flex justify-between">
				<div>
					<p className="text-lg font-bold">{barber}</p>
					<p className="text-muted-foreground">{role}</p>
				</div>
				<div>
					<IconComponent className="text-muted-foreground" />
				</div>
			</div>
		</div>
	);
}
