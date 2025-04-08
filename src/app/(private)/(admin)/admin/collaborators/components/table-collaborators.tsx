import { DataTable } from "../../../components/data-table";
import { columns } from "./columns";

const collaborators = [
	{
		professional: "Ana Silva",
		email: "ana.silva@example.com",
		phone: "1234-5678",
		value: "R$50,00",
		status: "Em atendimento" as const,
		historic: "Ver",
	},
	{
		professional: "Carlos Oliveira",
		email: "carlos.oliveira@example.com",
		phone: "2345-6789",
		value: "R$60,00",
		status: "Falta" as const,
		historic: "Ver",
	},
	{
		professional: "Mariana Costa",
		email: "mariana.costa@example.com",
		phone: "3456-7890",
		value: "R$70,00",
		status: "Aguardando Cliente" as const,
		historic: "Ver",
	},
	{
		professional: "Roberto Santos",
		email: "roberto.santos@example.com",
		phone: "4567-8901",
		value: "R$80,00",
		status: "Atrasado" as const,
		historic: "Ver",
	},
	{
		professional: "Fernanda Lima",
		email: "fernanda.lima@example.com",
		phone: "5678-9012",
		value: "R$55,00",
		status: "Em atendimento" as const,
		historic: "Ver",
	},
	{
		professional: "Lucas Pereira",
		email: "lucas.pereira@example.com",
		phone: "6789-0123",
		value: "R$65,00",
		status: "Falta" as const,
		historic: "Ver",
	},
	{
		professional: "Juliana Almeida",
		email: "juliana.almeida@example.com",
		phone: "7890-1234",
		value: "R$75,00",
		status: "Aguardando Cliente" as const,
		historic: "Ver",
	},
	{
		professional: "Thiago Martins",
		email: "thiago.martins@example.com",
		phone: "8901-2345",
		value: "R$85,00",
		status: "Atrasado" as const,
		historic: "Ver",
	},
	{
		professional: "Patrícia Rocha",
		email: "patricia.rocha@example.com",
		phone: "9012-3456",
		value: "R$90,00",
		status: "Em atendimento" as const,
		historic: "Ver",
	},
	{
		professional: "Eduardo Ferreira",
		email: "eduardo.ferreira@example.com",
		phone: "0123-4567",
		value: "R$95,00",
		status: "Falta" as const,
		historic: "Ver",
	},
];

interface TableClientsProps {
	filterValue: string;
	setFilter: (value: string) => void;
}

export function TableCollaborators({
	filterValue,
	setFilter,
}: TableClientsProps) {
	return (
		<DataTable
			filterColumn="professional"
			columns={columns}
			data={collaborators}
			filterValue={filterValue}
			setFilter={setFilter}
		/>
	);
}
