"use server";
import { mpClient, paymentMethodsConfig } from "@/src/lib/mercado-pago-client";
import { Preference } from "mercadopago";
import z from "zod";
import { createServerAction } from "zsa";

export const createOrder = createServerAction()
	.input(
		z.object({
			priceTotal: z.number(),
			email: z.string(),
			firstName: z.string(),
			items: z.array(
				z.object({
					categoryId: z.string(),
					description: z.string(),
					quantity: z.number(),
					unitPrice: z.number(),
				}),
			),
		}),
	)
	.handler(async ({ input }) => {
		const preference = new Preference(mpClient);

		const { init_point } = await preference.create({
			body: {
				items: input.items.map((item) => ({
					id: item.categoryId,
					title: item.description,
					quantity: item.quantity,
					unit_price: item.unitPrice,
					currency_id: "BRL",
				})),
				payment_methods: paymentMethodsConfig,
				payer: {
					email: input.email,
					name: input.firstName,
				},
			},
		});

		return init_point;
	});
