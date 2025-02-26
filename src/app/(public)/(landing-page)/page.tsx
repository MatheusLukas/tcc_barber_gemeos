import { About } from "@/src/components/about";
import { CallToAction } from "@/src/components/call-to-action";
import { CommentsAndGallery } from "@/src/components/comments-and-gallery";
import { HomeHero } from "@/src/components/home-hero";
import { Navbar } from "@/src/components/navbar";
import { OurBarbers } from "@/src/components/our-barbers";
import { OurServices } from "@/src/components/our-services";

export default function Home() {
	return (
		<>
			<Navbar />
			<HomeHero />
			<About />
			<OurServices />
			<OurBarbers />
			<CommentsAndGallery />
			<CallToAction />
		</>
	);
}
