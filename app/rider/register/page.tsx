import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import RiderRegisterForm from "@/components/rider/RiderRegisterForm";

export const metadata: Metadata = {
  title: "Rider Registration — Tiffin Hub Delivery Partner",
  description:
    "Register as a Tiffin Hub delivery partner. Fill in your personal details, vehicle information, and upload required documents to start earning today.",
};

export default function RiderRegisterPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F0]">
      {/* Minimal Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-sm border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/rider" className="flex items-center gap-2">
            <Image src="/icon.png" alt="TiffinHub Logo" width={40} height={40} className="rounded-full" />
            <div>
              <span className="font-bold text-base text-orange-600">Tiffin<span className="text-rose-600">Hub</span></span>
              <div className="text-xs text-orange-500 font-medium -mt-0.5 hidden sm:block">Rider Registration</div>
            </div>
          </Link>
          <Link href="/rider/login"
            className="px-4 py-2 rounded-full text-sm font-semibold text-orange-600 border border-orange-300 hover:bg-orange-50 transition-all">
            Login
          </Link>
        </div>
      </nav>
      <div className="pt-16">
        <RiderRegisterForm />
      </div>
    </main>
  );
}
