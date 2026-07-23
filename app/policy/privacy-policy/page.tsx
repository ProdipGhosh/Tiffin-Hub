"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { X, FileText, XCircle, RotateCcw, ScrollText, ShieldCheck } from "lucide-react";

const policyLinks = [
  { label: "Privacy Policy",       href: "/policy/privacy-policy",      icon: ShieldCheck },
  { label: "Cancellation Policy",  href: "/policy/cancellation-policy", icon: XCircle     },
  { label: "Refund Policy",        href: "/policy/refund-policy",       icon: RotateCcw   },
  { label: "Terms of Use",         href: "/policy/terms-of-use",        icon: ScrollText  },
];

export default function PrivacyPolicyPage() {
  const pathname = usePathname();
  const router = useRouter();

  const handleClose = () => {
    window.location.replace("/");
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* ── Top Navbar ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="w-full px-4 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/icon.png" alt="Tiffin Hub" width={36} height={36} className="rounded-full" />
            <span className="font-bold text-lg text-stone-800">
              Tiffin<span className="text-orange-500">Hub</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {policyLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? "bg-orange-50 text-orange-600 border border-orange-200"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleClose}
            className="flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg transition-all shrink-0 cursor-pointer"
            title="Close policy and return home"
          >
            <X size={16} /> Close
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1" style={{ height: "calc(100vh - 56px)" }}>

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-52 shrink-0 bg-white border-r border-gray-200">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Guidelines &amp; Policies
            </p>
          </div>
          <ul className="py-2">
            {policyLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-all duration-150 ${
                      isActive
                        ? "bg-orange-50 text-orange-600 font-semibold border-l-4 border-orange-500"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
                    }`}
                  >
                    <Icon size={16} className={isActive ? "text-orange-500" : "text-gray-400"} />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main: PDF fills remaining space */}
        <main className="flex-1 flex flex-col overflow-hidden bg-white">

          {/* Mobile tabs */}
          <div className="lg:hidden flex gap-2 overflow-x-auto px-4 pt-3 pb-2 border-b border-gray-100">
            {policyLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}
                  className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap border transition-all ${
                    isActive ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* PDF bar */}
          <div className="flex items-center gap-3 px-5 py-2 border-b border-gray-100 shrink-0">
            <div className="w-7 h-7 bg-orange-100 rounded-md flex items-center justify-center">
              <FileText size={14} className="text-orange-500" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-gray-800">Tiffin Hub Privacy Policy v1.0</p>
              <p className="text-xs text-gray-400">PDF Document</p>
            </div>
            <a href="/privacy-policy.pdf" download
              className="ml-auto flex items-center gap-1.5 text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              ⬇ Download PDF
            </a>
          </div>

          {/* PDF viewer — overflow:hidden clips dark side bars from Chrome PDF viewer */}
          <div className="flex-1 overflow-hidden relative bg-white">
            <iframe
              src="/privacy-policy.pdf#toolbar=0&navpanes=0&scrollbar=1&zoom=page-width"
              title="Tiffin Hub Privacy Policy"
              style={{
                position: "absolute",
                top: 0,
                left: "-60px",
                width: "calc(100% + 120px)",
                height: "100%",
                border: "none",
                background: "white",
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
