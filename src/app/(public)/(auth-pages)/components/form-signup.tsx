"use client";
import { Button } from "@/src/components/ui/button";
import { TypewriterEffectSmooth } from "@/src/components/ui/typewriter-effect";

import { signUp } from "@/src/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "./input";
import { Label } from "./label";

const schemaLogin = z.object({
	email: z.string().email("Email inválido"),
	password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
	newPassword: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
	name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
});

type schemaLoginType = z.infer<typeof schemaLogin>;

export function FormSignUp() {
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
		if (data.password !== data.newPassword) {
			toast.error("As senhas não coincidem");
			return;
		}

		const signUpPromise = new Promise((resolve, reject) => {
			setIsLoading(true);
			try {
				signUp
					.email(
						{
							name: data.name,
							email: data.email,
							password: data.password,
							image: undefined,
						},
						{
							onSuccess: (data) => {
								resolve(data);
							},
							onError: (error) => {
								reject(error);
							},
						},
					)
					.catch(reject);
			} catch (error) {
				reject(error);
			}
			setIsLoading(true);
		});

		toast.promise(signUpPromise, {
			loading: "Criando Usúario...",
			success: "Usuário criado com sucesso, cheque seu email!",
			error: "Erro ao criar usuário",
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
		<div className="flex flex-col justify-center container items-center animate-fade-left h-screen py-10 overflow-x-hidden">
			<Image src="/logo.svg" alt="Logo" priority width={200} height={200} />
			<div className="flex flex-col gap-2 items-center">
				<TypewriterEffectSmooth words={words} />
				<p className="text-muted-text text-center">
					Crie uma conta para começar a agendar!
				</p>
			</div>

			<form
				id={formId}
				className="w-full flex flex-col gap-4 max-w-sm"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex flex-col gap-6 mt-4">
					<div>
						<Label htmlFor="name">Nome</Label>
						<Input
							id="name"
							type="name"
							placeholder="Name"
							{...register("name")}
						/>
						{errors.name && (
							<p className="text-red-500 text-sm animate-fade">
								{errors.name.message}
							</p>
						)}
					</div>
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="Ex: email@gmai.com"
							{...register("email")}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm  animate-fade">
								{errors.email.message}
							</p>
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
							<p className="text-red-500 text-sm  animate-fade">
								{errors.password.message}
							</p>
						)}
					</div>
					<div>
						<Label htmlFor="newPassword">Confirmar senha</Label>
						<Input
							id="newPassword"
							type="password"
							placeholder="********"
							{...register("newPassword")}
						/>
						{errors.newPassword && (
							<p className="text-red-500 text-sm  animate-fade">
								{errors.newPassword.message}
							</p>
						)}
					</div>
				</div>
				<Button
					disabled={isLoading}
					form={formId}
					className="py-5"
					type="submit"
				>
					Sign Up
				</Button>
				<div className="flex items-center justify-center gap-1">
					<p>Já tem uma conta?</p>
					<Link href="/login" className="text-primary hover:underline">
						Faça Login
					</Link>
				</div>
			</form>
		</div>
	);
}
