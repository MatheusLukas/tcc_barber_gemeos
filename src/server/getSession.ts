import { getSession } from "@/src/lib/auth-client";

export async function getSessionServer() {
	const session = await getSession();
	return session;
}
