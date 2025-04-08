import Marquee from "@/src/components/ui/marquee";
import Image from "next/image";

export function Gallery() {
	return (
		<div className="bg-muted w-full h-full grid grid-rows-3 py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
			<Marquee pauseOnHover>
				<Image
					src="/barbeiro.jpg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32"
				/>
				<Image
					src="/barbeiro.jpg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32"
				/>
				<Image
					src="/barbeiro.jpg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32"
				/>
				<Image
					src="/barbeiro.jpg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32"
				/>
			</Marquee>

			<Marquee reverse pauseOnHover>
				<Image
					src="/barbeiro.jpg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32"
				/>
				<Image
					src="/barbeiro.jpg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32"
				/>
				<Image
					src="/barbeiro.jpg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32"
				/>
				<Image
					src="/barbeiro.jpg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32"
				/>
			</Marquee>

			<Marquee pauseOnHover>
				<Image
					src="/barbeiro.jpg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32"
				/>
				<Image
					src="/barbeiro.jpg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32"
				/>
				<Image
					src="/barbeiro.jpg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32"
				/>
				<Image
					src="/barbeiro.jpg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32"
				/>
			</Marquee>
		</div>
	);
}
