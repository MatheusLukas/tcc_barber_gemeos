import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { queryClient } from "@/src/lib/query-client";
import { cn } from "@/src/lib/utils";
import { createProduct } from "@/src/server/admin/createProduct";
import { getProductById } from "@/src/server/admin/getProductById";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AddImage } from "../../collaborators/components/add-image";

const schemaProduct = z.object({
	name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
	price: z.number().min(0, "Preço deve ser maior que 0"),
	quantity: z.number().min(0, "Quantidade deve ser maior que 0"),
	image: z
		.instanceof(File)
		.refine((val) => val !== null, "Imagem é obrigatória"),
});

export type schemaProductType = z.infer<typeof schemaProduct>;

export function ModalCreateProduct() {
	const [isOpen, setIsOpen] = useState(false);

	const searchParams = useSearchParams();
	const productId = searchParams.get("productId") ?? "";

	useEffect(() => {
		if (productId) {
			setIsOpen(true);
		}
	}, [productId]);

	const { data: product } = useQuery({
		queryKey: ["getProduct", productId],
		queryFn: async () => {
			const [data, _] = await getProductById({
				productId: productId,
			});
			return data;
		},
		enabled: !!productId,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		watch,
		control,
	} = useForm<schemaProductType>({
		resolver: zodResolver(schemaProduct),
	});

	useEffect(() => {
		if (!product) return;
		setValue("name", product.name);
		setValue("price", product.unityPrice);
		setValue("quantity", product.quantity);
		if (product.image) {
			fetch(product.image)
				.then((response) => response.blob())
				.then((blob) => {
					const file = new File([blob], "avatar.png", { type: blob.type });
					setValue("image", file);
				});
		}
	}, [product]);

	const { mutateAsync, isLoading } = useMutation({
		mutationKey: ["create-product"],
		mutationFn: async (data: schemaProductType) => {
			const [_, err] = await createProduct({
				id: product?.id,
				name: data.name,
				unityPrice: data.price,
				quantity: data.quantity,
				image: data.image,
			});

			if (err) {
				toast.error(err.data);
			} else {
				toast.success(
					`Produto ${productId ? "atualizado" : "adicionado"} com sucesso`,
				);
				reset();
				setIsOpen(false);
				queryClient.invalidateQueries(["products"]);
			}
		},
		onSuccess: () => {
			if (productId) {
				const newUrl = new URL(window.location.href);
				newUrl.searchParams.delete("productId");
				window.history.pushState({}, "", newUrl.toString());
			}
			reset();
		},
	});

	const formId = useId();

	const onSubmit = (data: schemaProductType) => {
		toast.promise(mutateAsync(data), {
			loading: `${productId ? "Atualizando" : "Adicionando"} produto`,
		});
	};

	const image = watch("image");

	return (
		<Dialog open={isOpen}>
			<DialogTrigger asChild>
				<Button onClick={() => setIsOpen(true)}>
					<Plus />
					Adicionar Produto
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Adicionar Produto</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo para adicionar um novo produto.
					</DialogDescription>
				</DialogHeader>
				<DialogClose
					onClick={() => setIsOpen(false)}
					className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
				>
					<X className="h-4 w-4" />
					<span className="sr-only">Close</span>
				</DialogClose>
				<form
					id={formId}
					onSubmit={handleSubmit(onSubmit)}
					className="mt-6 space-y-2"
				>
					<div className="flex flex-col items-center justify-center gap-2 relative group">
						{image ? (
							<Image
								src={URL.createObjectURL(image)}
								alt="Logo"
								width={100}
								height={100}
								className="size-20 object-cover rounded-full"
							/>
						) : (
							<Avatar className="size-20">
								<AvatarImage
									src="https://github.com/shadcn.png"
									alt="@shadcn"
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						)}
						<Controller
							control={control}
							render={({ field }) => (
								<AddImage className="size-20" field={field} />
							)}
							name="image"
						/>
					</div>
					<div className="space-y-2">
						<Label>Nome</Label>
						<Input
							className={cn(errors.name && "border-destructive")}
							{...register("name")}
						/>
						{errors.name && (
							<span className="text-destructive text-sm">
								{errors.name.message}
							</span>
						)}
					</div>
					<div className="space-y-2">
						<Label>Preço</Label>
						<Input
							className={cn(errors.price && "border-destructive")}
							{...register("price", { valueAsNumber: true })}
							step="0.01"
							defaultValue={0}
							min={0}
						/>
						{errors.price && (
							<span className="text-destructive text-sm">
								{errors.price.message}
							</span>
						)}
					</div>
					<div className="space-y-2">
						<Label>Quantidade</Label>
						<Input
							className={cn(errors.price && "border-destructive")}
							{...register("quantity", { valueAsNumber: true })}
							defaultValue={0}
							min={0}
						/>
						{errors.price && (
							<span className="text-destructive text-sm">
								{errors.price.message}
							</span>
						)}
					</div>
					{errors.image && (
						<span className="text-destructive text-sm">
							{errors.image.message}
						</span>
					)}
				</form>
				<DialogFooter>
					<Button disabled={isLoading} form={formId} type="submit">
						Adicionar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
