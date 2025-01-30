"use client";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { extractRouterConfig } from "uploadthing/server";
import { ThemeProvider } from "../components/theme-provider";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<main>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					disableTransitionOnChange
					enableSystem
				>
					<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
					{children}
				</ThemeProvider>
				<Toaster />
			</QueryClientProvider>
		</main>
	);
}
