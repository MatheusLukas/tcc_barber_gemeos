"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";

const itemsNav = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "Serviços",
		href: "/services",
	},
	{
		label: "Barbeiros",
		href: "/barbers",
	},
	{
		label: "Galeria",
		href: "/gallery",
	},
	{
		label: "Contato",
		href: "/contact",
	},
];

export function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		if (window.scrollY < 100) {
			window.scrollTo(0, 0);
		}
		function onScroll() {
			setIsScrolled(window.scrollY > 0);
		}
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	return (
		<motion.nav
			initial={{ opacity: 0, y: 50 }}
			whileInView={{
				opacity: 1,
				y: 0,
				transition: { duration: 0.3, delay: 0.4 },
			}}
			viewport={{ once: true, margin: "-64px" }}
			className={cn(
				"sticky top-0 z-50 flex flex-wrap items-center justify-between duration-500 border-b border-black h-20 transition-all w-full bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 bg-background/60",
				isScrolled ? "h-16" : "bg-transparent",
			)}
		>
			<div className="flex items-center justify-between w-full container">
				<Image
					className="size-16"
					src="/logo.svg"
					alt="Logo"
					width={100}
					height={100}
				/>
				<div className="flex items-center gap-4">
					{itemsNav.map((items) => (
						<div
							className="group flex justify-center flex-col transition-all"
							key={items.href}
						>
							<Link href={items.href}>{items.label}</Link>
							<hr className="w-0 group-hover:w-full  border-primary group-hover:bg-primary h-0.5 duration-500" />
						</div>
					))}
					<Button className="hover:scale-105 transition-transform group">
						Agendar <ArrowUpRight />
					</Button>

					<Button
						variant="secondary"
						className="hover:scale-105 transition-transform group"
						asChild
					>
						<Link href="/login">
							Login <User2 />
						</Link>
					</Button>

					<ModeToggle />
				</div>
			</div>
		</motion.nav>
	);
}
