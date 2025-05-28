import { MultiSelect } from "@/src/components/multi-select";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/src/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/src/components/ui/scroll-area";
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
import { cn } from "@/src/lib/utils";
import { getFilters } from "@/src/server/filter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Clock, SlidersHorizontal } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const filterSchema = z.object({
	jobs: z.array(z.string()).default([]),
	status: z.array(z.string()).default([]),
	date: z.string().default(""),
	time: z.string().default(""),
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
	const [time, setTime] = useQueryState("time", parseAsString.withDefault(""));
	const [responsible, setResponsible] = useQueryState(
		"responsible",
		parseAsArrayOf(parseAsString).withDefault([]),
	);
	const [isTimePopoverOpen, setIsTimePopoverOpen] = useState(false);

	const { register, handleSubmit, control, setValue, watch } =
		useForm<FilterFormValues>({
			resolver: zodResolver(filterSchema),
			defaultValues: {
				jobs: jobs,
				status: status,
				date: date,
				time: time,
				responsible: responsible,
			},
		});

	const watchTime = watch("time");

	const onSubmit = (data: FilterFormValues) => {
		setJobs(data.jobs);
		setStatus(data.status);
		setDate(data.date);
		setTime(data.time);
		setResponsible(data.responsible);
	};

	const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
	const minutes = [0, 30];

	const handleTimeSelect = (hour: number, minute: number) => {
		const formattedHour = hour.toString().padStart(2, "0");
		const formattedMinute = minute.toString().padStart(2, "0");
		const timeString = `${formattedHour}:${formattedMinute}`;
		setValue("time", timeString);
		setIsTimePopoverOpen(false);
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
						<Label>Horário</Label>
						<input type="hidden" {...register("time")} />
						<Popover
							open={isTimePopoverOpen}
							onOpenChange={setIsTimePopoverOpen}
							modal={true}
						>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className={cn(
										"w-full justify-start text-left font-normal",
										!watchTime && "text-muted-foreground",
									)}
								>
									<Clock className="mr-2 h-4 w-4" />
									{watchTime || <span>Selecione o horário</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0 z-[9999]" align="start">
								<div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
									<ScrollArea className="w-64 sm:w-auto">
										<div className="flex sm:flex-col p-2">
											{hours.map((hour) => (
												<Button
													key={hour}
													size="icon"
													variant={
														watchTime &&
														Number.parseInt(watchTime.split(":")[0]) === hour
															? "default"
															: "ghost"
													}
													className="sm:w-full shrink-0 aspect-square"
													onClick={() => {
														const currentMinute = watchTime
															? Number.parseInt(watchTime.split(":")[1]) || 0
															: 0;
														handleTimeSelect(hour, currentMinute);
													}}
												>
													{hour}h
												</Button>
											))}
										</div>
										<ScrollBar orientation="horizontal" className="sm:hidden" />
									</ScrollArea>
									<ScrollArea className="w-64 sm:w-auto">
										<div className="flex sm:flex-col p-2">
											{minutes.map((minute) => (
												<Button
													key={minute}
													size="icon"
													variant={
														watchTime &&
														Number.parseInt(watchTime.split(":")[1]) === minute
															? "default"
															: "ghost"
													}
													className="sm:w-full shrink-0 aspect-square"
													onClick={() => {
														const currentHour = watchTime
															? Number.parseInt(watchTime.split(":")[0]) || 0
															: 0;
														handleTimeSelect(currentHour, minute);
													}}
												>
													{minute.toString().padStart(2, "0")}m
												</Button>
											))}
										</div>
										<ScrollBar orientation="horizontal" className="sm:hidden" />
									</ScrollArea>
								</div>
							</PopoverContent>
						</Popover>
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
