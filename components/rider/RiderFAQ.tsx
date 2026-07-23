"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem { q: string; a: string; }

const faqs: FAQItem[] = [
  { q: "Do I need to invest any money to register as a rider?", a: "Absolutely not. Registration is 100% free. All you need is your own bike or scooter, a valid driving license, and the required documents. No joining fee, no hidden charges." },
  { q: "How will I receive delivery orders?", a: "Once verified, you will receive delivery orders through our rider app on your smartphone. You can accept orders in your area based on your availability and working hours." },
  { q: "How much can I earn per day?", a: "Earnings depend on the number of deliveries you complete. On average, active riders earn between ₹800 to ₹1,500 per day. The more you ride, the more you earn — with no upper limit." },
  { q: "When and how do I get paid?", a: "We offer daily payouts. Your earnings are transferred directly to your registered bank account or UPI ID at the end of each working day. No waiting, no delays." },
  { q: "What documents do I need to register?", a: "You will need your Aadhaar card, a valid Driving License, Vehicle Registration Certificate, Vehicle Insurance, Vehicle Tax document, a passport-size photo, and basic personal details. All uploads are secure." },
  { q: "Can I choose my own working hours?", a: "Yes! You have full flexibility to choose your working shifts — morning, afternoon, or evening. You can also set your available days, so you only work when it suits you." },
  { q: "Is there any support if my vehicle breaks down?", a: "Yes. Our 24/7 rider helpline is always available. We also provide emergency assistance coordination for breakdowns during active delivery shifts." },
  { q: "What types of vehicles are accepted?", a: "We accept bikes and scooters running on Petrol, Diesel, or Electric fuel. The vehicle must be in good working condition and have valid registration, insurance, and tax documents." },
];

function Item({ q, a }: FAQItem) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open ? "border-orange-300 shadow-md" : "border-stone-200"}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-orange-50/50 transition-colors">
        <span className="font-semibold text-stone-800 text-sm sm:text-base">{q}</span>
        <ChevronDown size={18} className={`shrink-0 text-orange-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-4">{a}</div>
      )}
    </div>
  );
}

export default function RiderFAQ() {
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="faq" ref={ref} className="section-pad bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 text-sm font-medium text-orange-700 mb-4">
            ❓ FAQ
          </div>
          <h2 className="text-3xl font-bold text-stone-800 mb-3">Common Questions</h2>
          <p className="text-stone-500">Everything you need to know before joining as a delivery partner.</p>
        </div>

        <div className={`space-y-3 transition-all duration-700 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}>
          {faqs.map((f) => <Item key={f.q} {...f} />)}
        </div>

        <div className={`mt-10 text-center p-6 rounded-3xl transition-all duration-700 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}
          style={{ background: "linear-gradient(135deg,#fff7ed,#fef3c7)" }}>
          <p className="text-stone-600 mb-4">Still have questions? We&apos;re happy to help!</p>
          <a href="mailto:hr@digitalindian.co.in" className="inline-flex items-center gap-2 font-semibold text-orange-600 hover:text-orange-700 transition-colors">
            ✉️ hr@digitalindian.co.in
          </a>
        </div>
      </div>
    </section>
  );
}
