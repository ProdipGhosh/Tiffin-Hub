"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Send, CheckCircle, X, AlertCircle, Upload, FileText, ChevronRight, ChevronLeft } from "lucide-react";

/* ──────────────── Types ──────────────── */
interface PersonalInfo {
  firstName: string; middleName: string; lastName: string;
  dob: string; mobile: string; altContact: string;
  emergencyContact: string; email: string;
}
interface AddressInfo { mainAddress: string; localAddress: string; sameAsMain: boolean; }
interface VehicleInfo {
  vehicleMake: string; fuelType: string; vehicleModel: string;
  engineNumber: string; chassisNumber: string; dlNumber: string;
  regNumber: string; regDate: string; insuranceNumber: string; insuranceValidTill: string;
}
interface UploadFile { file: File | null; preview: string | null; error: string; }
interface DocsInfo {
  passportPhoto: UploadFile; aadhaar: UploadFile; drivingLicense: UploadFile;
  vehicleReg: UploadFile; vehicleTax: UploadFile; vehicleInsurance: UploadFile;
}
const defaultUpload = (): UploadFile => ({ file: null, preview: null, error: "" });

const MAX_BYTES = 150 * 1024 * 1024;
function validateFile(file: File, type: "image" | "pdf"): string {
  if (file.size > MAX_BYTES) return "File must be under 150 MB";
  if (type === "image" && !["image/jpeg", "image/jpg", "image/png"].includes(file.type)) return "Only JPG/JPEG/PNG allowed";
  if (type === "pdf" && file.type !== "application/pdf") return "Only PDF format allowed";
  return "";
}
function fmtSize(b: number) {
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + " KB";
  return (b / (1024 * 1024)).toFixed(1) + " MB";
}

const STEPS_META = ["Personal Info", "Address", "Vehicle Details", "Documents"];

