import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button";
import { queryClient } from "@/src/lib/query-client";
import { deleteJob } from "@/src/server/admin/deleteJob";
import { useMutation } from "@tanstack/react-query";
import { Pen, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
	jobId: string;
};

export function EditJobs({ jobId }: Props) {
	const mutation = useMutation({
		mutationKey: ["deleteJob"],
		mutationFn: async ({ jobId }: { jobId: string }) => deleteJob({ jobId }),
		onSuccess: () => {
			queryClient.invalidateQueries(["jobs"]);
		},
	});

	function handleDeleteJob(jobId: string) {
		toast.promise(async () => mutation.mutate({ jobId }), {
			loading: "Deletando...",
			success: "Serviço deletado com sucesso",
			error: "Erro ao deletar serviço",
		});
	}

	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant="destructive">
						<Trash />
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Você tem certeza que deseja deletar?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Essa ação não pode ser desfeita!
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
							onClick={() => handleDeleteJob(jobId)}
						>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<Button asChild>
				<Link href={{ query: { jobId: jobId } }}>
					<Pen />
				</Link>
			</Button>
		</>
	);
}
