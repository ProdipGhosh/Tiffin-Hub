import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { 
  Shield, 
  Database, 
  CreditCard, 
  Share2, 
  Lock, 
  History, 
  UserCheck, 
  UserX, 
  Bell, 
  Cookie, 
  ExternalLink, 
  RefreshCw, 
  Mail, 
  CheckCircle,
  FileText
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Tiffin Hub",
  description:
    "Read the Privacy Policy for the Tiffin Hub mobile application. Learn how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy — Tiffin Hub",
    description: "Learn how Tiffin Hub handles and secures your personal and order data.",
    type: "website",
  },
};

const policySections = [
  { id: "collect", title: "1. Information We Collect", icon: Database },
  { id: "use", title: "2. How We Use Your Information", icon: Shield },
  { id: "payment", title: "3. Payment Information", icon: CreditCard },
  { id: "sharing", title: "4. Information Sharing", icon: Share2 },
  { id: "security", title: "5. Data Security", icon: Lock },
  { id: "retention", title: "6. Data Retention", icon: History },
  { id: "rights", title: "7. Your Rights", icon: UserCheck },
  { id: "children", title: "8. Children's Privacy", icon: UserX },
  { id: "notifications", title: "9. Notifications", icon: Bell },
  { id: "cookies", title: "10. Cookies and Analytics", icon: Cookie },
  { id: "third-party", title: "11. Third-Party Services", icon: ExternalLink },
  { id: "changes", title: "12. Changes to This Privacy Policy", icon: RefreshCw },
  { id: "contact", title: "13. Contact Us", icon: Mail },
  { id: "consent", title: "14. Consent", icon: CheckCircle },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#FFF9F0]">
      <Navbar />

      {/* Hero Header Section */}
      <section className="hero-bg pt-32 pb-16 text-center border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <FileText size={14} />
            Legal Document
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-stone-600 max-w-xl mx-auto text-base md:text-lg mb-2">
            Tiffin Hub Mobile Application
          </p>
          <div className="text-stone-500 text-sm font-medium">
            <span>Effective Date: </span>
            <span className="bg-orange-50 text-orange-600 px-2.5 py-1 rounded-md border border-orange-100 font-semibold">
              29 June 2026
            </span>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-10">
          
          {/* Table of Contents - Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-orange-100 shadow-sm max-h-[calc(100vh-8rem)] overflow-y-auto">
              <h3 className="text-stone-900 font-bold mb-4 text-sm uppercase tracking-wider border-b border-orange-100 pb-2">
                Table of Contents
              </h3>
              <nav className="space-y-1">
                {policySections.map((sec) => {
                  const Icon = sec.icon;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="flex items-center gap-3 text-stone-600 hover:text-orange-500 hover:bg-orange-50 px-3 py-2 rounded-xl transition-all duration-200 text-sm font-medium"
                    >
                      <Icon size={16} className="text-orange-400 shrink-0" />
                      <span className="truncate">{sec.title.substring(3)}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Policy content */}
          <article className="lg:col-span-3 bg-white p-6 sm:p-10 md:p-12 rounded-3xl border border-orange-100 shadow-sm leading-relaxed text-stone-700">
            <div className="prose prose-stone max-w-none">
              
              <div className="mb-10 text-stone-600 bg-stone-50 p-6 rounded-2xl border border-stone-100 italic text-sm md:text-base">
                Welcome to Tiffin Hub. Your privacy is important to us. This Privacy Policy explains how Tiffin Hub collects, uses, stores, and protects your personal information when you use our mobile application and related services.
              </div>

              {/* 1. Information We Collect */}
              <section id="collect" className="scroll-mt-24 mb-12 group">
                <div className="flex items-center gap-3 border-b border-orange-100 pb-3 mb-6">
                  <div className="p-2 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <Database size={20} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-stone-950 m-0">1. Information We Collect</h2>
                </div>
                <p className="mb-4">We may collect the following information:</p>
                
                <h3 className="text-lg font-bold text-stone-900 mb-2 mt-4">Personal Information</h3>
                <ul className="list-disc pl-5 mb-6 space-y-1">
                  <li>Full Name</li>
                  <li>Mobile Number</li>
                  <li>Email Address (if provided)</li>
                  <li>Delivery Address</li>
                  <li>Profile Information</li>
                </ul>

                <h3 className="text-lg font-bold text-stone-900 mb-2">Order Information</h3>
                <ul className="list-disc pl-5 mb-6 space-y-1">
                  <li>Order history</li>
                  <li>Restaurant details</li>
                  <li>Food preferences</li>
                  <li>Payment status</li>
                  <li>Delivery instructions</li>
                </ul>

                <h3 className="text-lg font-bold text-stone-900 mb-2">Device Information</h3>
                <ul className="list-disc pl-5 mb-6 space-y-1">
                  <li>Device model</li>
                  <li>Operating system version</li>
                  <li>App version</li>
                  <li>Device identifiers</li>
                  <li>Crash logs and diagnostics</li>
                </ul>

                <h3 className="text-lg font-bold text-stone-900 mb-2">Location Information</h3>
                <p className="mb-2">With your permission, we may collect your precise or approximate location to:</p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>Display nearby restaurants</li>
                  <li>Estimate delivery time</li>
                  <li>Improve delivery accuracy</li>
                  <li>Track delivery status</li>
                </ul>
                <div className="bg-orange-50/50 text-stone-600 px-4 py-3 rounded-xl border border-orange-100 text-sm">
                  <strong>Notice:</strong> You may disable location access at any time through your device settings.
                </div>
              </section>

              {/* 2. How We Use Your Information */}
              <section id="use" className="scroll-mt-24 mb-12 group">
                <div className="flex items-center gap-3 border-b border-orange-100 pb-3 mb-6">
                  <div className="p-2 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <Shield size={20} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-stone-950 m-0">2. How We Use Your Information</h2>
                </div>
                <p className="mb-4">We use your information to:</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  <li>Create and manage your account</li>
                  <li>Process food orders</li>
                  <li>Coordinate restaurant and delivery partners</li>
                  <li>Provide customer support</li>
                  <li>Send order confirmations and updates</li>
                  <li>Improve app performance and user experience</li>
                  <li>Detect fraud and maintain security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              {/* 3. Payment Information */}
              <section id="payment" className="scroll-mt-24 mb-12 group">
                <div className="flex items-center gap-3 border-b border-orange-100 pb-3 mb-6">
                  <div className="p-2 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <CreditCard size={20} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-stone-950 m-0">3. Payment Information</h2>
                </div>
                <p className="mb-4">
                  Tiffin Hub does not store your complete debit card, credit card, UPI PIN, or banking credentials.
                </p>
                <p className="bg-stone-50 p-4 rounded-xl border border-stone-100 text-sm">
                  Payments are processed securely through trusted third-party payment service providers.
                </p>
              </section>

              {/* 4. Information Sharing */}
              <section id="sharing" className="scroll-mt-24 mb-12 group">
                <div className="flex items-center gap-3 border-b border-orange-100 pb-3 mb-6">
                  <div className="p-2 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <Share2 size={20} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-stone-950 m-0">4. Information Sharing</h2>
                </div>
                <p className="mb-4">We may share limited information with:</p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>Restaurant partners to prepare your order</li>
                  <li>Delivery partners to complete deliveries</li>
                  <li>Payment service providers to process payments</li>
                  <li>Technology service providers supporting app operations</li>
                  <li>Government authorities when required by law</li>
                </ul>
                <p className="font-semibold text-stone-900">
                  We do not sell your personal information to third parties.
                </p>
              </section>

              {/* 5. Data Security */}
              <section id="security" className="scroll-mt-24 mb-12 group">
                <div className="flex items-center gap-3 border-b border-orange-100 pb-3 mb-6">
                  <div className="p-2 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <Lock size={20} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-stone-950 m-0">5. Data Security</h2>
                </div>
                <p className="mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction.
                </p>
                <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 text-sm">
                  While we strive to protect your data, no internet transmission or electronic storage method is completely secure.
                </div>
              </section>

              {/* 6. Data Retention */}
              <section id="retention" className="scroll-mt-24 mb-12 group">
                <div className="flex items-center gap-3 border-b border-orange-100 pb-3 mb-6">
                  <div className="p-2 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <History size={20} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-stone-950 m-0">6. Data Retention</h2>
                </div>
                <p className="mb-4">We retain your information only as long as necessary to:</p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>Provide our services</li>
                  <li>Maintain transaction records</li>
                  <li>Resolve disputes</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              {/* 7. Your Rights */}
              <section id="rights" className="scroll-mt-24 mb-12 group">
                <div className="flex items-center gap-3 border-b border-orange-100 pb-3 mb-6">
                  <div className="p-2 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <UserCheck size={20} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-stone-950 m-0">7. Your Rights</h2>
                </div>
                <p className="mb-4">Depending on applicable laws, you may have the right to:</p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and associated personal data (subject to legal and operational requirements)</li>
                  <li>Withdraw certain permissions, such as location access</li>
                  <li>Contact us regarding privacy concerns</li>
                </ul>
              </section>

              {/* 8. Children's Privacy */}
              <section id="children" className="scroll-mt-24 mb-12 group">
                <div className="flex items-center gap-3 border-b border-orange-100 pb-3 mb-6">
                  <div className="p-2 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <UserX size={20} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-stone-950 m-0">8. Children&apos;s Privacy</h2>
                </div>
                <p>
                  Tiffin Hub is not intended for children under the age of 13. We do not knowingly collect personal information from children.
                </p>
              </section>

              {/* 9. Notifications */}
              <section id="notifications" className="scroll-mt-24 mb-12 group">
                <div className="flex items-center gap-3 border-b border-orange-100 pb-3 mb-6">
                  <div className="p-2 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <Bell size={20} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-stone-950 m-0">9. Notifications</h2>
                </div>
                <p className="mb-4">We may send notifications related to:</p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>Order confirmation</li>
                  <li>Order preparation</li>
                  <li>Delivery updates</li>
                  <li>Promotional offers (only where permitted or with your consent)</li>
                  <li>Service announcements</li>
                </ul>
                <p>You can manage notification preferences through your device or app settings.</p>
              </section>

              {/* 10. Cookies and Analytics */}
              <section id="cookies" className="scroll-mt-24 mb-12 group">
                <div className="flex items-center gap-3 border-b border-orange-100 pb-3 mb-6">
                  <div className="p-2 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <Cookie size={20} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-stone-950 m-0">10. Cookies and Analytics</h2>
                </div>
                <p className="mb-4">Our application may use cookies, analytics tools, or similar technologies to:</p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>Improve performance</li>
                  <li>Analyze usage patterns</li>
                  <li>Enhance user experience</li>
                  <li>Diagnose technical issues</li>
                </ul>
              </section>

              {/* 11. Third-Party Services */}
              <section id="third-party" className="scroll-mt-24 mb-12 group">
                <div className="flex items-center gap-3 border-b border-orange-100 pb-3 mb-6">
                  <div className="p-2 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <ExternalLink size={20} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-stone-950 m-0">11. Third-Party Services</h2>
                </div>
                <p className="mb-4">The application may integrate with third-party services, including:</p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>Payment gateways</li>
                  <li>Maps and navigation services</li>
                  <li>Push notification providers</li>
                  <li>Analytics platforms</li>
                </ul>
                <p>These providers have their own privacy policies governing their services.</p>
              </section>

              {/* 12. Changes to This Privacy Policy */}
              <section id="changes" className="scroll-mt-24 mb-12 group">
                <div className="flex items-center gap-3 border-b border-orange-100 pb-3 mb-6">
                  <div className="p-2 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <RefreshCw size={20} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-stone-950 m-0">12. Changes to This Privacy Policy</h2>
                </div>
                <p className="mb-4">
                  We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated Effective Date.
                </p>
                <p>
                  Continued use of the application after changes become effective constitutes acceptance of the revised Privacy Policy.
                </p>
              </section>

              {/* 13. Contact Us */}
              <section id="contact" className="scroll-mt-24 mb-12 group">
                <div className="flex items-center gap-3 border-b border-orange-100 pb-3 mb-6">
                  <div className="p-2 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <Mail size={20} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-stone-950 m-0">13. Contact Us</h2>
                </div>
                <p className="mb-6">For questions or concerns regarding this Privacy Policy, please contact:</p>
                
                <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 grid gap-4 max-w-lg">
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider mb-1">Company</h4>
                    <p className="text-base font-semibold text-stone-950">Tiffin Hub</p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider mb-1">Email</h4>
                      <a href="mailto:info@digitalindian.co.in" className="text-orange-600 hover:underline font-medium break-all">
                        info@digitalindian.co.in
                      </a>
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider mb-1">Support Email</h4>
                      <a href="mailto:info@digitalindian.co.in" className="text-orange-600 hover:underline font-medium break-all">
                        info@digitalindian.co.in
                      </a>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider mb-1">Website</h4>
                    <a href="https://www.tiffinhub.shop" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline font-medium inline-flex items-center gap-1">
                      www.tiffinhub.shop
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </section>

              {/* 14. Consent */}
              <section id="consent" className="scroll-mt-24 mb-6 group">
                <div className="flex items-center gap-3 border-b border-orange-100 pb-3 mb-6">
                  <div className="p-2 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <CheckCircle size={20} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-stone-950 m-0">14. Consent</h2>
                </div>
                <p className="bg-orange-50/70 p-6 rounded-2xl border border-orange-100 text-stone-800">
                  By downloading, accessing, or using the Tiffin Hub application, you acknowledge that you have read, understood, and agree to this Privacy Policy.
                </p>
              </section>

              {/* Document Control */}
              <div className="mt-16 pt-8 border-t border-stone-200">
                <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Document Control</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-stone-200 text-sm text-left">
                    <thead>
                      <tr className="bg-stone-50 text-stone-700 font-semibold">
                        <th className="px-4 py-3 border">Version</th>
                        <th className="px-4 py-3 border">Date</th>
                        <th className="px-4 py-3 border">Description</th>
                        <th className="px-4 py-3 border">Prepared By</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      <tr>
                        <td className="px-4 py-3 border font-medium">1.0</td>
                        <td className="px-4 py-3 border">29/06/2026</td>
                        <td className="px-4 py-3 border text-stone-600">Initial Release</td>
                        <td className="px-4 py-3 border font-medium text-stone-800">DigitalIndian IT Team</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Copyright & Confidentiality Notice */}
              <div className="mt-8 p-6 bg-stone-50 border border-stone-200 rounded-2xl text-xs text-stone-500 leading-relaxed">
                <p className="font-semibold uppercase tracking-wider mb-2 text-stone-600">Copyright & Confidentiality Notice</p>
                <p className="mb-2">
                  This Tiffin Hub App Privacy Policy document and all associated materials, concepts, designs, and technical contents are the intellectual property of DigitalIndian Business Solutions Pvt. Ltd. and its associated partners.
                </p>
                <p className="mb-2">
                  No part of this document may be reproduced, distributed, modified, transmitted, or disclosed to any third party without prior written consent from DigitalIndian Business Solutions Pvt. Ltd.
                </p>
                <p className="font-semibold">All rights reserved © DigitalIndian Business Solutions Pvt. Ltd.</p>
              </div>

            </div>
          </article>

        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
