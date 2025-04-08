import { getSession } from "@/src/lib/auth-client";
import { createServerAction } from "zsa";

export const getSessionServer = createServerAction().handler(async () => {
	return await getSession();
});
