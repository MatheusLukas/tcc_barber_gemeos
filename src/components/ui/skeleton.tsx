import { cn } from "@/src/lib/utils";

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"animate-pulse rounded-md bg-primary/20 dark:bg-zinc-900",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
