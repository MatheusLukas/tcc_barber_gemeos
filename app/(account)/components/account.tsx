"use client";
import { useSession } from "@/lib/auth-client";
import * as motion from "framer-motion/client";
import Image from "next/image";
import { EditButton } from "./editButton";

export function Account() {
	const { data } = useSession();
	//TODO: criar uma page para redirecionar para o comeco
	if (!data) return null;
	const user = data.user;
	console.log(user, "user");

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{
				opacity: 1,
				y: 0,
				transition: { duration: 0.5, delay: 0.2 },
			}}
			viewport={{ once: true, margin: "-64px" }}
			className="container mt-10"
		>
			<p className="text-4xl font-bold">Sua conta</p>

			<div className="flex flex-col gap-2 mt-6">
				<p className="font-bold">
					Nome: <span className="font-normal">John doe</span>
				</p>
				{user.image ? (
					<div>
						<Image
							src={user.image}
							alt={user.name}
							width={1920}
							height={1080}
							className="size-48 rounded-full relative"
						/>
						<EditButton userId={user.id} />
					</div>
				) : (
					<div className="size-48 rounded-full bg-muted relative group">
						<p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl">
							{user.name[0].toUpperCase()}
						</p>
					</div>
				)}
			</div>
		</motion.div>
	);
}
