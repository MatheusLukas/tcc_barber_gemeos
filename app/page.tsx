import { About } from "@/components/about";
import { CallToAction } from "@/components/call-to-action";
import { CommentsAndGallery } from "@/components/comments-and-gallery";
import { HomeHero } from "@/components/home-hero";
import { Navbar } from "@/components/navbar";
import { OurBarbers } from "@/components/our-barbers";
import { OurServices } from "@/components/our-services";

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
