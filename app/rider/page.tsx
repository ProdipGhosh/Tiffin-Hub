import type { Metadata } from "next";
import RiderNavbar from "@/components/rider/RiderNavbar";
import RiderHero from "@/components/rider/RiderHero";
import RiderBenefits from "@/components/rider/RiderBenefits";
import RiderSteps from "@/components/rider/RiderSteps";
import RiderRegisterForm from "@/components/rider/RiderRegisterForm";
import RiderFAQ from "@/components/rider/RiderFAQ";
import RiderFooter from "@/components/rider/RiderFooter";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "Become a Delivery Partner — Tiffin Hub Rider Program",
  description:
    "Join Tiffin Hub as a delivery partner. Earn ₹800–₹1,500/day. Flexible hours, daily payouts, accident insurance, and free delivery kit. Apply today!",
  openGraph: {
    title: "Ride & Earn — Tiffin Hub Delivery Partner",
    description:
      "Flexible hours. Daily earnings. Full support. Join Tiffin Hub's rider partner network and start earning from your bike today.",
    type: "website",
  },
};

export default function RiderPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F0]">
      <RiderNavbar />
      <RiderHero />
      <RiderBenefits />
      <RiderSteps />
      <RiderRegisterForm />
      <RiderFAQ />
      <RiderFooter />
      <ScrollToTop />
    </main>
  );
}
