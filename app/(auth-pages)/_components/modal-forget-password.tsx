import { userExist } from "@/app/server/userExist";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { forgetPassword } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "./input";
import { Label } from "./label";

const schemaResetPassword = z.object({
	email: z.string().email("Email inválido"),
});

type schemaResetPasswordType = z.infer<typeof schemaResetPassword>;

export function DialogForgetPassword() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<schemaResetPasswordType>({
		resolver: zodResolver(schemaResetPassword),
	});

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		return handleSubmit(async (data) => {
			const userExisting = await userExist(data.email);

			console.log(userExisting, "userExisting");

			if (userExisting.length === 0)
				return toast.error("Usuário não encontrado");

			console.log(data.email, "hi");
			const forgetPromise = new Promise((resolve, reject) => {
				try {
					forgetPassword(
						{
							email: data.email,
							redirectTo: "/reset-password",
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
					);
				} catch (error) {
					console.log("Error2", error);
					reject(error);
				}
			});

			toast.promise(forgetPromise, {
				loading: "Verificando email...",
				success: "Cheque seu email!",
				error: "Erro ao verificar email!",
			});
		})(event);
	};

	const formId = useId();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="link">Esqueceu a senha?</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Esqueceu a senha?</DialogTitle>
					<DialogDescription>
						Coloque seu email e enviaremos um link para você redefinir sua
						senha!
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} id={formId}>
					<div className="space-y-2 py-4">
						<Label htmlFor="email" className="text-right">
							Email
						</Label>
						<Input
							{...register("email")}
							type="email"
							id="email"
							placeholder="email@gmail.com"
							className="w-full"
						/>
						{errors.email && (
							<p className="text-red-500 text-sm  animate-fade">
								{errors.email.message}
							</p>
						)}
					</div>
				</form>
				<DialogFooter>
					<Button form={formId} type="submit">
						Enviar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