/* ── Field wrapper ── */
function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-stone-700 mb-1.5">
        {label} {required ? <span className="text-pink-500">*</span> : <span className="text-stone-400 font-normal"></span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

const fc = (err?: string) =>
  `w-full rounded-xl border-2 px-4 py-3 text-stone-800 placeholder-stone-400 focus:outline-none transition-colors text-sm ${err ? "border-red-300 bg-red-50" : "border-stone-200 bg-white focus:border-orange-400 hover:border-stone-300"}`;

/* ── File Upload Card ── */
function FileUploadCard({ label, accept, fileType, required, value, onChange }: {
  label: string; accept: string; fileType: "image" | "pdf";
  required?: boolean; value: UploadFile; onChange: (v: UploadFile) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const handleFile = (file: File) => {
    const err = validateFile(file, fileType);
    if (err) { onChange({ file: null, preview: null, error: err }); return; }
    if (fileType === "image") {
      const reader = new FileReader();
      reader.onload = (e) => onChange({ file, preview: e.target?.result as string, error: "" });
      reader.readAsDataURL(file);
    } else onChange({ file, preview: null, error: "" });
  };
  return (
    <div>
      <label className="block text-sm font-semibold text-stone-700 mb-1.5">
        {label} {required && <span className="text-pink-500">*</span>}
        <span className="text-stone-400 font-normal ml-1">({fileType === "image" ? "JPG/PNG" : "PDF"}, max 150 MB)</span>
      </label>
      {value.file ? (
        <div className="flex items-center gap-3 rounded-xl p-3 bg-green-50 border-2 border-green-200">
          {value.preview
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={value.preview} alt="preview" className="w-10 h-10 rounded-lg object-cover" />
            : <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><FileText size={18} className="text-orange-500" /></div>
          }
          <div className="flex-1 min-w-0">
            <p className="text-stone-800 text-sm font-medium truncate">{value.file.name}</p>
            <p className="text-green-600 text-xs">{fmtSize(value.file.size)} · Uploaded ✓</p>
          </div>
          <button onClick={() => onChange(defaultUpload())} className="p-1 rounded-lg hover:bg-red-100 text-stone-400 hover:text-red-500 transition-colors"><X size={14} /></button>
        </div>
      ) : (
        <div onClick={() => ref.current?.click()} onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }} onDragOver={(e) => e.preventDefault()}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all hover:border-orange-400 hover:bg-orange-50 ${value.error ? "border-red-300 bg-red-50" : "border-stone-300 bg-white"}`}>
          <Upload size={18} className="mx-auto mb-1.5 text-stone-400" />
          <p className="text-sm text-stone-500"><span className="text-orange-500 font-semibold">Click to upload</span> or drag & drop</p>
        </div>
      )}
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
      {value.error && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{value.error}</p>}
    </div>
  );
}

/* ── Step Bar ── */
function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between mb-8">
      {STEPS_META.map((label, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < current ? "bg-orange-500 text-white" : i === current ? "bg-orange-500 text-white ring-4 ring-orange-100" : "bg-stone-200 text-stone-500"}`}>
            {i < current ? <CheckCircle size={14} /> : i + 1}
          </div>
          <span className={`text-[10px] font-semibold hidden sm:block text-center leading-tight ${i <= current ? "text-orange-600" : "text-stone-400"}`}>{label}</span>
          {i < STEPS_META.length - 1 && (
            <div className="hidden sm:block absolute" style={{ display: "none" }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Success Modal ── */
function SuccessModal({ name, onClose }: { name: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
        <div className="rounded-t-3xl p-6 text-center border-b border-orange-100 relative" style={{ background: "linear-gradient(135deg, #fff7ed, #fef3c7)" }}>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-orange-100 text-stone-400 transition-colors"><X size={18} /></button>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg" style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
            <CheckCircle className="text-white" size={32} />
          </div>
          <h2 className="text-xl font-bold text-stone-800">Application Received! 🎉</h2>
          <p className="text-stone-500 text-sm mt-1">Welcome, {name}! Our team will contact you within 24–48 hours.</p>
        </div>
        <div className="p-6">
          <button onClick={onClose} className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 py-3 rounded-2xl font-semibold transition-colors text-sm">Close</button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Form ── */
export default function RiderRegisterForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [personal, setPersonal] = useState<PersonalInfo>({ firstName: "", middleName: "", lastName: "", dob: "", mobile: "", altContact: "", emergencyContact: "", email: "" });
  const [address, setAddress] = useState<AddressInfo>({ mainAddress: "", localAddress: "", sameAsMain: false });
  const [vehicle, setVehicle] = useState<VehicleInfo>({ vehicleMake: "", fuelType: "Petrol", vehicleModel: "", engineNumber: "", chassisNumber: "", dlNumber: "", regNumber: "", regDate: "", insuranceNumber: "", insuranceValidTill: "" });
  const [docs, setDocs] = useState<DocsInfo>({ passportPhoto: defaultUpload(), aadhaar: defaultUpload(), drivingLicense: defaultUpload(), vehicleReg: defaultUpload(), vehicleTax: defaultUpload(), vehicleInsurance: defaultUpload() });

  const sp = useCallback((k: keyof PersonalInfo, v: string) => { setPersonal(p => ({ ...p, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); }, []);
  const sa = useCallback((k: keyof AddressInfo, v: string | boolean) => {
    setAddress(a => {
      const next = { ...a, [k]: v };
      if (k === "sameAsMain" && v === true) next.localAddress = a.mainAddress;
      if (k === "mainAddress" && a.sameAsMain) next.localAddress = v as string;
      return next;
    });
    setErrors(e => ({ ...e, [k]: "" }));
  }, []);
  const sv = useCallback((k: keyof VehicleInfo, v: string) => { setVehicle(p => ({ ...p, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); }, []);
  const sd = useCallback((k: keyof DocsInfo, v: UploadFile) => { setDocs(d => ({ ...d, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); }, []);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!personal.firstName.trim()) e.firstName = "Required";
      if (!personal.lastName.trim()) e.lastName = "Required";
      if (!personal.dob) e.dob = "Required";
      if (!/^\d{10}$/.test(personal.mobile)) e.mobile = "Enter valid 10-digit number";
      if (!/^\d{10}$/.test(personal.emergencyContact)) e.emergencyContact = "Enter valid 10-digit number";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email)) e.email = "Enter valid email";
    }
    if (step === 1) {
      if (!address.mainAddress.trim()) e.mainAddress = "Required";
      if (!address.localAddress.trim()) e.localAddress = "Required";
    }
    if (step === 2) {
      if (!vehicle.vehicleMake.trim()) e.vehicleMake = "Required";
      if (!vehicle.vehicleModel.trim()) e.vehicleModel = "Required";
      if (!vehicle.engineNumber.trim()) e.engineNumber = "Required";
      if (!vehicle.chassisNumber.trim()) e.chassisNumber = "Required";
      if (!vehicle.dlNumber.trim()) e.dlNumber = "Required";
      if (!vehicle.regNumber.trim()) e.regNumber = "Required";
      if (!vehicle.regDate) e.regDate = "Required";
      if (!vehicle.insuranceNumber.trim()) e.insuranceNumber = "Required";
      if (!vehicle.insuranceValidTill) e.insuranceValidTill = "Required";
    }
    if (step === 3) {
      if (!docs.passportPhoto.file) e.passportPhoto = "Required";
      if (!docs.aadhaar.file) e.aadhaar = "Required";
      if (!docs.drivingLicense.file) e.drivingLicense = "Required";
      if (!docs.vehicleReg.file) e.vehicleReg = "Required";
      if (!docs.vehicleTax.file) e.vehicleTax = "Required";
      if (!docs.vehicleInsurance.file) e.vehicleInsurance = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);
  const handleSubmit = () => {
    if (!validate()) return;
    if (typeof window !== "undefined") {
      const data = { id: Date.now(), createdAt: new Date().toISOString(), ...personal, ...address, ...vehicle, docs: Object.fromEntries(Object.entries(docs).map(([k, v]) => [k, v.file?.name || null])) };
      const existing = JSON.parse(localStorage.getItem("tiffinhub_rider_applications") || "[]");
      existing.unshift(data);
      localStorage.setItem("tiffinhub_rider_applications", JSON.stringify(existing.slice(0, 50)));
    }
    setSubmitted(true);
  };

  return (
    <>
      <section id="register" className="section-pad bg-[#FFF9F0]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 text-sm font-medium text-orange-700 mb-4">
              📝 Apply Now
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-3">
              Join the{" "}
              <span style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Rider Family
              </span>
            </h2>
            <p className="text-stone-500 text-lg">Fill in your details in 4 simple steps. Takes less than 10 minutes.</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} noValidate
            className="bg-white rounded-3xl shadow-xl border border-orange-100 p-6 sm:p-8 space-y-5">
            <StepBar current={step} />

            {/* ── Step 1: Personal ── */}
            {step === 0 && (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-3 gap-4">
                  <Field label="First Name" required error={errors.firstName}>
                    <input type="text" placeholder="Rahul" value={personal.firstName} onChange={e => sp("firstName", e.target.value)} className={fc(errors.firstName)} />
                  </Field>
                  <Field label="Middle Name" error="">
                    <input type="text" placeholder="Kumar" value={personal.middleName} onChange={e => sp("middleName", e.target.value)} className={fc()} />
                  </Field>
                  <Field label="Last Name" required error={errors.lastName}>
                    <input type="text" placeholder="Singh" value={personal.lastName} onChange={e => sp("lastName", e.target.value)} className={fc(errors.lastName)} />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Date of Birth" required error={errors.dob}>
                    <input type="date" value={personal.dob} max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]} onChange={e => sp("dob", e.target.value)} className={fc(errors.dob)} />
                  </Field>
                  <Field label="Email Address" required error={errors.email}>
                    <input type="email" placeholder="you@email.com" value={personal.email} onChange={e => sp("email", e.target.value)} className={fc(errors.email)} />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Field label="Mobile Number" required error={errors.mobile}>
                    <input type="tel" placeholder="9876543210" maxLength={10} value={personal.mobile} onChange={e => sp("mobile", e.target.value.replace(/\D/g, ""))} className={fc(errors.mobile)} />
                  </Field>
                  <Field label="Alternate Contact" error="">
                    <input type="tel" placeholder="9876543210" maxLength={10} value={personal.altContact} onChange={e => sp("altContact", e.target.value.replace(/\D/g, ""))} className={fc()} />
                  </Field>
                  <Field label="Emergency Contact" required error={errors.emergencyContact}>
                    <input type="tel" placeholder="9876543210" maxLength={10} value={personal.emergencyContact} onChange={e => sp("emergencyContact", e.target.value.replace(/\D/g, ""))} className={fc(errors.emergencyContact)} />
                  </Field>
                </div>
              </div>
            )}

            {/* ── Step 2: Address ── */}
            {step === 1 && (
              <div className="space-y-5">
                <Field label="Main Address" required error={errors.mainAddress}>
                  <textarea rows={3} placeholder="House/Flat No., Street, Area, District, State, PIN" value={address.mainAddress} onChange={e => sa("mainAddress", e.target.value)} className={fc(errors.mainAddress) + " resize-none"} />
                </Field>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-semibold text-stone-700">Local Address <span className="text-pink-500">*</span></label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <div onClick={() => sa("sameAsMain", !address.sameAsMain)}
                        className="w-10 h-5 rounded-full relative transition-colors duration-200 cursor-pointer"
                        style={{ background: address.sameAsMain ? "#f97316" : "#e7e5e4" }}>
                        <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
                          style={{ transform: address.sameAsMain ? "translateX(22px)" : "translateX(2px)" }} />
                      </div>
                      <span className="text-xs text-stone-500 font-medium">Same as Main Address</span>
                    </label>
                  </div>
                  <textarea rows={3} placeholder="House/Flat No., Street, Area, District, State, PIN" value={address.localAddress} readOnly={address.sameAsMain} onChange={e => sa("localAddress", e.target.value)} className={(fc(errors.localAddress) + " resize-none") + (address.sameAsMain ? " opacity-60 cursor-not-allowed" : "")} />
                  {errors.localAddress && <p className="text-red-500 text-xs mt-1">{errors.localAddress}</p>}
                </div>
              </div>
            )}

            {/* ── Step 3: Vehicle ── */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-3 gap-4">
                  <Field label="Vehicle Make" required error={errors.vehicleMake}>
                    <input type="text" placeholder="Honda, TVS, Hero..." value={vehicle.vehicleMake} onChange={e => sv("vehicleMake", e.target.value)} className={fc(errors.vehicleMake)} />
                  </Field>
                  <Field label="Fuel Type" required error="">
                    <select value={vehicle.fuelType} onChange={e => sv("fuelType", e.target.value)} className={fc()}>
                      <option>Petrol</option><option>Diesel</option><option>Electric</option>
                    </select>
                  </Field>
                  <Field label="Vehicle Model" required error={errors.vehicleModel}>
                    <input type="text" placeholder="Activa 6G, Splendor..." value={vehicle.vehicleModel} onChange={e => sv("vehicleModel", e.target.value)} className={fc(errors.vehicleModel)} />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Engine Number" required error={errors.engineNumber}>
                    <input type="text" placeholder="JF50E1234567" value={vehicle.engineNumber} onChange={e => sv("engineNumber", e.target.value.toUpperCase())} className={fc(errors.engineNumber)} />
                  </Field>
                  <Field label="Chassis Number" required error={errors.chassisNumber}>
                    <input type="text" placeholder="ME4JF501XM1234567" value={vehicle.chassisNumber} onChange={e => sv("chassisNumber", e.target.value.toUpperCase())} className={fc(errors.chassisNumber)} />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Driving License Number" required error={errors.dlNumber}>
                    <input type="text" placeholder="DL-1420110012345" value={vehicle.dlNumber} onChange={e => sv("dlNumber", e.target.value.toUpperCase())} className={fc(errors.dlNumber)} />
                  </Field>
                  <Field label="Vehicle Registration Number" required error={errors.regNumber}>
                    <input type="text" placeholder="WB-12-AB-1234" value={vehicle.regNumber} onChange={e => sv("regNumber", e.target.value.toUpperCase())} className={fc(errors.regNumber)} />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Vehicle Registration Date" required error={errors.regDate}>
                    <input type="date" value={vehicle.regDate} onChange={e => sv("regDate", e.target.value)} className={fc(errors.regDate)} />
                  </Field>
                  <Field label="Insurance Number" required error={errors.insuranceNumber}>
                    <input type="text" placeholder="Policy number" value={vehicle.insuranceNumber} onChange={e => sv("insuranceNumber", e.target.value.toUpperCase())} className={fc(errors.insuranceNumber)} />
                  </Field>
                </div>
                <Field label="Insurance Valid Till" required error={errors.insuranceValidTill}>
                  <input type="date" value={vehicle.insuranceValidTill} min={new Date().toISOString().split("T")[0]} onChange={e => sv("insuranceValidTill", e.target.value)} className={fc(errors.insuranceValidTill) + " sm:w-1/2"} />
                </Field>
              </div>
            )}

            {/* ── Step 4: Documents ── */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3 mb-2">
                  <AlertCircle size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-orange-700 text-xs leading-relaxed">All documents are mandatory. Photo: JPG/JPEG/PNG only. All others: PDF only. Max 150 MB each.</p>
                </div>
                <div className="sm:col-span-2">
                  <FileUploadCard label="Passport Size Photo" accept="image/jpeg,image/jpg,image/png" fileType="image" required value={docs.passportPhoto} onChange={v => sd("passportPhoto", v)} />
                  {errors.passportPhoto && <p className="text-red-500 text-xs mt-1">{errors.passportPhoto}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { key: "aadhaar" as keyof DocsInfo, label: "Aadhaar Card" },
                    { key: "drivingLicense" as keyof DocsInfo, label: "Driving License" },
                    { key: "vehicleReg" as keyof DocsInfo, label: "Vehicle Registration" },
                    { key: "vehicleTax" as keyof DocsInfo, label: "Vehicle Tax" },
                    { key: "vehicleInsurance" as keyof DocsInfo, label: "Vehicle Insurance" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <FileUploadCard label={label} accept="application/pdf" fileType="pdf" required value={docs[key]} onChange={v => sd(key, v)} />
                      {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Navigation ── */}
            <div className={`flex gap-3 pt-2 ${step > 0 ? "justify-between" : "justify-end"}`}>
              {step > 0 && (
                <button type="button" onClick={back}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors">
                  <ChevronLeft size={16} /> Back
                </button>
              )}
              {step < 3 ? (
                <button type="button" onClick={next}
                  className="flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-2xl text-sm transition-all hover:scale-[1.02] shadow-lg"
                  style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", boxShadow: "0 8px 24px rgba(249,115,22,0.3)" }}>
                  Next Step <ChevronRight size={16} />
                </button>
              ) : (
                <button type="button" onClick={handleSubmit}
                  className="flex items-center gap-2 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-[1.02] shadow-lg"
                  style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", boxShadow: "0 10px 30px rgba(249,115,22,0.3)" }}>
                  <Send size={20} /> Submit My Application
                </button>
              )}
            </div>

            <p className="text-center text-xs text-stone-400">
              By submitting, you agree to be contacted by our team. No spam, ever.
            </p>
          </form>

          <div className="mt-6 bg-white rounded-2xl border border-orange-100 p-5 text-center shadow-sm">
            <p className="text-stone-500 text-sm mb-3">Already registered?</p>
            <Link href="/rider/login"
              className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
              🔑 Login to your Rider Account
            </Link>
          </div>
        </div>
      </section>

      {submitted && (
        <SuccessModal name={`${personal.firstName} ${personal.lastName}`} onClose={() => { setSubmitted(false); setStep(0); setPersonal({ firstName: "", middleName: "", lastName: "", dob: "", mobile: "", altContact: "", emergencyContact: "", email: "" }); }} />
      )}
    </>
  );
}
