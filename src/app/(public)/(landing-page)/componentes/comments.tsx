import Marquee from "@/src/components/ui/marquee";
import Image from "next/image";
import { RatingStar } from "./rating-stars";

const comments = [
	{
		image: "/barbeiro.jpg",
		name: "Daniel",
		description:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
		stars: 5,
	},
	{
		image: "/barbeiro.jpg",
		name: "Fellipe",
		description:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
		stars: 3.5,
	},
	{
		image: "/barbeiro.jpg",
		name: "Gabriel",
		description:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
		stars: 3,
	},
	{
		image: "/barbeiro.jpg",
		name: "Richard",
		description:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
		stars: 4,
	},
	{
		image: "/barbeiro.jpg",
		name: "Maionese",
		description:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
		stars: 4,
	},
	{
		image: "/barbeiro.jpg",
		name: "Egidio",
		description:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
		stars: 4,
	},
	{
		image: "/barbeiro.jpg",
		name: "Kriguer",
		description:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
		stars: 4,
	},
];

export function Comments() {
	return (
		<Marquee
			className="[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
			pauseOnHover
			vertical
		>
			{comments.map((comment) => (
				<div
					key={comment.name}
					className="w-full h-44 bg-muted rounded-lg p-4 flex flex-col gap-4 "
				>
					<div className="flex gap-4">
						<Image
							src={comment.image}
							alt={comment.name}
							width={1920}
							height={1080}
							className="size-12 rounded-full"
						/>
						<div className=" flex flex-col  justify-center ">
							<p className="font-medium">{comment.name}</p>
							<RatingStar rating={comment.stars} />
						</div>
					</div>
					<p className="text-sm">{comment.description}</p>
				</div>
			))}
		</Marquee>
	);
}
