"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Eye, EyeOff, ArrowRight, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

type Tab = "phone" | "email";
type PhasePhone = "input" | "otp" | "success";
type PhaseEmail = "input" | "verify" | "success";

/* ── OTP Input ── */
function OtpInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus();
  };
  const handleChange = (i: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    const next = [...value]; next[i] = digit; onChange(next);
    if (digit && i < 5) refs.current[i + 1]?.focus();
  };
  const handlePaste = (e: React.ClipboardEvent) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (digits.length) { onChange(Array(6).fill("").map((_, i) => digits[i] || "")); refs.current[Math.min(digits.length - 1, 5)]?.focus(); }
  };
  return (
    <div className="flex gap-3 justify-center" onPaste={handlePaste}>
      {Array(6).fill(0).map((_, i) => (
        <input key={i} ref={(el) => { refs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1}
          value={value[i] || ""} onChange={(e) => handleChange(i, e.target.value)} onKeyDown={(e) => handleKey(i, e)}
          className="w-11 h-12 text-center text-xl font-bold rounded-xl border-2 transition-all outline-none bg-white"
          style={{ height: "52px", borderColor: value[i] ? "#f97316" : "#e7e5e4", color: "#1c1917" }} />
      ))}
    </div>
  );
}

const fc = (err?: string) =>
  `w-full rounded-xl border-2 px-4 py-3.5 text-stone-800 placeholder-stone-400 focus:outline-none transition-colors text-sm ${err ? "border-red-300 bg-red-50" : "border-stone-200 bg-white focus:border-orange-400 hover:border-stone-300"}`;

/* ── Phone Flow ── */
function PhoneFlow() {
  const [phase, setPhase] = useState<PhasePhone>("input");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer > 0) { const t = setTimeout(() => setResendTimer(r => r - 1), 1000); return () => clearTimeout(t); }
  }, [resendTimer]);

  const sendOtp = () => {
    if (!/^\d{10}$/.test(mobile)) { setError("Please enter a valid 10-digit mobile number"); return; }
    setError(""); setOtp(Array(6).fill("")); setPhase("otp"); setResendTimer(30);
  };
  const verifyOtp = () => {
    if (otp.join("").length < 6) { setError("Please enter the complete 6-digit OTP"); return; }
    setError(""); setPhase("success");
  };

  if (phase === "success") return (
    <div className="text-center py-6">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
        <CheckCircle size={32} className="text-white" />
      </div>
      <h3 className="text-xl font-bold text-stone-800 mb-2">Verified! 🎉</h3>
      <p className="text-stone-500 mb-5 text-sm">Mobile <span className="text-orange-600 font-semibold">+91 {mobile}</span> verified.</p>
      <Link href="/rider/register" className="inline-flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-2xl hover:scale-105 transition-all shadow-lg text-sm"
        style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
        Complete Registration <ArrowRight size={16} />
      </Link>
    </div>
  );

  if (phase === "otp") return (
    <div className="space-y-5">
      <div className="text-center">
        <p className="text-stone-500 text-sm mb-1">OTP sent to</p>
        <p className="text-stone-800 font-bold text-lg">+91 {mobile}</p>
        <p className="text-stone-400 text-xs mt-1">(Demo: enter any 6 digits)</p>
      </div>
      <OtpInput value={otp} onChange={setOtp} />
      {error && <p className="text-red-500 text-xs text-center flex items-center justify-center gap-1"><AlertCircle size={12} />{error}</p>}
      <button onClick={verifyOtp} className="w-full text-white font-bold py-4 rounded-2xl text-sm hover:scale-[1.02] transition-all shadow-lg"
        style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>Verify OTP</button>
      <div className="text-center">
        {resendTimer > 0
          ? <p className="text-stone-400 text-sm">Resend in <span className="text-orange-600 font-semibold">{resendTimer}s</span></p>
          : <button onClick={() => { setResendTimer(30); setOtp(Array(6).fill("")); }} className="flex items-center gap-1.5 text-orange-600 text-sm font-semibold mx-auto hover:text-orange-700 transition-colors"><RefreshCw size={14} />Resend OTP</button>
        }
      </div>
      <button onClick={() => setPhase("input")} className="w-full text-stone-400 text-sm hover:text-stone-600 transition-colors">← Change number</button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1.5">Mobile Number <span className="text-pink-500">*</span></label>
        <div className={`flex items-center rounded-xl border-2 overflow-hidden ${error ? "border-red-300 bg-red-50" : "border-stone-200 bg-white focus-within:border-orange-400"}`}>
          <span className="px-4 py-3.5 text-stone-500 text-sm font-semibold border-r border-stone-200">+91</span>
          <input type="tel" placeholder="9876543210" maxLength={10} value={mobile}
            onChange={(e) => { setMobile(e.target.value.replace(/\D/g, "")); setError(""); }}
            className="flex-1 px-4 py-3.5 bg-transparent text-stone-800 placeholder-stone-400 outline-none text-sm" />
          <span className="px-4"><Phone size={16} className="text-stone-400" /></span>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
      <button onClick={sendOtp} className="w-full flex items-center justify-center gap-2 text-white font-bold py-4 rounded-2xl text-sm hover:scale-[1.02] transition-all shadow-lg"
        style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", boxShadow: "0 8px 24px rgba(249,115,22,0.25)" }}>
        Send OTP <ArrowRight size={16} />
      </button>
    </div>
  );
}

