import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/src/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/src/components/ui/input-otp";
import { queryClient } from "@/src/lib/query-client";
import { verifyPhone } from "@/src/server/verifyPhone";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
	open: boolean;
	onClose: () => void;
	email: string;
	phoneNumberUser: string;
	userId: string;
};

const schemaInputOtp = z.object({
	pin: z.string().min(6, {
		message: "Precisa ter 6 caracteres!",
	}),
});

type schemaInputOtpType = z.infer<typeof schemaInputOtp>;

export function ModalConfirmPhoneOtp({
	open,
	onClose,
	email,
	phoneNumberUser,
	userId,
}: Props) {
	const form = useForm<schemaInputOtpType>({
		resolver: zodResolver(schemaInputOtp),
	});

	const formId = useId();

	const onSubmit = async (data: schemaInputOtpType) => {
		const teste = await verifyPhone({
			phoneNumber: phoneNumberUser,
			code: data.pin,
			userId: userId,
		});

		if (teste[0]?.data) {
			queryClient.invalidateQueries(["getUser"]);
			toast.success("Telefone verificado com sucesso!");
			onClose();
		} else {
			if (teste[0]?.hasExpired) {
				toast.error("Código expirado!");
				onClose();
			} else {
				toast.error("Código inválido!");
			}
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Confirmação de Telefone</AlertDialogTitle>
					<AlertDialogDescription>
						Enviamos um email para: <span className="font-bold">{email}</span>{" "}
						com o código de verificação.
					</AlertDialogDescription>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-2/3 space-y-6"
							id={formId}
						>
							<FormField
								control={form.control}
								name="pin"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<InputOTP maxLength={6} {...field}>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />
												</InputOTPGroup>
												<InputOTPSeparator />
												<InputOTPGroup>
													<InputOTPSlot index={3} />
													<InputOTPSlot index={4} />
													<InputOTPSlot index={5} />
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										<FormDescription>
											Please enter the one-time password sent to your email.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
					<Button form={formId}>Continue</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
