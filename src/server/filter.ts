"use server";
import { createServerAction } from "zsa";
import { getAllBarbers } from "./getAllBarbers";
import { getAllJobs } from "./getAllJobs";

export const getFilters = createServerAction().handler(async () => {
	const [barbers, error] = await getAllBarbers();
	const [jobs, errorJobs] = await getAllJobs();

	if (error || errorJobs) {
		return {
			barbers: [],
			jobs: [],
		};
	}

	return {
		barbers: barbers?.map((barber) => ({
			value: barber.id,
			label: barber.name,
		})),
		jobs: jobs?.map((job) => ({
			value: job.id,
			label: job.name,
		})),
		status: [
			{ value: "pending", label: "Pendente" },
			{ value: "confirmed", label: "Completo" },
			{ value: "canceled", label: "Cancelado" },
			{ value: "refunded", label: "Reembolsado" },
			{ value: "no_payed", label: "Não pago" },
		],
		paymentMethods: [
			{ value: "DINHEIRO", label: "Dinheiro" },
			{ value: "MERCADO_PAGO", label: "Mercado Pago" },
		],
	};
});
