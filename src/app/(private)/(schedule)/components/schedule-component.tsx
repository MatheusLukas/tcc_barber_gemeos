"use client";
import { Icons } from "@/src/components/icons";
import { Button } from "@/src/components/ui/button";
import { Choicebox } from "@/src/components/ui/choicebox";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useSession } from "@/src/lib/auth-client";
import { queryClient } from "@/src/lib/query-client";
import { cn } from "@/src/lib/utils";
import { getAllBarbers } from "@/src/server/getAllBarbers";
import { getAllJobs } from "@/src/server/getAllJobs";
import { createSchedule } from "@/src/server/schedule/createSchedule";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { DateTimePicker24h } from "./date-timer-picker-24h";

const paymenthMethods = [
	{
		id: 1,
		name: "Mercado Pago",
		description: "Äceitamos cartão e pix",
		icon: Icons.CreditCard,
	},
	{
		id: 2,
		name: "Pagar na hora",
		description:
			"Este método de pagamento serve para pagamento na hora junto ao barbeiro",
		icon: Icons.Coins,
	},
];

const schemaSchedule = z.object({
	barberId: z.string(),
	date: z.date(),
	jobId: z.array(z.string()),
	methodPayment: z.number(),
});

export type schemaScheduleType = z.infer<typeof schemaSchedule>;

