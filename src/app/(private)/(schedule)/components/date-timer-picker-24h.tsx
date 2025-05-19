"use client";

import { addMonths, format } from "date-fns";
import { Calendar1Icon } from "lucide-react";
import * as React from "react";

import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/src/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/src/components/ui/scroll-area";
import { cn } from "@/src/lib/utils";
import { getFreeHoursByBarberd } from "@/src/server/getFreeHoursByBarberId";
import { useQuery } from "@tanstack/react-query";
import type { ControllerRenderProps } from "react-hook-form";
import type { schemaScheduleType } from "./schedule-component";

type Props = {
	disabled?: boolean;
	field: ControllerRenderProps<schemaScheduleType, "date">;
	barberId?: string;
};

export function DateTimePicker24h({ disabled, field, barberId }: Props) {
	const [date, setDate] = React.useState<Date>();
	const [isOpen, setIsOpen] = React.useState(false);

	const { data, isLoading } = useQuery({
		queryKey: ["freeHours", barberId],
		queryFn: async () => {
			const [response, _] = await getFreeHoursByBarberd({
				barberId: barberId!,
			});
			return response;
		},
		enabled: !!barberId,
	});

	const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
	const minutes = [0, 30];
	const today = new Date();

	const handleDateSelect = (selectedDate: Date | undefined) => {
		if (selectedDate) {
			setDate(selectedDate);
		}
	};

	const handleTimeChange = (type: "hour" | "minute", value: string) => {
		if (date) {
			const newDate = new Date(date);
			if (type === "hour") {
				newDate.setHours(Number.parseInt(value));
			} else if (type === "minute") {
				newDate.setMinutes(Number.parseInt(value));
			}
			setDate(newDate);
			field.onChange(newDate);
		}
	};

	const occupiedAppointments = data || [];
	const occupiedHours = occupiedAppointments.map((appointment) => {
		const appointmentDate = new Date(appointment.date);
		return {
			hour: appointmentDate.getHours(),
			minute: appointmentDate.getMinutes(),
			day: appointmentDate.getDate(),
			month: appointmentDate.getMonth(),
			year: appointmentDate.getFullYear(),
		};
	});

	const isTimeOccupied = (hour: number, minute: number, selectedDate: Date) => {
		if (!selectedDate) return false;
		return occupiedHours.some(
			(appointment) =>
				appointment.hour === hour &&
				appointment.minute === minute &&
				appointment.day === selectedDate.getDate() &&
				appointment.month === selectedDate.getMonth() &&
				appointment.year === selectedDate.getFullYear(),
		);
	};

	const isHourDisabled = (hour: number, selectedDate: Date) => {
		return (
			isTimeOccupied(hour, 0, selectedDate) &&
			isTimeOccupied(hour, 30, selectedDate)
		);
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						"w-full justify-start text-left font-normal",
						!date && "text-muted-foreground",
					)}
					disabled={disabled || isLoading}
				>
					<Calendar1Icon className="mr-2 h-4 w-4" />
					{date ? (
						format(date, "MM/dd/yyyy HH:mm")
					) : (
						<span>Dia/Mês/Ano | Hora:minuto </span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full">
				<div className="sm:flex">
					<Calendar
						mode="single"
						selected={date}
						onSelect={handleDateSelect}
						initialFocus
						footer={
							date
								? `Dia: ${format(date, "MM/dd/yyyy HH:mm")}`
								: "Selecione um dia"
						}
						disabled={{ before: today }}
						fromDate={addMonths(today, -1)}
						toDate={addMonths(today, 3)}
						captionLayout="buttons"
					/>
					<div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
						<ScrollArea className="w-64 sm:w-auto">
							<div className="flex sm:flex-col p-2">
								{hours.map((hour) => (
									<Button
										key={hour}
										size="icon"
										variant={
											date && date.getHours() === hour ? "default" : "ghost"
										}
										className="sm:w-full shrink-0 aspect-square"
										onClick={() => handleTimeChange("hour", hour.toString())}
										disabled={isHourDisabled(hour, date!)} // Desabilita se a hora estiver ocupada
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
											date && date.getMinutes() === minute ? "default" : "ghost"
										}
										className="sm:w-full shrink-0 aspect-square"
										onClick={() =>
											handleTimeChange("minute", minute.toString())
										}
										disabled={isTimeOccupied(date?.getHours()!, minute, date!)}
									>
										{minute.toString().padStart(2, "0")}m
									</Button>
								))}
							</div>
							<ScrollBar orientation="horizontal" className="sm:hidden" />
						</ScrollArea>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
