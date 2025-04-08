import { db } from "@/src/db";
import { account, session, user, verification } from "@/src/db/schema";
import { sendEmailConfirm } from "@/src/server/sendEmail";
import { sendEmailConfirmation } from "@/src/templates/confirm-email";
import { sendPhoneConfirmation } from "@/src/templates/confirm-phone";
import { ResetPassword } from "@/src/templates/reset-password";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, phoneNumber } from "better-auth/plugins";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			user,
			account,
			session,
			verification,
		},
	}),
	user: {
		additionalFields: {
			phoneNumber: {
				type: "string",
			},
			phoneNumberVerified: {
				type: "boolean",
			},
		},
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
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
		phoneNumber({
			sendOTP: async ({ phoneNumber, code }) => {
				await sendEmailConfirm({
					email: "matheuslukas636@gmail.com",
					subject: "Verifique seu email",
					TemplateEmailHTML: sendPhoneConfirmation({ phoneNumber, code }),
				});
			},
		}),
		admin({
			defaultRole: "user",
		}),
	],
});

export type Session = typeof auth.$Infer.Session;
