import { phoneNumberClient } from "better-auth/client/plugins";
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
} = createAuthClient({
	baseURL: "http://localhost:3000/",
	plugins: [phoneNumberClient()],
});
