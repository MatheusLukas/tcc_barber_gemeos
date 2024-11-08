"use client";
import { Button } from "@/components/ui/button";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

import { signIn } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";

import { userExist } from "@/app/server/userExist";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "./input";
import { Label } from "./label";

const schemaLogin = z.object({
	email: z.string().email("Email inválido"),
	password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type schemaLoginType = z.infer<typeof schemaLogin>;

export function FormSignIn() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<schemaLoginType>({
		resolver: zodResolver(schemaLogin),
	});

	const onSubmit = async (data: schemaLoginType) => {
		const userExisting = await userExist(data.email);

		if (userExisting.length === 0) {
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
							},
							onError: (error) => {
								console.log("Error", error);
								reject(error);
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
			error: "Erro ao logar usuário",
		});
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
		<div className="flex flex-col justify-center mx-auto items-center animate-fade-left min-w-96">
			<Image src="/logo.svg" alt="Logo" width={200} height={200} />
			<div className="space-y-2">
				<TypewriterEffect words={words} />
				<p className="text-muted-text text-center">
					Faça o login para ter acesso a nosso agendamento.
				</p>
			</div>

			<form
				className="w-full flex flex-col gap-4"
				onSubmit={handleSubmit(onSubmit)}
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
					<Link
						className="text-primary hover:underline text-sm"
						href="/forgot-password"
					>
						Esqueceu a Senha?
					</Link>
				</div>
				<Button className="py-5" type="submit">
					Log In
				</Button>
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<hr className="w-full bg-muted-text h-0.5" />
						<p className="whitespace-nowrap text-muted-text">ou continue com</p>
						<hr className="w-full bg-muted-text h-0.5" />
					</div>
					<div className="w-full py-2 bg-muted rounded-md hover:cursor-not-allowed select-none">
						<p className="text-center">COMING SOON...</p>
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
