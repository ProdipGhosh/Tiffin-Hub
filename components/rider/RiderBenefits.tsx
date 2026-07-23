"use client";
import { useEffect, useRef, useState } from "react";

const benefits = [
  { emoji: "💰", title: "Earn ₹800–₹1,500/Day", desc: "Get paid daily. The more you deliver, the more you earn. No cap on your income, no deductions.", color: "bg-green-50 border-green-200" },
  { emoji: "🕐", title: "Flexible Working Hours", desc: "Choose your own shifts. Morning, afternoon, or evening — whatever fits your lifestyle.", color: "bg-blue-50 border-blue-200" },
  { emoji: "📍", title: "Work Near Your Home", desc: "Deliver only in your own neighbourhood. Short routes, less fuel, more trips.", color: "bg-orange-50 border-orange-200" },
  { emoji: "🛡️", title: "Accident Insurance", desc: "Full on-duty accident insurance coverage so you and your family stay protected always.", color: "bg-purple-50 border-purple-200" },
  { emoji: "🎁", title: "Free Delivery Kit", desc: "Get a branded bag, helmet subsidy, and uniform completely free when you join.", color: "bg-yellow-50 border-yellow-200" },
  { emoji: "⚡", title: "Instant Daily Payouts", desc: "Your earnings hit your account the same day. No waiting for weekly or monthly cycles.", color: "bg-pink-50 border-pink-200" },
];

export default function RiderBenefits() {
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="benefits" ref={ref} className="section-pad bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 text-sm font-medium text-orange-700 mb-4">
            🎁 Rider Benefits
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-4">
            Everything You Get,{" "}
            <span style={{ background: "linear-gradient(135deg,#f97316,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Day One
            </span>
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            We give you the tools, support, and earnings to build a real income you can count on — starting from your first delivery.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {benefits.map((b, i) => (
            <div key={b.title}
              className={`border-2 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default group ${b.color} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200 inline-block">{b.emoji}</div>
              <h3 className="text-lg font-bold text-stone-800 mb-2">{b.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className={`rounded-3xl p-8 text-center transition-all duration-700 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}
          style={{ background: "linear-gradient(135deg, #fff7ed, #fef3c7)" }}>
          <div className="text-4xl mb-4">🛵</div>
          <blockquote className="text-xl sm:text-2xl font-bold text-stone-700 italic mb-4 max-w-2xl mx-auto">
            &ldquo;Every delivery is a step closer to your goal. Ride with us and make every kilometer count!&rdquo;
          </blockquote>
          <p className="text-stone-500 text-sm">Join 500+ riders already earning across the city.</p>
          <button onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-6 inline-flex items-center gap-2 text-white font-bold px-8 py-3 rounded-2xl hover:scale-105 transition-all shadow-lg"
            style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
            Apply Now — It&apos;s Free →
          </button>
        </div>
      </div>
    </section>
  );
}
