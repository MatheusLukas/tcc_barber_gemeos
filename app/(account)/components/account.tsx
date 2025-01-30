"use client";
import { AlertPhoneNotVerified } from "@/components/alert-phone-not-verified";
import { ModalConfirmPhoneOtp } from "@/components/modal-confirm-phone-otp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { phoneNumber, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { getUser } from "@/server/getUser";
import { updateUserComunication } from "@/server/updateUserComunication";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import * as motion from "framer-motion/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EditButton } from "./editButton";

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
	});

	console.log(user, isLoading, data);

	const {
		register,
		handleSubmit,
		watch,
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
		await updateUserComunication({
			name: data.name,
			email: data.email,
			phoneNumber: data.phone,
		});
		if (!user?.phoneNumberVerified && data.phone) {
			await phoneNumber.sendOtp({ phoneNumber: data.phone });
			setPhoneNumberUser(data.phone);
			setOpen(true);
		}
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
					{isLoading ? (
						<Skeleton className="h-7 w-48" />
					) : (
						<p className="font-bold text-xl">
							Nome: <span className="font-normal">{user?.name}</span>
						</p>
					)}
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
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<div className="flex gap-4 items-center justify-end">
						<Label>Nome</Label>
						{isLoading ? (
							<Skeleton className="w-80" />
						) : (
							<Input {...register("name")} className="w-80 h-9" />
						)}
					</div>
					<div className="flex gap-4 items-center justify-end">
						<Label>Email</Label>
						{isLoading ? (
							<Skeleton className="w-80" />
						) : (
							<Input {...register("email")} className="w-80 h-9" />
						)}
					</div>
					{!user?.phoneNumberVerified && (
						<div className="flex gap-4 items-center justify-end">
							<Label>Telefone</Label>
							{isLoading ? (
								<Skeleton className="w-80" />
							) : (
								<Input
									{...register("phone")}
									className={cn(
										"w-80 h-9",
										!phoneNumberUser && "animate-pulse border-destructive",
									)}
								/>
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
