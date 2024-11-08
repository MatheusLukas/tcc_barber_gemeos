import Image from "next/image";
import { FormSignUp } from "../login/_components/form-signup";
import { Lens } from "../login/_components/lens";

export default function Home() {
	return (
		<div className="grid grid-cols-2">
			<div>
				<Lens className="rounded-none animate-fade-right">
					<Image
						src="/gemeos-barbers.jpeg"
						alt="About"
						width={1920}
						height={1080}
						quality={100}
						className="w-full max-h-screen object-cover"
					/>
				</Lens>
			</div>
			<FormSignUp />
		</div>
	);
}
