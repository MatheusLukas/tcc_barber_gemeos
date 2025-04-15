"use client";
import { Button } from "@/src/components/ui/button";
import { TypewriterEffectSmooth } from "@/src/components/ui/typewriter-effect";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "@/src/lib/auth-client";
import { userExist } from "@/src/server/userExist";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ButtonGoogleLogin } from "./button-google-login";
import { Input } from "./input";
import { Label } from "./label";
import { DialogForgetPassword } from "./modal-forget-password";

const schemaLogin = z.object({
	email: z.string().email("Email inválido"),
	password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type schemaLoginType = z.infer<typeof schemaLogin>;

export function FormSignIn() {
	const router = useRouter();
	const formId = useId();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<schemaLoginType>({
		resolver: zodResolver(schemaLogin),
	});

	const onSubmit = async (data: schemaLoginType) => {
		setIsLoading(true);
		const [userExisting, barberExisting] = await userExist({
			email: data.email,
		});

		if (!userExisting && !barberExisting) {
			toast.error("Usuário não encontrado");
			return;
		}

		const signInPromise = new Promise((resolve, reject) => {
			try {
				signIn
					.email(
						{
							email: data.email,
							password: data.password,
						},
						{
							onRequest: () => {
								console.log("Requesting...");
							},
							onSuccess: (data) => {
								console.log("Success", data);
								resolve(data);
								router.push("/");
							},
							onError: (error) => {
								console.log("Error", error);
								reject(error.error);
							},
						},
					)
					.catch(reject);
			} catch (error) {
				reject(error);
			}
		});

		toast.promise(signInPromise, {
			loading: "Logando...",
			success: "Usuário logado com sucesso",
			error: (error) => {
				return JSON.stringify(error.status) === "403"
					? "Email não verificado, cheque seu email!"
					: "Erro ao logar usuário ";
			},
		});
		setIsLoading(true);
	};

	const words = [
		{
			text: "Seja",
		},
		{
			text: "bem",
		},
		{
			text: "vindo",
		},
	];

	return (
		<div className="flex flex-col justify-center container items-center animate-fade-left h-fit md:h-screen py-10 md:py-0 overflow-hidden">
			<Image src="/logo.svg" alt="Logo" width={200} height={200} />
			<div className="flex flex-col gap-2 items-center">
				<TypewriterEffectSmooth words={words} />
				<p className="text-muted-text text-center">
					Faça o login para ter acesso a nosso agendamento.
				</p>
			</div>

			<form
				className="w-full flex flex-col gap-4 max-w-sm"
				onSubmit={handleSubmit(onSubmit)}
				id={formId}
			>
				<div className="flex flex-col gap-6 mt-4">
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="Ex: email@gmai.com"
							{...register("email")}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm">{errors.email.message}</p>
						)}
					</div>
					<div>
						<Label htmlFor="password">Senha</Label>
						<Input
							id="password"
							type="password"
							placeholder="********"
							{...register("password")}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm">{errors.password.message}</p>
						)}
					</div>
				</div>
				<div className="self-end">
					<DialogForgetPassword />
				</div>
				<Button
					disabled={isLoading}
					form={formId}
					className="py-5"
					type="submit"
				>
					Log In
				</Button>
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<hr className="w-full bg-muted-text h-0.5" />
						<p className="whitespace-nowrap text-muted-text">ou continue com</p>
						<hr className="w-full bg-muted-text h-0.5" />
					</div>
					<div className="w-full bg-muted rounded-md hover:cursor-not-allowed select-none">
						<ButtonGoogleLogin />
					</div>
				</div>
				<div className="flex items-center justify-center gap-1">
					<p>Não é cadastrado?</p>
					<Link href="/register" className="text-primary hover:underline">
						Crie uma conta
					</Link>
				</div>
			</form>
		</div>
	);
}
