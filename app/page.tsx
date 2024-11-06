import { About } from "@/components/about";
import { HomeHero } from "@/components/home-hero";
import { Navbar } from "@/components/navbar";

export default function Home() {
	return (
		<>
			<Navbar />
			<HomeHero />
			<About />
		</>
	);
}
