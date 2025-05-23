import Image from "next/image";
import Link from "next/link";
import { Icons } from "./icons";

const itemsFooter = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Serviços",
    href: "/services",
  },
  {
    label: "Barbeiros",
    href: "/barbers",
  },
  {
    label: "Galeria",
    href: "/gallery",
  },
  {
    label: "Contato",
    href: "/contact",
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

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="container flex md:flex-row flex-col justify-between p-8">
        <div className="flex justify-center flex-col items-center gap-5">
          <Image
            className="size-28"
            src="/logo.svg"
            alt="Logo"
            width={1920}
            height={1080}
          />
          <div className="flex flex-row gap-5">
            {iconsLink.map((item) => (
              <Link href={item.href} key={item.href}>
                <item.icon className="md:size-6 hover:text-primary size-5 text-foreground hover:scale-125 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex md:flex-row max-md:items-center flex-col gap-10">
          <div className="space-y-1">
            <p className="font-bold">Corporativo</p>
            {itemsFooter.map((items) => (
              <div className="flex justify-center flex-col" key={items.href}>
                <Link className="max-md:text-center" href={items.href}>
                  {items.label}
                </Link>
              </div>
            ))}
          </div>
          <div className="space-y-1 *:max-md:text-center">
            <p className="font-bold">Entre em contato</p>
            <p>WhatsApp</p>
            <span className="flex items-center gap-2">
              <Icons.Whatsapp className="size-5" />
              (11)9999-9999
            </span>
            <hr className="w-full h-0.5 bg-foreground" />
            <span className="flex items-center gap-2">
              <Icons.Email className="size-5" /> Email
            </span>
            <p>mach1@mach1.com</p>
          </div>
        </div>
      </div>
      <div className="container flex items-center justify-between gap-5 p-5 text-primary-foreground">
        <p>Barbearia Gemeos ©{currentYear} Company Name. All rights reserved</p>
        <div className="flex flex-row gap-5">
          <p>Privacy & Policy</p>
          <p>Terms & Condition</p>
        </div>
      </div>
    </>
  );
}
