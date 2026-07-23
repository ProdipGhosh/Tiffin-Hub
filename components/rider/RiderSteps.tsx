"use client";
import { useEffect, useRef, useState } from "react";

const steps = [
  { n: "01", emoji: "📋", title: "Fill the Form", desc: "Submit your personal and vehicle details using the registration form. Takes less than 10 minutes." },
  { n: "02", emoji: "📞", title: "We Verify You", desc: "Our team reviews your documents and calls you within 24–48 hours to confirm your registration." },
  { n: "03", emoji: "🎓", title: "Quick Onboarding", desc: "Attend a brief online orientation — learn the app, delivery routes, and our quality standards." },
  { n: "04", emoji: "🛵", title: "Go Live & Deliver", desc: "Accept delivery orders in your area through our app. Deliver on time, collect your earnings." },
  { n: "05", emoji: "💰", title: "Get Paid Daily", desc: "Earnings hit your bank account or UPI the same day. No delays, no deductions." },
];

export default function RiderSteps() {
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={ref} className="section-pad bg-[#FFF9F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 text-sm font-medium text-orange-700 mb-4">
            🗺️ How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-4">
            From Registration to{" "}
            <span style={{ background: "linear-gradient(135deg,#f97316,#eab308)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              First Earnings
            </span>{" "}
            in 5 Steps
          </h2>
          <p className="text-stone-500 text-lg">Simple, fast, and completely transparent.</p>
        </div>

        <div className="relative">
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-200 via-amber-200 to-yellow-200 -translate-x-1/2 hidden sm:block" />
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={step.n}
                className={`flex gap-6 items-start sm:items-center transition-all duration-500 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 120}ms` }}>
                <div className={`flex-1 bg-white rounded-3xl p-6 shadow-sm border border-orange-100 hover:shadow-lg transition-all hover:-translate-y-0.5 ${i % 2 === 0 ? "sm:text-right" : "sm:text-left"}`}>
                  <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? "sm:flex-row-reverse" : ""}`}>
                    <span className="text-3xl">{step.emoji}</span>
                    <div>
                      <div className="text-xs font-bold text-orange-500 uppercase tracking-widest">Step {step.n}</div>
                      <h3 className="text-lg font-bold text-stone-800">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
                <div className="hidden sm:flex w-10 h-10 shrink-0 rounded-full items-center justify-center font-bold text-white text-sm shadow-lg z-10"
                  style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
                  {step.n}
                </div>
                <div className="flex-1 hidden sm:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
