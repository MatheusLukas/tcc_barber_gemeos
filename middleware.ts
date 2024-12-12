import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { type NextRequest, NextResponse } from "next/server";

export default async function authMiddleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				cookie: request.headers.get("cookie") || "",
			},
		},
	);

	console.log(session);

	if (
		session &&
		(pathname.startsWith("/login") || pathname.startsWith("/register"))
	) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}
