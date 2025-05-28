import { Animation } from "@/src/components/animation";
import { Button } from "@/src/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ResetFilters() {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	return (
		<Animation once direction="up">
			<Button
				onClick={() => {
					router.push(pathname);
				}}
				disabled={params.size === 0}
			>
				Resetar Filtros
			</Button>
		</Animation>
	);
}
