import { DataTable } from "../../../components/data-table";
import { columns } from "./columns";

type Schedule = {
	id: string;
	name: string;
	image: string | null;
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
	status: string;
};

interface TableClientsProps {
	filterValue: string;
	setFilter: (value: string) => void;
	data: Schedule[];
	isLoading: boolean;
}

export function TableSchedule({
	filterValue,
	setFilter,
	data,
	isLoading,
}: TableClientsProps) {
	return (
		<DataTable
			filterColumn="name"
			columns={columns}
			data={data}
			filterValue={filterValue}
			setFilter={setFilter}
			isLoading={isLoading}
		/>
	);
}
