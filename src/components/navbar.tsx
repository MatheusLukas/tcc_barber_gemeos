"use client";
import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  handleCloseSheet,
} from "@/src/components/ui/sheet";
import { useSession } from "@/src/lib/auth-client";
import { cn } from "@/src/lib/utils";
import { ArrowUpRight, Menu, User2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Animation } from "./animation";
import { DropdownUserMenu } from "./dropdown-user-menu";
import { ModeToggle } from "./mode-toggle";
import { DialogTitle } from "./ui/dialog";

const itemsNav = [
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

type Props = {
  session: any;
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    if (window.scrollY < 100) {
      window.scrollTo(0, 0);
    }
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Animation
      direction="down"
      once
      className={cn(
        "sticky top-0 z-50 flex flex-wrap items-center justify-between duration-500 border-b border-black h-20 transition-all w-full bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 bg-background/60",
        isScrolled ? "h-16" : "bg-transparent"
      )}
    >
      <div className="flex items-center justify-between w-full container">
        <Link href="/">
          <Image
            className="size-16"
            src="/logo.svg"
            alt="Logo"
            width={100}
            height={100}
          />
        </Link>
        <div className="md:block hidden">
          <NavbarDesktop session={session} />
        </div>
        <div className="md:hidden block">
          <NavbarMobile session={session} />
        </div>
      </div>
    </Animation>
  );
}

function NavbarDesktop({ session }: Props) {
  return (
    <div className="flex items-center gap-4">
      {itemsNav.map((items) => (
        <div
          className="group flex justify-center flex-col transition-all"
          key={items.href}
        >
          <Link href={items.href}>{items.label}</Link>
          <hr className="w-0 group-hover:w-full  border-primary group-hover:bg-primary h-0.5 duration-500" />
        </div>
      ))}
      <Button asChild className="hover:scale-105 transition-transform group">
        <Link href="/schedule">
          Agendar <ArrowUpRight />
        </Link>
      </Button>
      <div className={cn(session ? "order-1" : "order-2")}>
        <ModeToggle />
      </div>
      <div className={cn(session ? "order-2" : "order-1")}>
        <ButtonLogin />
      </div>
    </div>
  );
}

function NavbarMobile({ session }: Props) {
  function navigationClick(link: string) {
    const href = document.getElementById(link);
    href?.scrollIntoView({
      behavior: "smooth",
    });
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
          <span className="sr-only">Abrir/Fechar Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pl-0 w-screen md:hidden">
        <DialogTitle />
        <div className="flex flex-col gap-8 items-center justify-center h-full">
          {itemsNav?.map((item) => (
            <button
              key={item.href}
              type="button"
              className="text-2xl font-bold"
              onClick={() => {
                handleCloseSheet();
                navigationClick(item.href);
              }}
            >
              {item.label}
            </button>
          ))}
          <Button className="hover:scale-105 transition-transform group">
            Agendar <ArrowUpRight />
          </Button>
          <div className={cn(session ? "order-1" : "order-2")}>
            <ModeToggle />
          </div>
          <div className={cn(session ? "order-2" : "order-1")}>
            <ButtonLogin />
          </div>
        </div>
        <SheetClose className="absolute top-8 right-8">
          <X className="size-6" />
          <span className="sr-only">Fechar</span>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}

function ButtonLogin() {
  const { data: session } = useSession();
  return !session ? (
    <Button
      variant="secondary"
      className="hover:scale-105 transition-transform group"
      asChild
    >
      <Link href="/login">
        Login <User2 />
      </Link>
    </Button>
  ) : (
    <DropdownUserMenu />
  );
}
