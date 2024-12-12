import { Resend } from "resend";

type EmailOptions = {
	to: string;
	from: string;
	subject: string;
	html: string;
};

export async function sendEmail(options: EmailOptions) {
	const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API);
	return await resend.emails.send(options);
}
