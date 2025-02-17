import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { type NextRequest, NextResponse } from "next/server";

const publicRoutes = [
	{
		path: "/login",
		whenAuthenticated: "redirect",
	},
	{
		path: "/register",
		whenAuthenticated: "redirect",
	},
	{
		path: "/",
		whenAuthenticated: "next",
	},
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export default async function authMiddleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const searchParams = new URLSearchParams(request.nextUrl.search);
	const publicRoute = publicRoutes.find((route) => route.path === pathname);
	const redirectUrl = request.nextUrl.clone();
	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				cookie: request.headers.get("cookie") || "",
			},
		},
	);

	if (pathname === "/reset-password" && !searchParams.has("token")) {
		redirectUrl.pathname = "/";
		return NextResponse.redirect(redirectUrl.href);
	}

	if (!session && publicRoute) {
		return NextResponse.next();
	}

	if (!session && !publicRoute) {
		redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
		return NextResponse.redirect(redirectUrl.href);
	}

	if (session && publicRoute && publicRoute.whenAuthenticated === "redirect") {
		redirectUrl.pathname = "/";
		return NextResponse.redirect(redirectUrl.href);
	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*.svg$).*)",
	],
};
// É esse matcher q ta fodendo a minha logo em svg
