import * as motion from "framer-motion/client";
import { Comments } from "./comments";
import { Gallery } from "./gallery";

export function CommentsAndGallery() {
	return (
		<motion.div
			initial={{ opacity: 0, x: 50 }}
			whileInView={{
				opacity: 1,
				x: 0,
				transition: { duration: 0.3, delay: 0.2 },
			}}
			viewport={{ once: true, margin: "-64px" }}
			className="container mt-28 space-y-4 my-20"
		>
			<p className="text-3xl font-bold text-center sm:text-start">
				Comentários e Galeria
			</p>
			<div className="grid grid-cols-[4fr_8fr] gap-8 h-[600px] ">
				<Comments />
				<Gallery />
			</div>
		</motion.div>
	);
}
