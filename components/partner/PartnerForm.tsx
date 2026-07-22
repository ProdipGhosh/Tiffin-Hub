"use client";
import { useState, useEffect } from "react";
import { Send, MessageCircle, CheckCircle, X } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/constants";

interface PartnerFormData {
  name: string;
  mobile: string;
  area: string;
  cuisine: string;
  slot: string;
  capacity: string;
  experience: string;
  whyJoin: string;
}

const CUISINE_OPTIONS = [
  "Bengali (Veg)", "Bengali (Non-Veg)", "North Indian", "South Indian",
  "Chinese", "Biryani & Rice", "Snacks & Tiffin", "Sweets & Desserts", "Multiple Cuisines",
];

const MEAL_SLOTS = ["Breakfast (7–9 AM)", "Lunch (11 AM–1 PM)", "Dinner (6–8 PM)", "Multiple Slots"];

const defaultForm: PartnerFormData = {
  name: "", mobile: "", area: "", cuisine: CUISINE_OPTIONS[0],
  slot: MEAL_SLOTS[0], capacity: "10", experience: "", whyJoin: "",
};

function buildWAMessage(d: PartnerFormData): string {
  const msg = `🍳 *New Food Partner Application — Tiffin Hub*

👤 *Name:* ${d.name}
📱 *Mobile:* ${d.mobile}
📍 *Area:* ${d.area}
🍽️ *Cuisine Specialty:* ${d.cuisine}
⏰ *Preferred Meal Slot:* ${d.slot}
🔢 *Daily Capacity (meals):* ${d.capacity}
👩‍🍳 *Cooking Experience:* ${d.experience || "Not mentioned"}
💬 *Why Join Tiffin Hub:* ${d.whyJoin || "Not mentioned"}

Please reach out to this applicant soon. Thank you!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function saveApplication(data: PartnerFormData): void {
  if (typeof window === "undefined") return;
  const existing = JSON.parse(localStorage.getItem("tiffinhub_partner_applications") || "[]");
  existing.unshift({ ...data, id: Date.now(), createdAt: new Date().toISOString() });
  localStorage.setItem("tiffinhub_partner_applications", JSON.stringify(existing.slice(0, 50)));
}

function SuccessModal({ data, onClose }: { data: PartnerFormData; onClose: () => void }) {
  const fields = [
    { label: "Name", value: data.name },
    { label: "Mobile", value: data.mobile },
    { label: "Area", value: data.area },
    { label: "Cuisine", value: data.cuisine },
    { label: "Meal Slot", value: data.slot },
    { label: "Daily Capacity", value: `${data.capacity} meals` },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="rounded-t-3xl p-6 text-center border-b border-pink-100 relative"
          style={{ background: "linear-gradient(135deg, #fdf2f8, #fff7ed)" }}>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-100 text-stone-400 transition-colors">
            <X size={18} />
          </button>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
            style={{ background: "linear-gradient(135deg,#ec4899,#f97316)" }}>
            <CheckCircle className="text-white" size={32} />
          </div>
          <h2 className="text-xl font-bold text-stone-800">Application Received! 🎉</h2>
          <p className="text-stone-500 text-sm mt-1">Our team will call you within 24 hours.</p>
        </div>
        <div className="p-6">
          <div className="space-y-3 mb-6">
            {fields.map((f) => (
              <div key={f.label} className="flex justify-between items-start gap-4 py-2 border-b border-stone-100 last:border-0">
                <span className="text-sm text-stone-500 shrink-0">{f.label}</span>
                <span className="text-sm font-medium text-stone-800 text-right">{f.value}</span>
              </div>
            ))}
          </div>
          <a href={buildWAMessage(data)} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full text-white py-3.5 rounded-2xl font-semibold transition-all hover:scale-[1.02] shadow-md mb-3"
            style={{ background: "#25D366" }}>
            <MessageCircle size={20} /> Confirm on WhatsApp
          </a>
          <button onClick={onClose} className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 py-3 rounded-2xl font-semibold transition-colors text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PartnerForm() {
  const [form, setForm] = useState<PartnerFormData>(defaultForm);
  const [errors, setErrors] = useState<Partial<PartnerFormData>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#apply") {
      const timer = setTimeout(() => {
        document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const set = (k: keyof PartnerFormData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = (): boolean => {
    const e: Partial<PartnerFormData> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^\d{10}$/.test(form.mobile)) e.mobile = "Enter a valid 10-digit number";
    if (!form.area.trim()) e.area = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    saveApplication(form);
    setSubmitted(true);
  };

  const fc = (err?: string) =>
    `w-full rounded-xl border-2 px-4 py-3 text-stone-800 placeholder-stone-400 focus:outline-none transition-colors text-sm ${err ? "border-red-300 bg-red-50" : "border-stone-200 bg-white focus:border-pink-400 hover:border-stone-300"}`;

  const Label = ({ text, optional = false }: { text: string; optional?: boolean }) => (
    <label className="block text-sm font-semibold text-stone-700 mb-1.5">
      {text} {optional ? <span className="text-stone-400 font-normal">(optional)</span> : <span className="text-pink-500">*</span>}
    </label>
  );

  return (
    <>
      <section id="apply" className="section-pad bg-[#FFF9F0]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-200 rounded-full px-4 py-1.5 text-sm font-medium text-pink-700 mb-4">
              📝 Apply Now
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-3">
              Join the{" "}
              <span style={{ background: "linear-gradient(135deg,#ec4899,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Tiffin Hub Family
              </span>
            </h2>
            <p className="text-stone-500 text-lg">Fill in your details. We&apos;ll call you within 24 hours. No commitment required.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="bg-white rounded-3xl shadow-xl border border-pink-100 p-6 sm:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label text="Full Name" />
                <input type="text" placeholder="Sunita Dey" value={form.name} onChange={(e) => set("name", e.target.value)} className={fc(errors.name)} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label text="Mobile Number" />
                <input type="tel" placeholder="9876543210" maxLength={10} value={form.mobile} onChange={(e) => set("mobile", e.target.value.replace(/\D/g, ""))} className={fc(errors.mobile)} />
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
              </div>
            </div>

            <div>
              <Label text="Your Area / Locality" />
              <input type="text" placeholder="e.g. Bhatpara, Naihati, Kankinara..." value={form.area} onChange={(e) => set("area", e.target.value)} className={fc(errors.area)} />
              {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label text="Cuisine Specialty" />
                <select value={form.cuisine} onChange={(e) => set("cuisine", e.target.value)} className={fc()}>
                  {CUISINE_OPTIONS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <Label text="Preferred Meal Slot" />
                <select value={form.slot} onChange={(e) => set("slot", e.target.value)} className={fc()}>
                  {MEAL_SLOTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <Label text="Daily Meal Capacity (approx.)" />
              <input type="number" min="1" max="200" placeholder="e.g. 20" value={form.capacity} onChange={(e) => set("capacity", e.target.value)} className={fc()} />
            </div>

            <div>
              <Label text="Cooking Experience" optional />
              <textarea rows={2} placeholder="e.g. 10 years home cooking, used to cook for events..." value={form.experience} onChange={(e) => set("experience", e.target.value)} className={fc()} />
            </div>

            <div>
              <Label text="Why do you want to join Tiffin Hub?" optional />
              <textarea rows={2} placeholder="Share your story or motivation..." value={form.whyJoin} onChange={(e) => set("whyJoin", e.target.value)} className={fc()} />
            </div>

            <button type="submit"
              className="w-full flex items-center justify-center gap-2 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg hover:scale-[1.02] mt-2"
              style={{ background: "linear-gradient(135deg,#ec4899,#f97316)", boxShadow: "0 10px 30px rgba(236,72,153,0.3)" }}>
              <Send size={20} /> Submit My Application
            </button>

            <p className="text-center text-xs text-stone-400">
              By submitting, you agree to be contacted by our team. No spam, ever.
            </p>
          </form>

          <div className="mt-6 bg-white rounded-2xl border border-pink-100 p-5 text-center shadow-sm">
            <p className="text-stone-500 text-sm mb-3">Prefer to reach out directly?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:hr@digitalindian.co.in"
                className="flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                ✉️ hr@digitalindian.co.in
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                style={{ background: "#25D366" }}>
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {submitted && (
        <SuccessModal data={form} onClose={() => { setSubmitted(false); setForm(defaultForm); }} />
      )}
    </>
  );
}
