import { Skeleton } from "@/src/components/ui/skeleton";

export function ImageSkeleton() {
	return (
		<div className="flex flex-col gap-2">
			<Skeleton className="min-w-24 h-7" />
			<Skeleton className="size-48 rounded-full" />
		</div>
	);
}
