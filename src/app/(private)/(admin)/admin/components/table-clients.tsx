import { DataTable } from "../../components/data-table";
import { columns } from "./columns";

const appointments = [
	{
		client: "Roberto de jesus",
		service: "Corte de cabelo",
		value: "R$24,05",
		date: "24/03/2025",
		time: "16:00",
		status: "Em andamento" as const,
		responsible: "Roberto de jesus",
	},
	{
		client: "Roberto de jesus1",
		service: "Corte de cabelo",
		value: "R$24,10",
		date: "24/03/2025",
		time: "16:00",
		status: "Cancelado" as const,
		responsible: "Roberto de jesus",
	},
	{
		client: "Roberto de jesus2",
		service: "Corte de cabelo",
		value: "R$24,15",
		date: "24/03/2025",
		time: "16:00",
		status: "Agendado" as const,
		responsible: "Roberto de jesus",
	},
	{
		client: "Roberto de jesus3",
		service: "Corte de cabelo",
		value: "R$24,20",
		date: "24/03/2025",
		time: "16:00",
		status: "Atrasado" as const,
		responsible: "Roberto de jesus",
	},
	{
		client: "Roberto de jesus4",
		service: "Corte de cabelo",
		value: "R$24,21",
		date: "24/03/2025",
		time: "16:00",
		status: "Agendado" as const,
		responsible: "Roberto de jesus",
	},
	{
		client: "Roberto de jesus5",
		service: "Corte de cabelo",
		value: "R$24,25",
		date: "24/03/2025",
		time: "16:01",
		status: "Em andamento" as const,
		responsible: "Roberto de jesus",
	},
	{
		client: "Roberto de jesus6",
		service: "Corte de cabelo",
		value: "R$24,17",
		date: "24/03/2025",
		time: "16:00",
		status: "Agendado" as const,
		responsible: "Roberto de jesus",
	},
	{
		client: "Roberto de jesus7",
		service: "Corte de cabelo",
		value: "R$24,00",
		date: "24/03/2025",
		time: "16:00",
		status: "Agendado" as const,
		responsible: "Roberto de jesus",
	},
];

interface TableClientsProps {
	filterValue: string;
	setFilter: (value: string) => void;
}

export function TableClients({ filterValue, setFilter }: TableClientsProps) {
	return (
		<DataTable
			filterColumn="client"
			columns={columns}
			data={appointments}
			filterValue={filterValue}
			setFilter={setFilter}
		/>
	);
}
