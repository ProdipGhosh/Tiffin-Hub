"use client";
import Image from "next/image";
import Link from "next/link";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/constants";
import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";

const socials = [
  { icon: Facebook, href: SOCIAL_LINKS.facebook, label: "Facebook" },
  { icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
  { icon: Twitter, href: SOCIAL_LINKS.twitter, label: "Twitter" },
  { icon: MessageCircle, href: SOCIAL_LINKS.whatsapp, label: "WhatsApp" },
];

const riderLinks = [
  { href: "#benefits", label: "Benefits" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#register", label: "Apply Now" },
  { href: "#faq", label: "FAQ" },
];

export default function RiderFooter() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-10 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/icon.png" alt="TiffinHub Logo" width={80} height={80} className="rounded-full" />
              <div>
                <span className="font-bold text-xl text-white">Tiffin<span className="text-orange-400">Hub</span></span>
                <div className="text-xs text-orange-400">Rider Partner Program</div>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-5">
              Empowering delivery riders across Kolkata and surrounding areas to build a steady income — with flexibility, daily payouts, and full support.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 bg-stone-800 hover:bg-orange-500 rounded-xl flex items-center justify-center transition-all hover:scale-110">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Rider Portal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => document.querySelector("#benefits")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-stone-400 hover:text-orange-400 transition-colors">Benefits</button>
              </li>
              <li>
                <button onClick={() => document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-stone-400 hover:text-orange-400 transition-colors">How It Works</button>
              </li>
              <li>
                <Link href="/rider/register" className="text-orange-400 font-semibold hover:text-orange-300 transition-colors">
                  Apply Now →
                </Link>
              </li>
              <li>
                <button onClick={() => document.querySelector("#faq")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-stone-400 hover:text-orange-400 transition-colors">FAQ</button>
              </li>
              <li><Link href="/partner" className="text-stone-400 hover:text-pink-400 transition-colors">← Food Partner</Link></li>
              <li><a href="/" className="text-stone-400 hover:text-orange-400 transition-colors">← Back to Main Site</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-2">
                <span>📞</span>
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`} className="hover:text-orange-400 transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>✉️</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-orange-400 transition-colors break-all">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>{CONTACT_INFO.serviceArea}</span>
              </li>
              <li className="flex items-start gap-2">
                <span>⏰</span>
                <span className="whitespace-pre-line">{CONTACT_INFO.businessHours}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Tiffin Hub. All rights reserved.</p>
          <p className="flex items-center gap-1">Empowering riders, one delivery at a time <span className="text-orange-400">🛵</span></p>
        </div>
      </div>
    </footer>
  );
}
