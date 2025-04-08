import { Button } from "@/src/components/ui/button";
import { queryClient } from "@/src/lib/query-client";
import { imageUploader } from "@/src/server/imageUploader";
import { uploadImage } from "@/src/server/uploadImage";
import { useMutation } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import { toast } from "sonner";

type Props = {
	userId: string;
};

export function EditButton({ userId }: Props) {
	const { mutateAsync, isLoading } = useMutation({
		mutationKey: ["uploadImage"],
		mutationFn: async (file: File) => {
			const [data] = await imageUploader({ file: file });
			await uploadImage({ url: data!.data!.url, id: userId });
			return data?.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["getUser"]);
		},
	});

	const handleFileClick = (file: File) => {
		const uploadPromise = mutateAsync(file);
		toast.promise(uploadPromise, {
			loading: "Uploading...",
			success: "Imagem atualizada com sucesso!",
			error: "Erro ao enviar imagem!",
		});
	};

	return (
		<div className="w-full h-full rounded-full bg-black/70 dark:bg-black/10 group-hover:flex hidden z-20 absolute">
			<Button
				size="icon"
				variant="outline"
				className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full hover:scale-125 transition dark:bg-gray-600"
				disabled={isLoading}
			>
				<input
					type="file"
					accept="image/*"
					className="absolute inset-0 opacity-0 cursor-pointer"
					onChange={(e) => {
						e.preventDefault();
						const lenght = e.target.files?.length;
						const file = e.target.files?.[lenght! - 1];
						if (file) {
							const maxSize = 2 * 1024 * 1024;
							if (file.size > maxSize) {
								toast.error("Arquivo muito grande! O tamanho máximo é 30MB.");
								return;
							}
							handleFileClick(file);
						}
					}}
				/>
				<Pen size={40} className="text-black" />
			</Button>
		</div>
	);
}
