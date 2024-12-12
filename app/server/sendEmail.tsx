"use server";

import { sendEmail } from "@/utils/email";

type Props = {
	TemplateEmailHTML: string;
	email: string;
	subject: string;
};

export const sendEmailConfirm = async ({
	TemplateEmailHTML,
	email,
	subject,
}: Props) => {
	const dataEmail = await sendEmail({
		to: email,
		html: TemplateEmailHTML,
		subject: subject,
		from: "Acme <onboarding@resend.dev>",
	});
	return dataEmail;
};
