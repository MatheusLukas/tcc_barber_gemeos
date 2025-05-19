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
import { queryClient } from "@/src/lib/query-client";
import { cn } from "@/src/lib/utils";
import { createJob } from "@/src/server/admin/createJob";
import { getJobById } from "@/src/server/schedule/getJobById";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schemaJob = z.object({
	name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
	price: z.number().refine((val) => val > 0, "Preço deve ser maior que 0"),
});

export type schemaJobType = z.infer<typeof schemaJob>;

export function ModalCreateJob() {
	const [isOpen, setIsOpen] = useState(false);

	const searchParams = useSearchParams();
	const jobId = searchParams.get("jobId") ?? "";

	useEffect(() => {
		if (jobId) {
			setIsOpen(true);
		}
	}, [jobId]);

	const { data: job } = useQuery({
		queryKey: ["getJob", jobId],
		queryFn: async () => {
			const [data, _] = await getJobById({
				jobsId: [jobId],
			});
			return data;
		},
		enabled: !!jobId,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<schemaJobType>({
		resolver: zodResolver(schemaJob),
	});

	useEffect(() => {
		if (!job) return;
		setValue("name", job?.[0].name);
		setValue("price", job?.[0].price);
	}, [job]);

	const { mutateAsync, isLoading } = useMutation({
		mutationKey: ["create-job"],
		mutationFn: async (data: schemaJobType) => {
			const [_, err] = await createJob({
				id: job?.[0].id,
				name: data.name,
				price: data.price,
			});

			if (err) {
				toast.error(err.data);
			} else {
				toast.success(
					`Serviço ${jobId ? "atualizado" : "adicionado"} com sucesso`,
				);
				reset();
				setIsOpen(false);
				queryClient.invalidateQueries(["jobs"]);
			}
		},
		onSuccess: () => {
			if (jobId) {
				const newUrl = new URL(window.location.href);
				newUrl.searchParams.delete("jobId");
				window.history.pushState({}, "", newUrl.toString());
			}
			reset();
		},
	});

	const formId = useId();

	const onSubmit = (data: schemaJobType) => {
		toast.promise(mutateAsync(data), {
			loading: `${jobId ? "Atualizando" : "Adicionando"} Serviço`,
		});
	};

	return (
		<Dialog open={isOpen}>
			<DialogTrigger asChild>
				<Button onClick={() => setIsOpen(true)}>
					<Plus />
					Adicionar Serviço
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Adicionar Serviço</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo para adicionar um novo colaborador.
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
					<div className="space-y-2">
						<Label>Preço</Label>
						<Input
							className={cn(errors.price && "border-destructive")}
							{...register("price", { valueAsNumber: true })}
							step="0.01"
							defaultValue={0}
						/>
						{errors.price && (
							<span className="text-destructive text-sm">
								{errors.price.message}
							</span>
						)}
					</div>
				</form>
				<DialogFooter>
					<Button disabled={isLoading} form={formId} type="submit">
						Adicionar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
