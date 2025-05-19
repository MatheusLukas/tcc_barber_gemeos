import { Animation } from "@/src/components/animation";
import { Skeleton } from "@/src/components/ui/skeleton";
import { FormatPrice } from "@/src/lib/format-price";
import { getAllJobs } from "@/src/server/getAllJobs";
import { useQuery } from "@tanstack/react-query";
import { Scissors } from "lucide-react";
import { EditJobs } from "./edit-jobs";

export function ShowJobs() {
	const { data: jobs, isLoading } = useQuery({
		queryKey: ["jobs"],
		queryFn: async () => {
			const [data, _] = await getAllJobs();
			return data;
		},
	});

	return (
		<div className="px-3 space-y-3">
			{isLoading ? (
				<>
					<div className="flex justify-between bg-muted w-full h-16 p-4 rounded-md">
						<div className="flex items-center gap-4">
							<Skeleton className="size-6 rounded-full" />
							<Skeleton className="w-32 h-7" />
						</div>
						<div className="flex items-center gap-4">
							<Skeleton className="size-6 h-7 w-32" />
							<Skeleton className="h-9 w-12 rounded-md" />
							<Skeleton className="h-9 w-12 rounded-md" />
						</div>
					</div>
					<div className="flex justify-between bg-muted w-full h-16 p-4 rounded-md">
						<div className="flex items-center gap-4">
							<Skeleton className="size-6 rounded-full" />
							<Skeleton className="w-32 h-7" />
						</div>
						<div className="flex items-center gap-4">
							<Skeleton className="size-6 h-7 w-32" />
							<Skeleton className="h-9 w-12 rounded-md" />
							<Skeleton className="h-9 w-12 rounded-md" />
						</div>
					</div>
					<div className="flex justify-between bg-muted w-full h-16 p-4 rounded-md">
						<div className="flex items-center gap-4">
							<Skeleton className="size-6 rounded-full" />
							<Skeleton className="w-32 h-7" />
						</div>
						<div className="flex items-center gap-4">
							<Skeleton className="size-6 h-7 w-32" />
							<Skeleton className="h-9 w-12 rounded-md" />
							<Skeleton className="h-9 w-12 rounded-md" />
						</div>
					</div>
					<div className="flex justify-between bg-muted w-full h-16 p-4 rounded-md">
						<div className="flex items-center gap-4">
							<Skeleton className="size-6 rounded-full" />
							<Skeleton className="w-32 h-7" />
						</div>
						<div className="flex items-center gap-4">
							<Skeleton className="size-6 h-7 w-32" />
							<Skeleton className="h-9 w-12 rounded-md" />
							<Skeleton className="h-9 w-12 rounded-md" />
						</div>
					</div>
					<div className="flex justify-between bg-muted w-full h-16 p-4 rounded-md">
						<div className="flex items-center gap-4">
							<Skeleton className="size-6 rounded-full" />
							<Skeleton className="w-32 h-7" />
						</div>
						<div className="flex items-center gap-4">
							<Skeleton className="size-6 h-7 w-32" />
							<Skeleton className="h-9 w-12 rounded-md" />
							<Skeleton className="h-9 w-12 rounded-md" />
						</div>
					</div>
				</>
			) : jobs && jobs.length > 0 ? (
				jobs.map((job) => (
					<Animation direction="down" key={job.id} once>
						<div className="flex justify-between bg-muted w-full p-4 rounded-md h-fit">
							<div className="flex items-center gap-4">
								<Scissors />
								<p className="font-semibold text-lg text-center">{job.name}</p>
							</div>
							<div className="flex items-center gap-4">
								<p className="font-semibold text-lg text-center">
									{FormatPrice(job.price)}
								</p>
								<EditJobs jobId={job.id} />
							</div>
						</div>
					</Animation>
				))
			) : (
				<div className="flex justify-center items-center w-full h-[350px]">
					<p className="text-lg font-semibold text-muted-foreground">
						Não há serviços cadastrados
					</p>
				</div>
			)}
		</div>
	);
}
