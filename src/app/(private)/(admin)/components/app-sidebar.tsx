import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import { Calendar, Home, Package, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const items = [
	{
		title: "Home",
		url: "/admin",
		icon: Home,
	},
	{
		title: "Profissionais",
		url: "/admin/collaborators",
		icon: Users,
	},
	{
		title: "Agenda",
		url: "/admin/schedule",
		icon: Calendar,
	},
	{
		title: "Estoque",
		url: "/admin/stock",
		icon: Package,
	},
	// {
	// 	title: "Configurações",
	// 	url: "#",
	// 	icon: Settings,
	// },
];

export function AppSidebar() {
	return (
		<Sidebar className="border-none" collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild className="h-full">
							<Link href="/">
								<Image
									className="size-16"
									src="/logo.svg"
									alt="Logo"
									width={100}
									height={100}
								/>
								<span className="font-bold text-xl">Gêmeos Barber</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item, idx) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
