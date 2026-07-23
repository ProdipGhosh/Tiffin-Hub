"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, Eye, EyeOff, ArrowRight, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

type Tab = "phone" | "email";
type PhasePhone = "input" | "otp" | "success";
type PhaseEmail = "input" | "verify" | "success";

/* ─────────────────────── OTP Input ─────────────────────── */
function OtpInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus();
  };
  const handleChange = (i: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    const next = [...value];
    next[i] = digit;
    onChange(next);
    if (digit && i < 5) refs.current[i + 1]?.focus();
  };
  const handlePaste = (e: React.ClipboardEvent) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (digits.length) {
      const next = Array(6).fill("").map((_, i) => digits[i] || "");
      onChange(next);
      refs.current[Math.min(digits.length - 1, 5)]?.focus();
    }
  };
  return (
    <div className="flex gap-3 justify-center" onPaste={handlePaste}>
      {Array(6).fill(0).map((_, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          className="w-11 h-13 text-center text-xl font-bold rounded-xl transition-all outline-none"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: value[i] ? "2px solid #f97316" : "2px solid rgba(255,255,255,0.12)",
            color: "#fff",
            height: "52px",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────── Phone OTP Flow ─────────────────────── */
function PhoneFlow() {
  const [phase, setPhase] = useState<PhasePhone>("input");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(r => r - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const sendOtp = () => {
    if (!/^\d{10}$/.test(mobile)) { setError("Please enter a valid 10-digit mobile number"); return; }
    setError("");
    setOtp(Array(6).fill(""));
    setPhase("otp");
    setResendTimer(30);
  };

  const verifyOtp = () => {
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter the complete 6-digit OTP"); return; }
    // Mock: accept any 6-digit OTP
    setError("");
    setPhase("success");
  };

  if (phase === "success") {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl"
          style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.3), rgba(16,185,129,0.1))", border: "2px solid rgba(16,185,129,0.5)" }}>
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Verified! 🎉</h3>
        <p className="text-gray-400 mb-6 text-sm">Mobile <span className="text-orange-400 font-semibold">+91 {mobile}</span> verified successfully.</p>
        <Link href="/rider/register"
          className="inline-flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-2xl transition-all hover:scale-105 shadow-lg text-sm"
          style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 8px 24px rgba(249,115,22,0.3)" }}>
          Complete Registration <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  if (phase === "otp") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">OTP sent to</p>
          <p className="text-white font-bold text-lg">+91 {mobile}</p>
          <p className="text-gray-500 text-xs mt-1">(Demo: enter any 6 digits)</p>
        </div>
        <OtpInput value={otp} onChange={setOtp} />
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3">
            <AlertCircle size={14} /> {error}
          </div>
        )}
        <button onClick={verifyOtp}
          className="w-full text-white font-bold py-4 rounded-2xl text-sm transition-all hover:scale-[1.02] shadow-lg"
          style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 8px 24px rgba(249,115,22,0.3)" }}>
          Verify OTP
        </button>
        <div className="text-center">
          {resendTimer > 0 ? (
            <p className="text-gray-500 text-sm">Resend OTP in <span className="text-orange-400 font-semibold">{resendTimer}s</span></p>
          ) : (
            <button onClick={() => { setResendTimer(30); setOtp(Array(6).fill("")); }}
              className="flex items-center gap-1.5 text-orange-400 text-sm font-semibold mx-auto hover:text-orange-300 transition-colors">
              <RefreshCw size={14} /> Resend OTP
            </button>
          )}
        </div>
        <button onClick={() => setPhase("input")}
          className="w-full text-gray-400 text-sm hover:text-gray-300 transition-colors">
          ← Change number
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">Mobile Number</label>
        <div className="flex items-center rounded-2xl overflow-hidden"
          style={{ border: "2px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>
          <span className="px-4 py-4 text-gray-400 text-sm font-semibold border-r" style={{ borderColor: "rgba(255,255,255,0.1)" }}>+91</span>
          <input type="tel" placeholder="9876543210" maxLength={10} value={mobile}
            onChange={(e) => { setMobile(e.target.value.replace(/\D/g, "")); setError(""); }}
            className="flex-1 px-4 py-4 bg-transparent text-white placeholder-gray-600 outline-none text-sm font-medium"
          />
          <span className="px-4 py-4"><Phone size={16} className="text-gray-600" /></span>
        </div>
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-xs mt-2">
            <AlertCircle size={12} /> {error}
          </div>
        )}
      </div>
      <button onClick={sendOtp}
        className="w-full flex items-center justify-center gap-2 text-white font-bold py-4 rounded-2xl text-sm transition-all hover:scale-[1.02] shadow-lg"
        style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 8px 24px rgba(249,115,22,0.25)" }}>
        Send OTP <ArrowRight size={16} />
      </button>
    </div>
  );
}

/* ─────────────────────── Email Flow ─────────────────────── */
function EmailFlow() {
  const [phase, setPhase] = useState<PhaseEmail>("input");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [verCode, setVerCode] = useState(Array(6).fill(""));
  const [error, setError] = useState("");

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleLogin = () => {
    if (!validateEmail(email)) { setError("Please enter a valid email address"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setError("");
    setPhase("verify");
    setVerCode(Array(6).fill(""));
  };

  const handleVerify = () => {
    if (verCode.join("").length < 6) { setError("Enter the 6-digit code from your email"); return; }
    setError("");
    setPhase("success");
  };

  if (phase === "success") {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl"
          style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.3), rgba(16,185,129,0.1))", border: "2px solid rgba(16,185,129,0.5)" }}>
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Email Verified! 🎉</h3>
        <p className="text-gray-400 mb-6 text-sm"><span className="text-orange-400 font-semibold">{email}</span> verified successfully.</p>
        <Link href="/rider/register"
          className="inline-flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-2xl transition-all hover:scale-105 shadow-lg text-sm"
          style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 8px 24px rgba(249,115,22,0.3)" }}>
          Complete Registration <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  if (phase === "verify") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Verification code sent to</p>
          <p className="text-white font-bold">{email}</p>
          <p className="text-gray-500 text-xs mt-1">(Demo: enter any 6 digits)</p>
        </div>
        <OtpInput value={verCode} onChange={setVerCode} />
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3">
            <AlertCircle size={14} /> {error}
          </div>
        )}
        <button onClick={handleVerify}
          className="w-full text-white font-bold py-4 rounded-2xl text-sm transition-all hover:scale-[1.02] shadow-lg"
          style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 8px 24px rgba(249,115,22,0.3)" }}>
          Verify Email
        </button>
        <button onClick={() => setPhase("input")} className="w-full text-gray-400 text-sm hover:text-gray-300 transition-colors">
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Google Sign-in */}
      <button className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:scale-[1.01]"
        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#e5e7eb" }}>
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
        <span className="text-gray-600 text-xs font-medium">OR</span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
      </div>

      {/* Email & Password */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
        <div className="flex items-center rounded-2xl overflow-hidden"
          style={{ border: "2px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>
          <input type="email" placeholder="you@email.com" value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            className="flex-1 px-4 py-4 bg-transparent text-white placeholder-gray-600 outline-none text-sm font-medium"
          />
          <span className="px-4"><Mail size={16} className="text-gray-600" /></span>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
        <div className="flex items-center rounded-2xl overflow-hidden"
          style={{ border: "2px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>
          <input type={showPw ? "text" : "password"} placeholder="Min. 6 characters" value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            className="flex-1 px-4 py-4 bg-transparent text-white placeholder-gray-600 outline-none text-sm font-medium"
          />
          <button onClick={() => setShowPw(!showPw)} className="px-4 text-gray-600 hover:text-gray-400 transition-colors">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <button onClick={handleLogin}
        className="w-full flex items-center justify-center gap-2 text-white font-bold py-4 rounded-2xl text-sm transition-all hover:scale-[1.02] shadow-lg"
        style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 8px 24px rgba(249,115,22,0.25)" }}>
        Login & Verify Email <ArrowRight size={16} />
      </button>
    </div>
  );
}

/* ─────────────────────── Main Login Form ─────────────────────── */
export default function RiderLoginForm() {
  const [tab, setTab] = useState<Tab>("phone");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20"
      style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #111827 50%, #1a0a00 100%)" }}>

      {/* Background glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)" }} />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}>
              <span className="text-xl">🛵</span>
            </div>
            <div>
              <div className="text-white font-extrabold text-lg leading-tight">Tiffin Hub</div>
              <div className="text-orange-400 text-xs font-semibold tracking-widest uppercase">Rider Partner</div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back, Rider</h1>
          <p className="text-gray-500 text-sm mt-1">Login to your delivery partner account</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl p-6 sm:p-8"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 25px 80px rgba(0,0,0,0.4)",
          }}>
          {/* Tabs */}
          <div className="flex rounded-2xl p-1 mb-6"
            style={{ background: "rgba(255,255,255,0.05)" }}>
            {[
              { key: "phone" as Tab, label: "📱 Phone OTP" },
              { key: "email" as Tab, label: "✉️ Email" },
            ].map(({ key, label }) => (
              <button key={key} onClick={() => setTab(key)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={tab === key ? {
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(249,115,22,0.3)",
                } : { color: "#9ca3af" }}>
                {label}
              </button>
            ))}
          </div>

          {tab === "phone" ? <PhoneFlow /> : <EmailFlow />}
        </div>

        {/* Sign-up link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          New rider?{" "}
          <Link href="/rider/register" className="text-orange-400 font-semibold hover:text-orange-300 transition-colors">
            Register here →
          </Link>
        </p>
      </div>
    </div>
  );
}
