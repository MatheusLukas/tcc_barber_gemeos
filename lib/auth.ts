import { sendEmailConfirm } from "@/app/server/sendEmail";
import { db } from "@/db"; // your drizzle instance
import { account, jwks, session, user, verification } from "@/db/schema";
import { sendEmailConfirmation } from "@/templates/confirm-email";
import { ResetPassword } from "@/templates/reset-password";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer, jwt } from "better-auth/plugins";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			user,
			account,
			session,
			verification,
			jwks,
		},
	}),
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 6,
		autoSignIn: false,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url }) => {
			await sendEmailConfirm({
				email: user.email,
				subject: "Resete sua senha",
				TemplateEmailHTML: ResetPassword({ name: user.name, url }),
			});
		},
	},
	emailVerification: {
		autoSignInAfterVerification: true,
		sendOnSignUp: true,
		sendVerificationEmail: async ({ user, url }) => {
			await sendEmailConfirm({
				email: user.email,
				subject: "Verifique seu email",
				TemplateEmailHTML: sendEmailConfirmation({ name: user.name, url }),
			});
		},
	},
	plugins: [
		jwt({
			jwks: {
				keyPairConfig: {
					alg: "EdDSA",
					crv: "Ed25519",
				},
			},
			jwt: {
				expirationTime: "10m",
			},
		}),
		bearer(),
		// phoneNumber({
		// 	sendOTP: async ({ phoneNumber, code }, request) => {
		// 		console.log(request, "teste aqui");
		// 		await sendEmailConfirm({
		// 			email: "matheuslukas636@gmail.com",
		// 			subject: "Verifique seu email",
		// 			TemplateEmailHTML: sendPhoneConfirmation({ phoneNumber, code }),
		// 		});
		// 	},
		// }),
	],
});
