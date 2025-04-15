"use client";
import { CircleUserRound, LockKeyhole, LogOut } from "lucide-react";
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

type Props = {
	isAdmin: boolean;
};

export function DropdownUserMenu({ isAdmin }: Props) {
	const router = useRouter();

	const handleLogout = () => {
		router.push("/logout");
	};

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
				{isAdmin && (
					<DropdownMenuItem onClick={() => router.push("/admin")}>
						<LockKeyhole size={20} />
						<span>Admin</span>
					</DropdownMenuItem>
				)}
				<DropdownMenuItem onClick={handleLogout}>
					<LogOut size={20} />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
