import { Star } from "lucide-react"; // ou outro ícone de sua preferência

interface RatingDisplayProps {
	rating: number;
}

export function RatingStar({ rating }: RatingDisplayProps) {
	const totalStars = 5;
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 !== 0;

	return (
		<div className="flex">
			{[...Array(fullStars)].map((_, i) => (
				<Star
					key={`full-${i}`}
					className="fill-yellow-400 text-yellow-400"
					size={16}
				/>
			))}

			{hasHalfStar && (
				<div className="relative">
					<Star className="text-gray-200" size={16} />
					<div className="absolute top-0 left-0 w-1/2 overflow-hidden">
						<Star className="fill-yellow-400 text-yellow-400" size={16} />
					</div>
				</div>
			)}

			{[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map(
				(_, i) => (
					<Star key={`empty-${i}`} className="text-gray-200" size={16} />
				),
			)}
		</div>
	);
}
