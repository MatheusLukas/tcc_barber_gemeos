import { Animation } from "./animation";
import { Comments } from "./comments";
import { Gallery } from "./gallery";

export function CommentsAndGallery() {
	return (
		<Animation
			direction="down"
			once
			className="container mt-28 space-y-4 my-20"
		>
			<p className="text-3xl font-bold text-center sm:text-start">
				Comentários e Galeria
			</p>
			<div className="grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-8 lg:h-[600px] h-[1000px] ">
				<Comments />
				<Gallery />
			</div>
		</Animation>
	);
}
