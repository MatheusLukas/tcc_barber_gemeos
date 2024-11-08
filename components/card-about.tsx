type Props = {
	title: string;
	description: string;
};

export function CardAbout({ title, description }: Props) {
	return (
		<div className="bg-muted p-6 min-h-56 rounded-md space-y-2">
			<p className="text-2xl font-bold">{title}</p>
			<p className="text-muted-text text-balance">{description}</p>
		</div>
	);
}
