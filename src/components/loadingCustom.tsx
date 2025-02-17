import { cn } from "@/src/lib/utils";
import { useEffect, useState } from "react";

type Props = {
	text: string;
	className?: string;
};

export function LoadingCustom({ text, className }: Props) {
	const [dots, setDots] = useState("...");
	useEffect(() => {
		const interval = setInterval(() => {
			setDots((prev) => (prev.length < 3 ? `${prev}.` : ""));
		}, 500);
		return () => clearInterval(interval);
	}, []);

	return (
		<span className={cn(className)}>
			{text}
			{dots}
		</span>
	);
}
