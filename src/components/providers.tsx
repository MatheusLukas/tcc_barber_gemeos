"use client";
import { ourFileRouter } from "@/src/app/api/uploadthing/core";
import { queryClient } from "@/src/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { NuqsAdapter } from "nuqs/adapters/next/app";
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
					<NuqsAdapter>{children}</NuqsAdapter>
				</ThemeProvider>
				<Toaster />
				<ReactQueryDevtools client={queryClient} initialIsOpen={true} />
			</QueryClientProvider>
		</main>
	);
}
