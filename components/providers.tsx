import { ourFileRouter } from "@/app/api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Toaster } from "sonner";
import { extractRouterConfig } from "uploadthing/server";
import { ThemeProvider } from "../components/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<main>
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
		</main>
	);
}
