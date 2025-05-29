import { getProducts } from "@/src/server/admin/getProducts";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../../components/data-table";
import { columns } from "./columns";

interface TableStockProps {
	filterValue: string;
	setFilter: (value: string) => void;
}

export function TableStock({ filterValue, setFilter }: TableStockProps) {
	const { data: products, isLoading } = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const [data, _] = await getProducts();
			return data;
		},
	});

	return (
		<DataTable
			filterColumn="name"
			columns={columns as any}
			data={products ?? []}
			filterValue={filterValue}
			setFilter={setFilter}
			isLoading={isLoading}
		/>
	);
}
