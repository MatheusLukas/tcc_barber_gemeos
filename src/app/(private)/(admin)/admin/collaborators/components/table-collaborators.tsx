import { DataTable } from "../../../components/data-table";
import { columns } from "./columns";

type Barber = {
	id: string;
	barberInfo: {
		name: string;
		image: string;
	};
	role: string;
	email: string;
};

interface TableClientsProps {
	filterValue: string;
	setFilter: (value: string) => void;
	data: Barber[];
	isLoading: boolean;
}

export function TableCollaborators({
	filterValue,
	setFilter,
	data,
	isLoading,
}: TableClientsProps) {
	return (
		<DataTable
			filterColumn="barberInfo"
			columns={columns}
			data={data}
			filterValue={filterValue}
			setFilter={setFilter}
			isLoading={isLoading}
		/>
	);
}
