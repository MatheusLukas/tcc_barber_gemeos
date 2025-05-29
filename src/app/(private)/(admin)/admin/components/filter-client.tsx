import { MultiSelect } from "@/src/components/multi-select";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/src/components/ui/sheet";
import { getFilters } from "@/src/server/filter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const filterSchema = z.object({
	jobs: z.array(z.string()).default([]),
	status: z.array(z.string()).default([]),
	date: z.string().default(""),
	responsible: z.array(z.string()).default([]),
});

type FilterFormValues = z.infer<typeof filterSchema>;

export function FilterClient() {
	const { data, isLoading } = useQuery({
		queryKey: ["filters"],
		queryFn: async () => {
			const [data, _] = await getFilters();
			return data;
		},
	});

	const formId = useId();
	const [jobs, setJobs] = useQueryState(
		"jobs",
		parseAsArrayOf(parseAsString).withDefault([]),
	);
	const [status, setStatus] = useQueryState(
		"status",
		parseAsArrayOf(parseAsString).withDefault([]),
	);
	const [date, setDate] = useQueryState("date", parseAsString.withDefault(""));
	const [responsible, setResponsible] = useQueryState(
		"responsible",
		parseAsArrayOf(parseAsString).withDefault([]),
	);

	const { register, handleSubmit, control, setValue, reset } =
		useForm<FilterFormValues>({
			resolver: zodResolver(filterSchema),
			defaultValues: {
				jobs: jobs,
				status: status,
				date: date,
				responsible: responsible,
			},
		});

	const onSubmit = (data: FilterFormValues) => {
		setJobs(data.jobs);
		setStatus(data.status);
		setDate(data.date);
		setResponsible(data.responsible);
		reset();
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="default">
					<SlidersHorizontal className="mr-2 h-4 w-4" />
					Filtro
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Filtro</SheetTitle>
					<SheetDescription>
						Filtre os clientes por serviço, data, status e mais.
					</SheetDescription>
				</SheetHeader>
				<form
					className="mt-6 space-y-2"
					onSubmit={handleSubmit(onSubmit)}
					id={formId}
				>
					<div className="space-y-2">
						<Label>Serviço</Label>
						<Controller
							name="jobs"
							control={control}
							render={({ field }) => (
								<MultiSelect
									placeholder="Selecione os serviços"
									options={data?.jobs ?? []}
									onValueChange={field.onChange}
									defaultValue={field.value}
									modalPopover={true}
								/>
							)}
						/>
					</div>
					<div className="space-y-2">
						<Label>Status</Label>
						<Controller
							name="status"
							control={control}
							render={({ field }) => (
								<MultiSelect
									placeholder="Selecione o status"
									options={data?.status ?? []}
									onValueChange={field.onChange}
									defaultValue={field.value}
									modalPopover={true}
								/>
							)}
						/>
					</div>
					<div className="space-y-2">
						<Label>Data</Label>
						<Input type="date" placeholder="Data" {...register("date")} />
					</div>
					<div className="space-y-2">
						<Label>Responsável</Label>
						<Controller
							name="responsible"
							control={control}
							render={({ field }) => (
								<MultiSelect
									placeholder="Selecione o responsável"
									options={data?.barbers ?? []}
									onValueChange={field.onChange}
									defaultValue={field.value}
									modalPopover={true}
								/>
							)}
						/>
					</div>
				</form>
				<SheetFooter className="mt-6">
					<SheetClose asChild>
						<Button type="submit" form={formId}>
							Aplicar
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
