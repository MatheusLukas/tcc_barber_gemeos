import { PhoneMissed } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertPhoneNotVerified() {
	return (
		<Alert variant="destructive" className="my-8 animate-fade-down delay-500">
			<PhoneMissed className="h-4 w-4" />
			<AlertTitle>Verifique seu número de celular!</AlertTitle>
			<AlertDescription>
				Verifique seu número de celular para conseguir agendar seus cortes!.
			</AlertDescription>
		</Alert>
	);
}
