import { Animation } from "@/src/components/animation";
import { DropdownUserMenu } from "@/src/components/dropdown-user-menu";
import { ModeToggle } from "@/src/components/mode-toggle";
import { Separator } from "@/src/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/src/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex justify-between sticky top-0 bg-sidebar h-16 shrink-0 items-center gap-2 px-4 z-10 overflow-x-hidden">
					<Animation
						delay={0.2}
						direction="left"
						className="flex items-center gap-2"
						once
					>
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
					</Animation>
					<Animation
						delay={0.2}
						direction="right"
						className="flex items-center gap-2"
						once
					>
						<ModeToggle />
						<DropdownUserMenu isAdmin={false} />
					</Animation>
				</header>
				<div className="bg-sidebar overflow-x-hidden">
					<div className="p-4 space-y-8 bg-background rounded-l-3xl">
						{children}
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
