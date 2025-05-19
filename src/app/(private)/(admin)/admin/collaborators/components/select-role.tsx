import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/src/components/ui/select";

import type { ControllerRenderProps } from "react-hook-form";
import type { schemaCollaboratorType } from "./modal-create-collaborator";

type Props = {
	field: ControllerRenderProps<schemaCollaboratorType, "role">;
};

export function SelectRole({ field }: Props) {
	console.log(field.value);
	return (
		<Select onValueChange={field.onChange} defaultValue={field.value}>
			<SelectTrigger>
				<SelectValue placeholder="Selecione um Cargo" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Cargo</SelectLabel>
					<SelectItem value="admin">Admin</SelectItem>
					<SelectItem value="collaborator">Colaborador</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
