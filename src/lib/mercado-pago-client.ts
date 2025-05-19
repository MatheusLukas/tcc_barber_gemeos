import { MercadoPagoConfig } from "mercadopago";

export const mpClient = new MercadoPagoConfig({
	accessToken: process.env.MP_ACESS_TOKEN!,
	options: { timeout: 5000 },
});

export const paymentMethodsConfig = {
	excluded_payment_types: [],
	installments: 1,
	excluded_payment_methods: [
		{
			id: "bolbradesco",
		},
		{
			id: "pec",
		},
	],
};
