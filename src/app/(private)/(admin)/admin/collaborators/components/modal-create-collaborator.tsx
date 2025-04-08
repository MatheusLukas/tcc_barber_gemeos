import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/src/components/ui/select";
import { Plus } from "lucide-react";

export function ModalCreateCollaborator() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<Plus />
					Criar perfil
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Criar Colaborador</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo para criar um novo colaborador.
					</DialogDescription>
				</DialogHeader>
				<form className="mt-6 space-y-2">
					<div className="flex flex-col items-center justify-center gap-2">
						<Avatar className="size-20">
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<Button variant="ghost">Enviar Imagem</Button>
					</div>
					<div className="space-y-2">
						<Label>Nome</Label>
						<Input />
					</div>
					<div className="space-y-2">
						<Label>Email</Label>
						<Input />
					</div>
					<div className="space-y-2">
						<Label>Cargo</Label>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select a fruit" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Cargo</SelectLabel>
									<SelectItem value="admin">Admin</SelectItem>
									<SelectItem value="collaborator">Colaborador</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</form>
				<DialogFooter>
					<Button type="submit">Criar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
