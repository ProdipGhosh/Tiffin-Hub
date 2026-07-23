"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Benefits", href: "#benefits" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Register", href: "#register" },
  { label: "FAQ", href: "#faq" },
];

export default function RiderNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg border-b border-orange-100" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/rider" className="flex items-center gap-2 group">
            <Image src="/icon.png" alt="TiffinHub Logo" width={80} height={80} className="rounded-full" />
            <div>
              <span className="font-bold text-lg text-orange-600">Tiffin<span className="text-rose-600">Hub</span></span>
              <div className="hidden sm:block text-xs text-orange-500 font-medium -mt-0.5">Rider Partner Program</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <button key={l.href} onClick={() => go(l.href)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  l.label === "Register"
                    ? "bg-orange-500 text-white shadow-md hover:bg-orange-600"
                    : "text-stone-600 hover:text-orange-600 hover:bg-orange-50"
                }`}>
                {l.label}
              </button>
            ))}
            <Link href="/rider/login"
              className="ml-2 px-4 py-2 rounded-full text-sm font-medium border border-orange-300 text-orange-600 hover:bg-orange-50 transition-all">
              Login
            </Link>
          </div>

          <button className="md:hidden p-2 rounded-lg text-stone-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
            onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-orange-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((l) => (
              <button key={l.href} onClick={() => go(l.href)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  l.label === "Register"
                    ? "bg-orange-500 text-white"
                    : "text-stone-600 hover:bg-orange-50 hover:text-orange-600"
                }`}>
                {l.label}
              </button>
            ))}
            <Link href="/rider/login"
              className="w-full block text-center px-4 py-3 rounded-xl text-sm font-medium border border-orange-200 text-orange-600 hover:bg-orange-50 transition-all">
              Login to Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
