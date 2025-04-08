import { Navbar } from "@/src/components/navbar";
import { About } from "./componentes/about";
import { CallToAction } from "./componentes/call-to-action";
import { CommentsAndGallery } from "./componentes/comments-and-gallery";
import { HomeHero } from "./componentes/home-hero";
import { OurBarbers } from "./componentes/our-barbers";
import { OurServices } from "./componentes/our-services";

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
