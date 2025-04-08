import { Animation } from "@/src/components/animation";
import { Icons } from "@/src/components/icons";
import Link from "next/link";

const itemsContact = [
	{
		icon: Icons.Whatsapp,
		label: "Fale com a gente",
		text: "+55 11 99999-9999",
	},
	{
		icon: Icons.AdressLocation,
		label: "Nosso endereço",
		text: "Av. Professor Flávio Pires de Camargo, 849 - Caetetuba",
	},
	{
		icon: Icons.Cloack,
		label: "Horarios",
		text: "Seg - Sex 9:00h as 17:30h",
		moreText: "Sábado: 9:00h as 13:00h",
	},
];

const iconsLink = [
	{
		icon: Icons.Instagram,
		href: "https://www.instagram.com",
	},
	{
		icon: Icons.Facebook,
		href: "https://www.facebook.com",
	},
	{
		icon: Icons.Twitter,
		href: "https://www.twitter.com",
	},
	{
		icon: Icons.TikTok,
		href: "https://www.tiktok.com",
	},
];

export function Contact() {
	return (
		<Animation
			once
			margin="0px"
			direction="down"
			delay={0.3}
			className="w-full bg-background border-b"
		>
			<div className="lg:container grid grid-cols-4 divide-x-2 items-center">
				{itemsContact.map((item, idx) => (
					<div
						key={item.label}
						className="flex items-center md:justify-center justify-start p-4 flex-col md:min-h-28 h-full"
					>
						<Animation
							once
							margin="0px"
							direction="down"
							delay={0.3 + idx * 0.1}
							className="flex md:flex-row flex-col items-center gap-2"
						>
							<item.icon className="md:size-6 size-5 text-primary" />
							<p className="font-medium md:text-base text-sm text-center">
								{item.label}
							</p>
						</Animation>
						<Animation
							once
							margin="0px"
							direction="down"
							delay={0.4 + idx * 0.1}
						>
							<p className="md:text-sm text-xs text-center text-balance">
								{item.text}
							</p>
						</Animation>

						{item.moreText && (
							<Animation
								once
								margin="0px"
								direction="down"
								delay={0.4 + idx * 0.1}
							>
								<p className="md:text-sm text-xs text-center">
									{item.moreText}
								</p>
							</Animation>
						)}
					</div>
				))}
				<div className="flex md:flex-row flex-col items-center justify-between p-4 md:min-h-28 h-full bg-primary gap-6">
					{iconsLink.map((item, idx) => (
						<Animation
							once
							key={item.href}
							margin="0px"
							direction="down"
							delay={0.4 + idx * 0.1}
						>
							<Link href={item.href}>
								<item.icon className="md:size-6 size-5 text-white hover:scale-125 transition-transform" />
							</Link>
						</Animation>
					))}
				</div>
			</div>
		</Animation>
	);
}
