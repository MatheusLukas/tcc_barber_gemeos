import { uploadImage } from "@/app/server/uploadImage";
import { Button } from "@/components/ui/button";
import ky from "ky";
import { Pen } from "lucide-react";
import { toast } from "sonner";

type Props = {
	userId: string;
};

export async function EditButton({ userId }: Props) {
	const handleFileClick = async (file: File) => {
		const fileFormatted = {
			name: file.name,
			size: file.size,
			type: file.type,
		};
		console.log(process.env.NEXT_PUBLIC_SECRET_KEY_UPLOADTHING, "hello");
		const data = await ky.post("https://api.uploadthing.com/v6/uploadFiles", {
			headers: {
				"Content-Type": "application/json",
				"X-Uploadthing-Api-Key": process.env.NEXT_PUBLIC_SECRET_KEY_UPLOADTHING,
			},
			json: { files: [fileFormatted] },
		});

		console.log(data, "data");
		console.log(data.url);

		await uploadImage({ url: data.url, id: userId });

		toast.promise(data.json(), {
			loading: "Fazendo upload da imagem...",
			success: "Imagem enviada com sucesso!",
			error: "Erro ao enviar imagem!",
		});
	};

	return (
		<div className=" w-full h-full rounded-full bg-black/70 group-hover:flex hidden z-10">
			<Button
				size="icon"
				variant="outline"
				className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full hover:scale-125 transition"
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
							handleFileClick(file);
						}
					}}
				/>
				<Pen size={40} className="text-black" />
			</Button>
		</div>
	);
}
