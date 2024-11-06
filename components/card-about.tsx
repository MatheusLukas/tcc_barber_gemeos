type Props = {
	title: string;
	description: string;
};

export function CardAbout({ title, description }: Props) {
	return (
		<div className="bg-muted p-6 min-h-56 rounded-md">
			<p className="text-2xl font-bold">{title}</p>
			<p className="text-muted-foreground text-balance">{description}</p>
		</div>
	);
}
