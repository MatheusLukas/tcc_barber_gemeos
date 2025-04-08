"use client";
import { signOut } from "@/src/lib/auth-client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LogoutPage() {
	const router = useRouter();
	const logoutHandle = async () => {
		try {
			await signOut({
				fetchOptions: {
					onSuccess: () => {
						router.push("/");
					},
				},
			});
		} catch (e) {
			toast.error(`Erro ao fazer logout! ${e}`);
		}
	};

	useEffect(() => {
		logoutHandle();
	}, []);

	return (
		<div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
			<div className="text-center space-y-6">
				<Image
					src="/logo.svg"
					alt="Logo"
					width={80}
					height={80}
					className="mx-auto rounded-md"
				/>
				<h1 className="text-2xl font-bold">Fazendo Logout</h1>
				<Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
				<p className="text-muted-foreground">
					Por favor, aguarde enquanto finalizamos sua sessão...
				</p>
			</div>
		</div>
	);
}
