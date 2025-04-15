import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { Pen } from "lucide-react";
import { useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { toast } from "sonner";
import type { schemaCollaboratorType } from "./modal-create-collaborator";

type Props = {
	field: ControllerRenderProps<schemaCollaboratorType, "avatar">;
	className?: string;
};

export function AddImage({ field, className }: Props) {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div
			className={cn(
				"w-full h-full rounded-full bg-black/70 dark:bg-black/10 group-hover:flex hidden z-20 absolute",
				className,
			)}
		>
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
						setIsLoading(true);
						const lenght = e.target.files?.length;
						const file = e.target.files?.[lenght! - 1];
						if (file) {
							const maxSize = 2 * 1024 * 1024;
							if (file.size > maxSize) {
								toast.error("Arquivo muito grande! O tamanho máximo é 30MB.");
								return;
							}
							field.onChange(file);
						}
					}}
				/>
				<Pen size={40} className="text-black" />
			</Button>
		</div>
	);
}
