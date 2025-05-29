import { getSessionCookie } from "better-auth";
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
	{
		path: "/logout",
		whenAuthenticated: "next",
	},
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export default async function authMiddleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const searchParams = new URLSearchParams(request.nextUrl.search);
	const publicRoute = publicRoutes.find((route) => route.path === pathname);
	const redirectUrl = request.nextUrl.clone();
	const sessionCookie = getSessionCookie(request);

	if (pathname === "/reset-password" && !searchParams.has("token")) {
		redirectUrl.pathname = "/";
		return NextResponse.redirect(redirectUrl.href);
	}

	if (!sessionCookie && publicRoute) {
		return NextResponse.next();
	}

	if (!sessionCookie && !publicRoute) {
		redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
		return NextResponse.redirect(redirectUrl.href);
	}

	if (
		sessionCookie &&
		publicRoute &&
		publicRoute.whenAuthenticated === "redirect"
	) {
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
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|public).*)",
	],
};
