import { Suspense } from "react";
import { CardResetPassword } from "../components/card-reset-password";

export default function Home() {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<Suspense>
				<CardResetPassword />
			</Suspense>
		</div>
	);
}