/* ── Email Flow ── */
function EmailFlow() {
  const [phase, setPhase] = useState<PhaseEmail>("input");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [verCode, setVerCode] = useState(Array(6).fill(""));
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email address"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setError(""); setPhase("verify"); setVerCode(Array(6).fill(""));
  };
  const handleVerify = () => {
    if (verCode.join("").length < 6) { setError("Enter the 6-digit code from your email"); return; }
    setError(""); setPhase("success");
  };

  if (phase === "success") return (
    <div className="text-center py-6">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
        <CheckCircle size={32} className="text-white" />
      </div>
      <h3 className="text-xl font-bold text-stone-800 mb-2">Email Verified! 🎉</h3>
      <p className="text-stone-500 mb-5 text-sm"><span className="text-orange-600 font-semibold">{email}</span> verified.</p>
      <Link href="/rider/register" className="inline-flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-2xl hover:scale-105 transition-all shadow-lg text-sm"
        style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
        Complete Registration <ArrowRight size={16} />
      </Link>
    </div>
  );

  if (phase === "verify") return (
    <div className="space-y-5">
      <div className="text-center">
        <p className="text-stone-500 text-sm mb-1">Verification code sent to</p>
        <p className="text-stone-800 font-bold">{email}</p>
        <p className="text-stone-400 text-xs mt-1">(Demo: enter any 6 digits)</p>
      </div>
      <OtpInput value={verCode} onChange={setVerCode} />
      {error && <p className="text-red-500 text-xs text-center">{error}</p>}
      <button onClick={handleVerify} className="w-full text-white font-bold py-4 rounded-2xl text-sm hover:scale-[1.02] transition-all shadow-lg"
        style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>Verify Email</button>
      <button onClick={() => setPhase("input")} className="w-full text-stone-400 text-sm hover:text-stone-600 transition-colors">← Back</button>
    </div>
  );

  return (
    <div className="space-y-4">
      <button className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-semibold text-sm border-2 border-stone-200 text-stone-700 hover:bg-stone-50 transition-all">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google
      </button>
      <div className="flex items-center gap-3"><div className="flex-1 h-px bg-stone-200" /><span className="text-stone-400 text-xs font-medium">OR</span><div className="flex-1 h-px bg-stone-200" /></div>
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1.5">Email Address <span className="text-pink-500">*</span></label>
        <div className={`flex items-center rounded-xl border-2 overflow-hidden ${error ? "border-red-300" : "border-stone-200 focus-within:border-orange-400"}`}>
          <input type="email" placeholder="you@email.com" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }}
            className="flex-1 px-4 py-3.5 bg-white text-stone-800 placeholder-stone-400 outline-none text-sm" />
          <span className="px-4"><Mail size={16} className="text-stone-400" /></span>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1.5">Password <span className="text-pink-500">*</span></label>
        <div className={`flex items-center rounded-xl border-2 overflow-hidden ${error ? "border-red-300" : "border-stone-200 focus-within:border-orange-400"}`}>
          <input type={showPw ? "text" : "password"} placeholder="Min. 6 characters" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }}
            className="flex-1 px-4 py-3.5 bg-white text-stone-800 placeholder-stone-400 outline-none text-sm" />
          <button onClick={() => setShowPw(!showPw)} className="px-4 text-stone-400 hover:text-stone-600 transition-colors">{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
        </div>
      </div>
      {error && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} />{error}</p>}
      <button onClick={handleLogin} className="w-full flex items-center justify-center gap-2 text-white font-bold py-4 rounded-2xl text-sm hover:scale-[1.02] transition-all shadow-lg"
        style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", boxShadow: "0 8px 24px rgba(249,115,22,0.25)" }}>
        Login & Verify Email <ArrowRight size={16} />
      </button>
    </div>
  );
}

/* ── Login Page ── */
export default function RiderLoginPage() {
  const [tab, setTab] = useState<Tab>("phone");

  return (
    <main className="min-h-screen bg-[#FFF9F0]">
      {/* Minimal Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-sm border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/rider" className="flex items-center gap-2">
            <Image src="/icon.png" alt="TiffinHub Logo" width={40} height={40} className="rounded-full" />
            <div>
              <span className="font-bold text-base text-orange-600">Tiffin<span className="text-rose-600">Hub</span></span>
              <div className="text-xs text-orange-500 font-medium -mt-0.5 hidden sm:block">Rider Partner</div>
            </div>
          </Link>
          <Link href="/rider/register"
            className="px-4 py-2 rounded-full text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 shadow-md transition-all">
            Register Now
          </Link>
        </div>
      </nav>

      {/* Login Card */}
      <div className="min-h-screen flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Image src="/icon.png" alt="TiffinHub" width={64} height={64} className="rounded-full mx-auto mb-3 shadow-lg" />
            <h1 className="text-2xl font-bold text-stone-800">Welcome Back, Rider 🛵</h1>
            <p className="text-stone-500 text-sm mt-1">Login to your delivery partner account</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-6 sm:p-8">
            {/* Tabs */}
            <div className="flex rounded-2xl p-1 mb-6 bg-stone-100">
              {[{ key: "phone" as Tab, label: "📱 Phone OTP" }, { key: "email" as Tab, label: "✉️ Email" }].map(({ key, label }) => (
                <button key={key} onClick={() => setTab(key)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={tab === key ? { background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", boxShadow: "0 4px 12px rgba(249,115,22,0.3)" } : { color: "#78716c" }}>
                  {label}
                </button>
              ))}
            </div>

            {tab === "phone" ? <PhoneFlow /> : <EmailFlow />}
          </div>

          <p className="text-center text-sm text-stone-500 mt-6">
            New rider?{" "}
            <Link href="/rider/register" className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">Register here →</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
