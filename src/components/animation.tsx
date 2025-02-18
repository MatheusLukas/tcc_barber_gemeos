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
};

export function Animation({
	direction,
	children,
	delay = 0.3,
	duration = 0.4,
	margin = "-32px",
	once = false,
	className,
}: Props) {
	const directionMap = {
		up: { start: { y: -50 }, end: { y: 0 } },
		down: { start: { y: 50 }, end: { y: 0 } },
		left: { start: { x: -50 }, end: { x: 0 } },
		right: { start: { x: 50 }, end: { x: 0 } },
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
		>
			{children}
		</motion.div>
	);
}
