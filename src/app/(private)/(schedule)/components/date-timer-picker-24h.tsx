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
import type { ControllerRenderProps } from "react-hook-form";
import type { schemaScheduleType } from "./schedule-component";

type Props = {
	disabled?: boolean;
	field: ControllerRenderProps<schemaScheduleType, "date">;
};

export function DateTimePicker24h({ disabled, field }: Props) {
	const [date, setDate] = React.useState<Date>();
	const [isOpen, setIsOpen] = React.useState(false);

	const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
	const minutes = [0o0, 30];
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

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						"max-w-md justify-start text-left font-normal",
						!date && "text-muted-foreground",
					)}
					disabled={disabled}
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
						onSelect={(selectedDate) => {
							handleDateSelect(selectedDate);
						}}
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
