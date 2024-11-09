import * as motion from "framer-motion/client";
import Link from "next/link";
import { Icons } from "./icons";

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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, delay: 0.2 },
      }}
      viewport={{ once: true, margin: "-64px" }}
      className="w-full bg-background border-b"
    >
      <div className="container grid grid-cols-4 divide-x-2 items-center">
        {itemsContact.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-center p-4 flex-col min-h-28"
          >
            <div className="flex items-center gap-2">
              <item.icon className="size-6 text-primary" />
              <p className="font-medium">{item.label}</p>
            </div>
            <p className="text-sm text-center">{item.text}</p>
            {item.moreText && <p className="text-sm">{item.moreText}</p>}
          </div>
        ))}
        <div className="flex items-center justify-center p-4 min-h-28 bg-primary gap-6">
          {iconsLink.map((item) => (
            <Link key={item.href} href={item.href}>
              <item.icon className="size-6 text-white hover:scale-125 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
