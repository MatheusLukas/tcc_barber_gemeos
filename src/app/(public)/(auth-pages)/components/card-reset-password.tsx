"use client";
import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { resetPassword } from "@/src/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "./input";
import { Label } from "./label";

const schemaResetPassword = z.object({
	password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
	newPassword: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type schemaResetPasswordType = z.infer<typeof schemaResetPassword>;

export function CardResetPassword() {
	const formId = useId();
	const [showPassword, setShowPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const searchParams = useSearchParams();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<schemaResetPasswordType>({
		resolver: zodResolver(schemaResetPassword),
	});

	const onSubmit = async (data: schemaResetPasswordType) => {
		const token = searchParams.get("token");
		if (!token) {
			toast.error("Token inválido");
			return;
		}

		if (data.password !== data.newPassword) {
			toast.error("As senhas não coincidem");
			return;
		}

		const resetPasswordPromise = new Promise((resolve, reject) => {
			try {
				resetPassword(
					{
						newPassword: data.password,
						token,
					},
					{
						onSuccess: (data) => {
							resolve(data);
							router.push("/login");
						},
						onError: (error) => {
							reject(error.error);
						},
					},
				);
			} catch (error) {
				reject(error);
			}
		});

		toast.promise(resetPasswordPromise, {
			loading: "Carregando...",
			success: "Senha alterada com sucesso!",
			error: "Erro ao alterar senha! ",
		});
	};

	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Redefinir Senha</CardTitle>
				<CardDescription>
					Redefina sua senha para efetuar login!
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form id={formId} onSubmit={handleSubmit(onSubmit)}>
					<div className="grid w-full items-center gap-4">
						<div className="space-y-1.5">
							<Label>Nova senha</Label>
							<div className="relative">
								<Input
									{...register("password")}
									placeholder="******"
									type={showPassword ? "text" : "password"}
								/>
								<Button
									variant="ghost"
									className="absolute inset-y-0 right-0 flex items-center pr-3 h-full rounded-l-none p-2 hover:bg-transparent"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setShowPassword((prev) => !prev);
									}}
								>
									{showPassword ? (
										<Eye className="animate-wiggle" />
									) : (
										<EyeOff className="animate-wiggle" />
									)}
								</Button>
							</div>
							{errors.password && (
								<p className="text-red-500 text-sm animate-fade-left">
									{errors.password.message}
								</p>
							)}
						</div>
						<div className="space-y-1.5">
							<Label>Confirmar nova senha</Label>
							<div className="relative">
								<Input
									{...register("newPassword")}
									placeholder="******"
									type={showNewPassword ? "text" : "password"}
								/>
								<Button
									variant="ghost"
									className="absolute inset-y-0 right-0 flex items-center pr-3 h-full rounded-l-none p-2 hover:bg-transparent"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setShowNewPassword((prev) => !prev);
									}}
								>
									{showNewPassword ? (
										<Eye className="animate-wiggle" />
									) : (
										<EyeOff className="animate-wiggle" />
									)}
								</Button>
							</div>
							{errors.newPassword && (
								<p className="text-red-500 text-sm animate-fade-left">
									{errors.newPassword.message}
								</p>
							)}
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter>
				<Button className="w-full" form={formId}>
					Confirmar
				</Button>
			</CardFooter>
		</Card>
	);
}
