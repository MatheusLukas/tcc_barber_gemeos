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
  return (
    <div className="container flex flex-row justify-around p-8">
      <div className="flex justify-center flex-col">
        <Image
          className="size-16"
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={100}
        />
        <div className="flex flex-row gap-5">
          {iconsLink.map((item) => (
            <Link href={item.href}>
              <item.icon className="md:size-6 size-5 text-black hover:scale-125 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-row gap-10">
        <div>
          <p className="font-bold">Corporativo</p>
          {itemsFooter.map((items) => (
            <div
              className="group flex justify-center flex-col"
              key={items.href}
            >
              <Link href={items.href}>{items.label}</Link>
              <hr className="w-0 border-primary  h-0.5 " />
            </div>
          ))}
        </div>
        <div>
          <p className="font-bold">Entre em contato</p>
          <p>WhatsApp</p>
          <p>(11)9999-9999</p>
          <div>_________________________</div>
          <p>Email</p>
          <p>mach1@mach1.com</p>
        </div>
      </div>
    </div>
  );
}
