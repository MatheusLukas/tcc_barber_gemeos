"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { phoneNumber, useSession } from "@/src/lib/auth-client";
import { queryClient } from "@/src/lib/query-client";
import { cn } from "@/src/lib/utils";
import { getUser } from "@/src/server/getUser";
import { updateUserComunication } from "@/src/server/updateUserComunication";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import * as motion from "framer-motion/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AlertPhoneNotVerified } from "./alert-phone-not-verified";
import { EditButton } from "./editButton";
import { ImageSkeleton } from "./image-skeleton";
import { ModalConfirmPhoneOtp } from "./modal-confirm-phone-otp";

const schemaInformations = z.object({
	name: z.string(),
	email: z.string().email("Email inválido"),
	phone: z.string().optional(),
});

type schemaInformationsType = z.infer<typeof schemaInformations>;

export function Account() {
	const [open, setOpen] = useState(false);
	const [phoneNumberUser, setPhoneNumberUser] = useState("");
	const { data } = useSession();
	const { data: user, isLoading } = useQuery({
		queryKey: ["getUser", data?.user.id],
		queryFn: () => getUser(data?.user.id),
		enabled: !!data?.user.id,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<schemaInformationsType>({
		resolver: zodResolver(schemaInformations),
	});

	useEffect(() => {
		reset({
			name: user?.name,
			email: user?.email,
			phone: user?.phoneNumber ?? undefined,
		});
	}, [user]);

	const userId = data?.user.id;
	if (!userId) return null;

	const onSubmit = async (data: schemaInformationsType) => {
		const updatePromise = updateUserComunication({
			name: data.name,
			email: data.email,
			phoneNumber: data.phone,
		});
		if (!user?.phoneNumberVerified && data.phone) {
			await phoneNumber.sendOtp({ phoneNumber: data.phone });
			setPhoneNumberUser(data.phone);
			setOpen(true);
		}
		toast
			.promise(updatePromise, {
				loading: "Atualizando...",
				success: "Informações atualizadas com sucesso!",
				error: "Erro ao atualizar informações!",
			})
			.unwrap()
			.then(() => queryClient.invalidateQueries(["getUser"]));
	};

	const handleCloseModal = () => {
		setOpen(false);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{
				opacity: 1,
				y: 0,
				transition: { duration: 0.5, delay: 0.2 },
			}}
			viewport={{ once: true, margin: "-64px" }}
			className="container mt-10"
		>
			{!user?.phoneNumberVerified && <AlertPhoneNotVerified />}
			<p className="text-4xl font-bold">Sua conta</p>
			<div className="p-4 rounded-xl bg-muted mt-6 flex items-center justify-between">
				<div className="flex flex-col gap-2">
					{isLoading && !user ? (
						<ImageSkeleton />
					) : (
						<>
							<p className="font-bold text-xl">
								Nome: <span className="font-normal">{user?.name}</span>
							</p>
							{user?.image ? (
								<div className="relative size-48 group">
									<Image
										src={user.image}
										alt={user.name}
										width={1920}
										height={1080}
										className="size-48 rounded-full z-10 absolute"
									/>
									<EditButton userId={userId} />
								</div>
							) : (
								<div className="size-48 rounded-full bg-foreground relative group opacity-60">
									<p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-muted-foreground">
										{user?.name[0].toUpperCase()}
									</p>
									<EditButton userId={userId} />
								</div>
							)}
						</>
					)}
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<div className="flex gap-4 items-center justify-end">
						<Label>Nome</Label>
						<Input {...register("name")} className="w-80 h-9" />
						{errors.name && (
							<span className="text-destructive text-sm">
								{errors.name.message}
							</span>
						)}
					</div>
					<div className="flex gap-4 items-center justify-end">
						<Label>Email</Label>
						<Input {...register("email")} className="w-80 h-9" />
						{errors.email && (
							<span className="text-destructive text-sm">
								{errors.email.message}
							</span>
						)}
					</div>
					{!user?.phoneNumberVerified && (
						<div className="flex gap-4 items-center justify-end">
							<Label>Telefone</Label>
							<Input
								{...register("phone")}
								className={cn(
									"w-80 h-9",
									!phoneNumberUser && "animate-pulse border-destructive",
								)}
							/>
							{errors.phone && (
								<span className="text-destructive text-sm">
									{errors.phone.message}
								</span>
							)}
						</div>
					)}
					<Button className="w-fit self-end">Atualizar</Button>
				</form>
				<ModalConfirmPhoneOtp
					email={user?.email ?? ""}
					open={open}
					onClose={handleCloseModal}
					phoneNumberUser={phoneNumberUser}
				/>
			</div>
		</motion.div>
	);
}
