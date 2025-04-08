import { cn } from "@/src/lib/utils";
import * as motion from "framer-motion/client";
import type { ReactNode } from "react";

type Props = {
	direction: "up" | "down" | "left" | "right";
	children: ReactNode;
	once?: boolean;
	margin?: string;
	duration?: number;
	delay?: number;
	className?: string;
	from?: number;
};

export function Animation({
	direction,
	children,
	delay = 0.3,
	duration = 0.4,
	margin = "-32px",
	once = false,
	className,
	from = 50,
	...props
}: Props) {
	const directionMap = {
		up: { start: { y: -from }, end: { y: 0 } },
		down: { start: { y: from }, end: { y: 0 } },
		left: { start: { x: -from }, end: { x: 0 } },
		right: { start: { x: from }, end: { x: 0 } },
	};

	return (
		<motion.div
			initial={{ opacity: 0, ...directionMap[direction].start }}
			whileInView={{
				opacity: 1,
				...directionMap[direction].end,
				transition: { duration, delay },
			}}
			viewport={{ once, margin }}
			className={cn(className)}
			{...props}
		>
			{children}
		</motion.div>
	);
}
