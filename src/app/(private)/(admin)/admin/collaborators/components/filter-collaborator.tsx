import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/src/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

export function FilterCollaborator() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="default">
					<SlidersHorizontal className="mr-2 h-4 w-4" />
					Filtro
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Filtro</SheetTitle>
					<SheetDescription>
						Filtre os clientes por serviço, valor, status e mais.
					</SheetDescription>
				</SheetHeader>
				<form className="mt-6 space-y-2">
					<div className="space-y-2">
						<Label>Serviço</Label>
						<Input placeholder="Digite um serviço" />
					</div>
					<div className="space-y-2">
						<Label>Valor</Label>
						<Input placeholder="Aqui deveria ser um range?" />
					</div>
					<div className="space-y-2">
						<Label>Status</Label>
						<Input placeholder="Select ou multi select" />
					</div>
					<div className="space-y-2">
						<Label>Data</Label>
						<Input placeholder="Data" />
					</div>
					<div className="space-y-2">
						<Label>Horário</Label>
						<Input placeholder="Horario" />
					</div>
					<div className="space-y-2">
						<Label>Responsável</Label>
						<Input placeholder="Select de colaboradores" />
					</div>
				</form>
				<SheetFooter className="mt-6">
					<SheetClose asChild>
						<Button type="submit">Aplicar</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
