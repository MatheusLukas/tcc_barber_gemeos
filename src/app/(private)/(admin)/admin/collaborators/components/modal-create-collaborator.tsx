import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { ROLES } from "@/src/enum/roles";
import { queryClient } from "@/src/lib/query-client";
import { cn } from "@/src/lib/utils";
import { createCollaborator } from "@/src/server/admin/createCollaborator";
import { getCollaboratorById } from "@/src/server/admin/getCollaboratorById";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AddImage } from "./add-image";
import { SelectRole } from "./select-role";

const schemaCollaborator = z.object({
	name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
	email: z.string().email("Email inválido"),
	role: z.nativeEnum(ROLES),
	avatar: z.instanceof(File),
	password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

export type schemaCollaboratorType = z.infer<typeof schemaCollaborator>;

export function ModalCreateCollaborator() {
	const [isOpen, setIsOpen] = useState(false);

	const searchParams = useSearchParams();
	const collaboratorId = searchParams.get("collaboratorId") ?? "";

	useEffect(() => {
		if (collaboratorId) {
			setIsOpen(true);
		}
	}, [collaboratorId]);

	const { data: barber } = useQuery({
		queryKey: ["getBarber", collaboratorId],
		queryFn: async () => {
			const [data, _] = await getCollaboratorById({
				collaboratorId: collaboratorId,
			});
			return data;
		},
		enabled: !!collaboratorId,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
		watch,
		setValue,
	} = useForm<schemaCollaboratorType>({
		resolver: zodResolver(schemaCollaborator),
	});

	useEffect(() => {
		if (!barber) return;
		setValue("name", barber.name);
		fetch(barber.image)
			.then((response) => response.blob())
			.then((blob) => {
				const file = new File([blob], "avatar.png", { type: blob.type });
				setValue("avatar", file);
			});
		setValue("email", barber.email);
		setValue("role", barber.role);
		setValue("password", barber.password!);
	}, [barber]);

	const { mutateAsync, isLoading } = useMutation({
		mutationKey: ["create-collaborator"],
		mutationFn: async (data: schemaCollaboratorType) => {
			const [response, err] = await createCollaborator({
				id: collaboratorId,
				name: data.name,
				email: data.email,
				role: data.role,
				file: data.avatar,
				password: data.password,
			});

			if (err) {
				toast.error(err.data);
			} else {
				toast.success(
					`Colaborador ${collaboratorId ? "atualizado" : "criado"} com sucesso`,
				);
				reset();
				setIsOpen(false);
				queryClient.invalidateQueries(["getBarberInfo"]);
			}
		},
		onSuccess: () => {
			if (collaboratorId) {
				const newUrl = new URL(window.location.href);
				newUrl.searchParams.delete("collaboratorId");
				window.history.pushState({}, "", newUrl.toString());
			}
			reset();
		},
	});

	const formId = useId();

	const avatar = watch("avatar");

	const onSubmit = (data: schemaCollaboratorType) => {
		toast.promise(mutateAsync(data), {
			loading: `${collaboratorId ? "Atualizando" : "Criando"} colaborador...`,
		});
	};

	return (
		<Dialog open={isOpen}>
			<DialogTrigger asChild>
				<Button onClick={() => setIsOpen(true)}>
					<Plus />
					Criar perfil
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Criar Colaborador</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo para criar um novo colaborador.
					</DialogDescription>
				</DialogHeader>
				<DialogClose
					onClick={() => setIsOpen(false)}
					className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
				>
					<X className="h-4 w-4" />
					<span className="sr-only">Close</span>
				</DialogClose>
				<form
					id={formId}
					onSubmit={handleSubmit(onSubmit)}
					className="mt-6 space-y-2"
				>
					<div className="flex flex-col items-center justify-center gap-2 relative group">
						{avatar ? (
							<Image
								src={URL.createObjectURL(avatar)}
								alt="Logo"
								width={100}
								height={100}
								className="size-20 object-cover rounded-full"
							/>
						) : (
							<Avatar className="size-20">
								<AvatarImage
									src="https://github.com/shadcn.png"
									alt="@shadcn"
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						)}
						<Controller
							control={control}
							render={({ field }) => (
								<AddImage className="size-20" field={field} />
							)}
							name="avatar"
						/>
					</div>
					<div className="space-y-2">
						<Label>Nome</Label>
						<Input
							className={cn(errors.name && "border-destructive")}
							{...register("name")}
						/>
						{errors.name && (
							<span className="text-destructive text-sm">
								{errors.name.message}
							</span>
						)}
					</div>
					{!barber && (
						<div className="space-y-2">
							<Label>Email</Label>
							<Input
								className={cn(errors.email && "border-destructive")}
								{...register("email")}
							/>
							{errors.email && (
								<span className="text-destructive text-sm">
									{errors.email.message}
								</span>
							)}
						</div>
					)}
					{!barber && (
						<div className="space-y-2">
							<Label>Senha</Label>
							<Input
								className={cn(errors.password && "border-destructive")}
								{...register("password")}
							/>
							{errors.password && (
								<span className="text-destructive text-sm">
									{errors.password.message}
								</span>
							)}
						</div>
					)}
					<div className="space-y-2">
						<Label className={cn(errors.role && "border-destructive")}>
							Cargo
						</Label>
						<Controller
							control={control}
							render={({ field }) => <SelectRole field={field} />}
							name="role"
						/>
						{errors.role && (
							<span className="text-destructive text-sm">
								{errors.role.message}
							</span>
						)}
					</div>
					{errors.avatar && (
						<span className="text-destructive text-sm">Envie uma imagem</span>
					)}
				</form>
				<DialogFooter>
					<Button disabled={isLoading} form={formId} type="submit">
						Criar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
