import Image from "next/image";
import { FormSignUp } from "../components/form-signup";
import { Lens } from "../components/lens";

export default function Home() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 md:max-h-screen py-10 md:py-0">
			<div className="md:block hidden">
				<Lens className="rounded-none animate-fade-right">
					<Image
						src="/gemeos-barbers.jpeg"
						alt="About"
						width={1920}
						height={1080}
						quality={100}
						className="w-full h-screen object-cover"
					/>
				</Lens>
			</div>
			<FormSignUp />
		</div>
	);
}