export function ScheduleComponent() {
	const [hovered, setHovered] = useState<number | null>(null);
	const [clicked, setClicked] = useState<number | null>(null);
	const [barberId, setBarberId] = useState<string | undefined>(undefined);
	const formId = useId();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<schemaScheduleType>({
		resolver: zodResolver(schemaSchedule),
	});

	const { data: barbers, isLoading: isLoadingBarbers } = useQuery({
		queryKey: ["barbers"],
		queryFn: async () => {
			const [data, _] = await getAllBarbers();
			return data;
		},
	});

	const { data: jobs, isLoading: isLoadingJobs } = useQuery({
		queryKey: ["jobs"],
		queryFn: async () => {
			const [data, _] = await getAllJobs();
			return data;
		},
	});

	const jobItems = jobs?.map((item, index) => ({
		...item,
		_index: index,
	}));

	const { data: user } = useSession();

	const { mutateAsync, isLoading } = useMutation({
		mutationKey: ["create-schedule"],
		mutationFn: async (data: schemaScheduleType) => {
			const [response, err] = await createSchedule({
				userId: user!.user!.id!,
				userName: user!.user!.name!,
				userEmail: user!.user!.email!,
				barberId: barberId!,
				date: data.date,
				jobsId: data.jobId,
				methodPayment: data.methodPayment,
			});

			if (err) {
				toast.error(err.data);
			} else {
				toast.success("Agendamento criado com sucesso");
				reset();
				setHovered(null);
				setClicked(null);
				setBarberId(undefined);
			}

			return response;
		},
		onSuccess: (response) => {
			if (response) {
				window.open(response, "_blank");
			}
			queryClient.invalidateQueries(["freeHours", barberId]);
		},
	});

	const onSubmit = (data: schemaScheduleType) => {
		toast.promise(mutateAsync(data), {
			loading: "Agendando...",
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="container my-10 space-y-6"
			id={formId}
		>
			<p className="text-3xl font-bold">Agendamento</p>
			<p className="text-2xl font-medium">Selecione um barbeiro</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-sm:place-items-center">
				{isLoadingBarbers ? (
					<>
						<div className="h-[296px] w-[216px] p-2 space-y-2">
							<Skeleton className="col-span-4 h-[230px] w-[200px]" />
							<div className="space-y-2">
								<Skeleton className="w-32 h-5" />
								<Skeleton className="w-32 h-5" />
							</div>
						</div>
						<div className="h-[296px] w-[216px] p-2 space-y-2">
							<Skeleton className="col-span-4 h-[230px] w-[200px]" />
							<div className="space-y-2">
								<Skeleton className="w-32 h-5" />
								<Skeleton className="w-32 h-5" />
							</div>
						</div>
						<div className="h-[296px] w-[216px] p-2 space-y-2">
							<Skeleton className="col-span-4 h-[230px] w-[200px]" />
							<div className="space-y-2">
								<Skeleton className="w-32 h-5" />
								<Skeleton className="w-32 h-5" />
							</div>
						</div>
						<div className="h-[296px] w-[216px] p-2 space-y-2">
							<Skeleton className="col-span-4 h-[230px] w-[200px]" />
							<div className="space-y-2">
								<Skeleton className="w-32 h-5" />
								<Skeleton className="w-32 h-5" />
							</div>
						</div>
					</>
				) : (
					barbers?.map((barber, idx) => (
						<button
							key={barber?.id}
							type="button"
							onMouseEnter={() => setHovered(idx)}
							onMouseLeave={() => setHovered(null)}
							onClick={() => {
								setClicked(idx);
								setBarberId(barber.id);
							}}
							className={cn(
								"hover:bg-muted w-fit p-2 rounded-lg transition-all duration-500",
								hovered !== null &&
									hovered !== idx &&
									"blur-[2px] scale-[0.98]",
								clicked !== null && clicked === idx && "bg-muted",
							)}
							{...register("barberId", { value: barber?.id })}
						>
							<Image
								src={barber.image}
								alt={barber.name}
								width={200}
								height={200}
								className="h-[230px] object-cover"
							/>
							<div className="*:text-start">
								<p className="text-lg font-bold">{barber?.name}</p>
								<p className="text-muted-foreground">Barbeiro</p>
							</div>
						</button>
					))
				)}
			</div>
			<p className="text-2xl font-medium">
				Selecione o serviço e o dia desejado!
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Controller
					control={control}
					render={({ field }) => (
						<DateTimePicker24h
							barberId={barberId}
							field={field}
							disabled={clicked === null}
						/>
					)}
					name="date"
				/>

				{isLoadingJobs ? (
					<div className="flex flex-col">
						<Skeleton className="w-full h-[72px]" />
						<Skeleton className="w-full h-[72px]" />
						<Skeleton className="w-full h-[72px]" />
						<Skeleton className="w-full h-[72px]" />
						<Skeleton className="w-full h-[72px]" />
						<Skeleton className="w-full h-[72px]" />
					</div>
				) : (
					<ScrollArea className="w-full h-96">
						<Choicebox
							className="mx-auto w-full px-2"
							selectionMode="multiple"
							aria-label="Select job"
							gap={0}
							columns={1}
							selectionBehavior="toggle"
							onSelectionChange={(value) => {
								setValue("jobId", Array.from(value).map(String));
							}}
							items={jobItems}
						>
							{(item) => (
								<Choicebox.Item
									key={item.id}
									className={cn(
										"w-full p-4 first:!rounded-t-md last:!rounded-b-md rounded-r-none rounded-l-none",
										item._index % 2 === 0 ? "bg-card" : "bg-muted",
									)}
									title={item.name}
									description={item.price}
								/>
							)}
						</Choicebox>
					</ScrollArea>
				)}
			</div>
			<div className="space-y-6">
				<div className="max-w-sm space-y-2">
					<p className="text-2xl font-medium">Opções de pagamento</p>
					<p className="text-muted-foreground text-pretty">
						Preencha todos os campos e seleções para continuar o processo e
						finalizar sua compra
					</p>
				</div>
				<Choicebox
					className="mx-auto w-full"
					selectionMode="single"
					aria-label="Select job"
					gap={0}
					columns={1}
					selectionBehavior="toggle"
					items={paymenthMethods}
					onSelectionChange={(value) => {
						const selectedValues = Array.from(value); // Convert Selection to an array
						setValue("methodPayment", Number(selectedValues[0]));
					}}
				>
					{(item) => (
						<Choicebox.Item
							key={item.id}
							className={cn(
								"w-full p-4 first:!rounded-t-md last:!rounded-b-md rounded-r-none rounded-l-none",
								item.id % 2 === 0 ? "bg-card" : "bg-muted",
							)}
							title={item.name}
							description={item.description}
							icon={item.icon}
						/>
					)}
				</Choicebox>
				<div className="w-full flex gap-4 justify-end">
					<Button onClick={() => reset()} variant="outline">
						Cancelar
					</Button>
					<Button
						form={formId}
						onClick={() => {
							const errorFields = [];
							if (errors.barberId) errorFields.push("Barbeiro");
							if (errors.date) errorFields.push("Data");
							if (errors.jobId) errorFields.push("Serviço");
							if (errors.methodPayment) errorFields.push("Método de Pagamento");

							const textError = `Você deve preencher o(s) campo(s) ${errorFields.join(", ")}`;
							if (errorFields.length !== 0) {
								toast.error(textError);
							}
						}}
						disabled={isLoading}
					>
						Continuar
					</Button>
				</div>
			</div>
		</form>
	);
}
