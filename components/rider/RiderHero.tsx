"use client";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const floats = ["🛵", "📦", "⚡", "🏍️", "🗺️", "💨", "🎯", "💰"];

export default function RiderHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
      style={{ background: "linear-gradient(135deg, #fff9f0 0%, #ffedd5 40%, #fef3c7 100%)" }}>

      {mounted && floats.map((e, i) => (
        <div key={i} className="absolute text-4xl opacity-10 pointer-events-none select-none"
          style={{
            left: `${8 + i * 11}%`,
            top: `${12 + (i % 4) * 22}%`,
            animation: `float ${3 + (i % 2)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}>
          {e}
        </div>
      ))}

      <div className="absolute top-24 right-8 w-80 h-80 bg-orange-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-16 left-8 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/90 border border-orange-200 rounded-full px-5 py-2 text-sm font-semibold text-orange-700 shadow-sm mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Now Hiring Delivery Partners Across Your City
            </div>

            <div className="mb-3 text-base sm:text-lg font-semibold text-orange-600 tracking-wide uppercase">
              Ride Your Bike. Earn Every Day.
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-stone-800 mb-6">
              Ride.{" "}
              <span style={{ background: "linear-gradient(135deg, #f97316, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Deliver.
              </span>
              <br />
              <span style={{ background: "linear-gradient(135deg, #f59e0b, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Earn Big.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Turn your bike or scooter into a steady income. Flexible hours, daily payouts,
              and full support from Team Tiffin Hub — every single day.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 mb-8">
              {[
                { emoji: "🛵", line1: "You Ride", line2: "your area" },
                { emoji: "📦", line1: "You Deliver", line2: "on time" },
                { emoji: "💰", line1: "You Earn", line2: "every day" },
              ].map((s) => (
                <div key={s.line1} className="flex items-center gap-3 bg-white/80 border border-orange-100 px-4 py-2.5 rounded-2xl shadow-sm">
                  <span className="text-2xl">{s.emoji}</span>
                  <div className="text-left">
                    <div className="font-bold text-stone-800 text-sm">{s.line1}</div>
                    <div className="text-xs text-stone-500">{s.line2}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button onClick={() => scrollTo("register")}
                className="flex items-center justify-center gap-2 text-white font-bold text-lg px-8 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 12px 30px rgba(249,115,22,0.35)" }}>
                🛵 Register as Rider — It&apos;s Free
              </button>
              <button onClick={() => scrollTo("benefits")}
                className="flex items-center justify-center gap-2 bg-white hover:bg-orange-50 text-orange-600 border-2 border-orange-200 hover:border-orange-400 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200">
                See Benefits ↓
              </button>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {["✅ Daily Payouts", "✅ Flexible Hours", "✅ Free Delivery Kit", "✅ Accident Insurance"].map((b) => (
                <span key={b} className="bg-white/90 border border-green-200 text-green-700 text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full shadow-sm">{b}</span>
              ))}
            </div>
          </div>

          {/* Right Column: Framed Banner Artwork */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-white group hover:scale-[1.02] transition-all duration-300">
              <Image
                src="/banner.png"
                alt="Tiffin Hub Delivery Partner Banner"
                width={700}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-2xl glass border border-white/20 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5">🛵 Official Delivery Partner</span>
                  <span className="text-orange-300 font-bold">Join Now →</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <button onClick={() => scrollTo("benefits")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-stone-400 hover:text-orange-500 transition-colors animate-bounce"
        aria-label="Scroll down">
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
