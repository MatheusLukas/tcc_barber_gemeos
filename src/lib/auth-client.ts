import { adminClient, phoneNumberClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const {
	signIn,
	signUp,
	signOut,
	useSession,
	getSession,
	verifyEmail,
	resetPassword,
	forgetPassword,
	phoneNumber,
} = createAuthClient({
	baseURL: process.env.BETTER_AUTH_URL,
	plugins: [phoneNumberClient(), adminClient()],
});
