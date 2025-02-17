"use client";
import { signOut } from "@/src/lib/auth-client";
import { CircleUserRound, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function DropdownUserMenu() {
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Meu perfil</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => router.push("/account")}>
					<CircleUserRound size={20} />
					<span>Conta</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={async () => {
						await signOut({
							fetchOptions: {
								onSuccess() {
									router.push("/");
								},
							},
						});
					}}
				>
					<LogOut size={20} />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
