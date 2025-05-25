import { DataTable } from "../../components/data-table";
import { columns } from "./columns";

type SchedulePending = {
	id: string;
	client: {
		name: string;
		image: string | null;
	};
	price: string;
	date: string;
	time: string;
	barber: {
		name: string;
		image: string;
	};
	job: {
		job: string;
	}[];
	paymentMethod: string;
};

interface TableClientsProps {
	filterValue: string;
	setFilter: (value: string) => void;
	data?: SchedulePending[];
	isLoading: boolean;
}

export function TableClients({
	filterValue,
	setFilter,
	data,
	isLoading,
}: TableClientsProps) {
	return (
		<DataTable
			filterColumn="client"
			columns={columns}
			data={data ?? []}
			filterValue={filterValue}
			setFilter={setFilter}
			isLoading={isLoading}
		/>
	);
}
