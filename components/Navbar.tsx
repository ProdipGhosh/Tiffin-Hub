"use client";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, UserCheck } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },

  { label: "Order", href: "#order" },
  { label: "About", href: "#about" },

  { label: "Why Us", href: "#features" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (pathname !== "/") return;
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const s of sections.reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const handleNav = (href: string) => {
    setOpen(false);
    if (pathname !== "/") {
      router.push("/" + href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg shadow-orange-100/50 border-b border-orange-100" : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav("#home")}
            className="flex items-center gap-2 group"
          >
            <Image src="/icon.png" alt="TiffinHub Logo" width={80} height={80} className="rounded-full" />
            <span className="font-bold text-xl text-orange-600 group-hover:text-orange-700 transition-colors">
              Tiffin<span className="text-rose-600">Hub</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${active === link.href.slice(1)
                    ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                    : scrolled ? "text-stone-600 hover:text-orange-600 hover:bg-orange-50" : "text-stone-100 hover:text-orange-600 hover:bg-orange-50"
                  }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="/partner"
              className="hidden md:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-md shadow-orange-200 hover:shadow-orange-300 hover:scale-105"
            >
              <UserCheck size={16} />
               Become a Food Partner
            </a>
            <button
              className="md:hidden p-2 rounded-lg text-stone-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-orange-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${active === link.href.slice(1)
                    ? "bg-orange-500 text-white"
                    : "text-stone-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="/partner"
              className="w-full flex items-center justify-center gap-2 mt-2 bg-orange-500 text-white py-3 rounded-xl font-semibold text-sm"
            >
              < UserCheck size={16} />  Become a Food Partner
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}