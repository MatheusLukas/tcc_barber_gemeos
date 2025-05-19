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
import { deleteCollaborator } from "@/src/server/admin/deleteCollaborator";
import { useMutation } from "@tanstack/react-query";
import { Pen, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
	collaboratorId: string;
};

export function EditCollaborators({ collaboratorId }: Props) {
	const mutation = useMutation({
		mutationKey: ["deleteCollaborator"],
		mutationFn: async ({ collaboratorId }: { collaboratorId: string }) =>
			deleteCollaborator({ collaboratorId }),
		onSuccess: () => {
			queryClient.invalidateQueries(["getBarberInfo"]);
		},
	});

	function handleDeleteCollaborator(collaboratorId: string) {
		toast.promise(async () => mutation.mutate({ collaboratorId }), {
			loading: "Excluindo...",
			success: "Colaborador excluido com sucesso",
			error: "Erro ao excluir colaborador",
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
							onClick={() => handleDeleteCollaborator(collaboratorId)}
						>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<Button asChild>
				<Link href={{ query: { collaboratorId: collaboratorId } }}>
					<Pen />
				</Link>
			</Button>
		</>
	);
}
