import Marquee from "@/src/components/ui/marquee";
import Image from "next/image";

export function Gallery() {
	return (
		<div className="bg-muted w-full h-full grid grid-rows-3 py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
			<Marquee pauseOnHover>
				<Image
					src="/hair/barbeiro1.jpeg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32 object-cover"
				/>
				<Image
					src="/hair/barbeiro2.jpeg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32 object-cover"
				/>
				<Image
					src="/hair/barbeiro3.jpeg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32 object-cover"
				/>
				<Image
					src="/hair/barbeiro4.jpeg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32 object-cover"
				/>
			</Marquee>

			<Marquee reverse pauseOnHover>
				<Image
					src="/hair/barbeiro5.jpeg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32 object-cover"
				/>
				<Image
					src="/hair/barbeiro6.jpeg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32 object-cover"
				/>
				<Image
					src="/hair/barbeiro7.jpeg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32 object-cover"
				/>
				<Image
					src="/hair/barbeiro8.jpeg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32 object-cover"
				/>
			</Marquee>

			<Marquee pauseOnHover>
				<Image
					src="/hair/barbeiro10.jpeg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32 object-cover"
				/>
				<Image
					src="/hair/barbeiro11.jpeg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32 object-cover"
				/>
				<Image
					src="/hair/barbeiro12.jpeg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32 object-cover"
				/>
				<Image
					src="/hair/barbeiro1.jpeg"
					alt="Barbeiro"
					width={1920}
					height={1080}
					className="xl:size-44 size-32 object-cover"
				/>
			</Marquee>
		</div>
	);
}
