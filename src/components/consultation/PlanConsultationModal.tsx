"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, ChevronDown, ArrowRight, Info, CheckCircle2, Check } from "lucide-react";

export interface PlanConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlanConsultationModal({
  isOpen,
  onClose,
}: PlanConsultationModalProps) {
  const [consultationType, setConsultationType] = useState<"clinic" | "online">("clinic");
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [service, setService] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Close on Escape key & lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName("");
    setMobileNumber("");
    setService("");
    setPreferredDate("");
    setPreferredTime("");
    setEmail("");
    setMessage("");
    setAgreed(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-[2px] transition-all animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${
          submitted ? "max-w-[490px]" : "max-w-[620px]"
        } rounded-2xl bg-white border border-[#E5DFD5] shadow-2xl px-4 py-4 sm:px-6 sm:py-5 text-[#22332A] transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div>
            {/* Top Header: Centered Logo + Close Button */}
            <div className="relative flex items-center justify-center">
              <img
                src="/lo.webp"
                alt="Vaidhyashala - Ayurvedic Clinic & Panchakarma Centre"
                className="h-8 sm:h-9 w-auto object-contain mix-blend-multiply"
              />

              <button
                type="button"
                onClick={handleReset}
                aria-label="Close dialog"
                className="absolute right-0 top-0 p-1 rounded-md text-[#4A5D52] hover:text-[#0D3226] hover:bg-[#F4F1EA] transition-colors"
              >
                <X className="w-4.5 h-4.5 stroke-[1.8]" />
              </button>
            </div>

            {/* Checkmark Circle */}
            <div className="mt-4 flex justify-center">
              <div className="h-15 w-15 rounded-full bg-[#E3EBDC] flex items-center justify-center">
                <Check className="w-8 h-8 text-[#0C3527] stroke-[2.8]" />
              </div>
            </div>

            {/* Eyebrow */}
            <span className="mt-3 block text-[11px] font-bold tracking-[0.16em] uppercase text-[#A58252] font-sans text-center">
              REQUEST RECEIVED
            </span>

            {/* Main Headline */}
            <h2 className="mt-1 font-serif text-[28px] sm:text-[32px] font-normal leading-[1.14] text-[#0A291E] tracking-tight text-center">
              Thank you for reaching out.
            </h2>

            {/* Paragraph */}
            <p className="mt-1.5 text-[13px] sm:text-[13.5px] text-[#55695E] leading-normal max-w-sm mx-auto text-center">
              Your appointment request has been received. Our clinic team will contact you to discuss availability and confirm your visit.
            </p>

            {/* Awaiting Confirmation Notice Box */}
            <div className="mt-4 rounded-xl bg-[#F4F7F2] border border-[#DEE7DC] p-3.5 flex items-center gap-3 text-left">
              <div className="h-11 w-11 rounded-lg bg-[#E2ECDD] flex items-center justify-center shrink-0">
                <svg
                  className="w-5.5 h-5.5 text-[#1A4535]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <circle cx="8" cy="15" r="1" fill="currentColor" />
                  <circle cx="12" cy="15" r="1" fill="currentColor" />
                  <circle cx="16" cy="15" r="1" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-[14.5px] sm:text-[15px] font-medium text-[#0A291E]">
                  Awaiting clinic confirmation
                </h4>
                <p className="text-[12px] sm:text-[12.5px] text-[#55695E] mt-0.5">
                  Your preferred date and time are not confirmed yet.
                </p>
              </div>
            </div>

            {/* What Happens Next Section */}
            <div className="mt-4 text-left">
              <span className="block text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#A58252] font-sans">
                WHAT HAPPENS NEXT?
              </span>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-5.5 h-5.5 rounded-full bg-[#E2ECDD] text-[#0E382B] font-bold text-[11.5px] flex items-center justify-center shrink-0">
                    1
                  </span>
                  <span className="text-[13px] text-[#2C3E34]">
                    Our team reviews your request.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5.5 h-5.5 rounded-full bg-[#E2ECDD] text-[#0E382B] font-bold text-[11.5px] flex items-center justify-center shrink-0">
                    2
                  </span>
                  <span className="text-[13px] text-[#2C3E34]">
                    We contact you to confirm an available slot.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5.5 h-5.5 rounded-full bg-[#E2ECDD] text-[#0E382B] font-bold text-[11.5px] flex items-center justify-center shrink-0">
                    3
                  </span>
                  <span className="text-[13px] text-[#2C3E34]">
                    You receive your appointment details.
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex flex-col items-center">
              <button
                type="button"
                onClick={handleReset}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A3527] py-2.5 px-4 text-[13.5px] sm:text-[14px] font-semibold text-white shadow-xs transition-all hover:bg-[#124534] cursor-pointer"
              >
                <span>Back to Website</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="mt-2 text-[12.5px] sm:text-[13px] font-medium text-[#46594F] hover:text-[#0A291E] hover:underline cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-2.5">
            {/* Top Header: Logo + Close Button */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <img
                  src="/lo.webp"
                  alt="Vaidhyashala - Ayurvedic Clinic & Panchakarma Centre"
                  className="h-7 sm:h-8 w-auto object-contain mix-blend-multiply"
                />
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="p-1 rounded-md text-[#4A5D52] hover:text-[#0D3226] hover:bg-[#F4F1EA] transition-colors"
              >
                <X className="w-4.5 h-4.5 stroke-[1.8]" />
              </button>
            </div>
            {/* Eyebrow */}
            <span className="block text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#A58252] font-sans">
              Appointment Request
            </span>

            {/* Main Headline */}
            <h2
              id="consultation-title"
              className="mt-0.5 font-serif text-[26px] sm:text-[30px] font-normal leading-tight text-[#0A291E] tracking-tight"
            >
              Plan your consultation.
            </h2>

            {/* Subheading */}
            <p className="mt-0.5 text-[12.5px] sm:text-[13px] text-[#55695E] font-normal leading-tight">
              Share your preferred visit details. Our team will contact you to confirm availability.
            </p>

            {/* Consultation Type Toggle Buttons */}
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-3">
              {/* Clinic Visit Option */}
              <button
                type="button"
                onClick={() => setConsultationType("clinic")}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[13px] sm:text-[13.5px] font-medium transition-all ${
                  consultationType === "clinic"
                    ? "bg-[#D5E1D3] text-[#0E3526] border border-[#BFD1BD] shadow-2xs"
                    : "bg-white text-[#4A5E52] border border-[#DDD7CD] hover:bg-[#FAF8F3]"
                }`}
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21h18" />
                  <path d="M5 21V6.5L12 3l7 3.5V21" />
                  <path d="M12 9v4" />
                  <path d="M10 11h4" />
                  <path d="M9 17h6" />
                  <path d="M9 21v-4h6v4" />
                </svg>
                <span>Clinic Visit</span>
              </button>

              {/* Online Consultation Option */}
              <button
                type="button"
                onClick={() => setConsultationType("online")}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[13px] sm:text-[13.5px] font-medium transition-all ${
                  consultationType === "online"
                    ? "bg-[#D5E1D3] text-[#0E3526] border border-[#BFD1BD] shadow-2xs"
                    : "bg-white text-[#4A5E52] border border-[#DDD7CD] hover:bg-[#FAF8F3]"
                }`}
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <path d="M2 20h20" />
                </svg>
                <span>Online Consultation</span>
              </button>
            </div>

            {/* Form Fields Grid */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-3.5 gap-y-2.5">
              {/* Full Name */}
              <div>
                <label className="block text-[12px] font-medium text-[#1E382B] mb-1">
                  Full name <span className="text-[#BA2B2B]">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full h-[36px] px-3 text-[13px] text-[#1E382B] placeholder-[#95A39B] bg-white border border-[#D8D2C6] rounded-md outline-none transition-all focus:border-[#0A3527] focus:ring-1 focus:ring-[#0A3527]"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-[12px] font-medium text-[#1E382B] mb-1">
                  Mobile number <span className="text-[#BA2B2B]">*</span>
                </label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Your mobile number"
                  className="w-full h-[36px] px-3 text-[13px] text-[#1E382B] placeholder-[#95A39B] bg-white border border-[#D8D2C6] rounded-md outline-none transition-all focus:border-[#0A3527] focus:ring-1 focus:ring-[#0A3527]"
                />
              </div>

              {/* Service Select */}
              <div>
                <label className="block text-[12px] font-medium text-[#1E382B] mb-1">
                  Service <span className="text-[#BA2B2B]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={`w-full h-[36px] appearance-none px-3 pr-8 text-[13px] bg-white border border-[#D8D2C6] rounded-md outline-none transition-all focus:border-[#0A3527] focus:ring-1 focus:ring-[#0A3527] cursor-pointer ${
                      service ? "text-[#1E382B]" : "text-[#95A39B]"
                    }`}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option value="ayurvedic-consultation">Ayurvedic Doctor Consultation</option>
                    <option value="panchakarma-therapies">Panchakarma Therapies</option>
                    <option value="chronic-care">Chronic Care &amp; Health Concerns</option>
                    <option value="yoga-lifestyle">Yoga &amp; Lifestyle Guidance</option>
                    <option value="medicines-products">Medicines &amp; Products Consultation</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6A7C72]" />
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-[12px] font-medium text-[#1E382B] mb-1">
                  Preferred date <span className="text-[#BA2B2B]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full h-[36px] px-3 pr-8 flex items-center bg-white border border-[#D8D2C6] rounded-md text-[13px]">
                    <span className={preferredDate ? "text-[#1E382B]" : "text-[#95A39B]"}>
                      {preferredDate || "Choose a date"}
                    </span>
                  </div>
                  <Calendar className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6A7C72]" />
                </div>
              </div>

              {/* Preferred Time Select */}
              <div>
                <label className="block text-[12px] font-medium text-[#1E382B] mb-1">
                  Preferred time <span className="text-[#BA2B2B]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className={`w-full h-[36px] appearance-none px-3 pr-8 text-[13px] bg-white border border-[#D8D2C6] rounded-md outline-none transition-all focus:border-[#0A3527] focus:ring-1 focus:ring-[#0A3527] cursor-pointer ${
                      preferredTime ? "text-[#1E382B]" : "text-[#95A39B]"
                    }`}
                  >
                    <option value="" disabled>
                      Select a preferred slot
                    </option>
                    <option value="morning">Morning (09:00 AM – 12:00 PM)</option>
                    <option value="afternoon">Afternoon (12:00 PM – 03:00 PM)</option>
                    <option value="evening">Evening (03:00 PM – 07:00 PM)</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6A7C72]" />
                </div>
              </div>

              {/* Email (optional) */}
              <div>
                <label className="block text-[12px] font-medium text-[#1E382B] mb-1">
                  Email <span className="text-[#78887F] font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full h-[36px] px-3 text-[13px] text-[#1E382B] placeholder-[#95A39B] bg-white border border-[#D8D2C6] rounded-md outline-none transition-all focus:border-[#0A3527] focus:ring-1 focus:ring-[#0A3527]"
                />
              </div>
            </div>

            {/* Health Concern / Message (optional) */}
            <div className="mt-2.5">
              <label className="block text-[12px] font-medium text-[#1E382B] mb-1">
                Health concern / message <span className="text-[#78887F] font-normal">(optional)</span>
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly tell us how we can help."
                className="w-full h-[52px] px-3 py-2 text-[13px] text-[#1E382B] placeholder-[#95A39B] bg-white border border-[#D8D2C6] rounded-md outline-none transition-all focus:border-[#0A3527] focus:ring-1 focus:ring-[#0A3527] resize-none"
              />
            </div>

            {/* Info Notice Box */}
            <div className="mt-2.5 rounded-md bg-[#FAF8F3] border border-[#E7E1D4] px-3 py-2 flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[#4A5D52] shrink-0" />
              <p className="text-[11.5px] sm:text-[12px] text-[#4A5D52] leading-tight">
                Your preferred date and time are a request. Your appointment is confirmed only after the clinic contacts you.
              </p>
            </div>

            {/* Agreement Checkbox */}
            <div className="mt-2.5 flex items-center gap-2">
              <label className="relative flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-[#C4BDB0] text-[#0A3527] focus:ring-[#0A3527] focus:ring-offset-0 cursor-pointer accent-[#0A3527]"
                />
                <span className="text-[12px] sm:text-[12.5px] text-[#33463C]">
                  I agree to be contacted about my appointment request.
                </span>
              </label>
            </div>

            {/* Bottom Actions Row */}
            <div className="mt-3 pt-2.5 border-t border-[#EDE7DD] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <span className="text-[11px] text-[#7A8A81]">
                Please avoid sharing reports or sensitive medical details in this form.
              </span>

              <div className="flex items-center justify-end gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-md border border-[#D4CDC0] bg-white hover:bg-[#FAF8F3] text-[13px] font-medium text-[#1E382B] transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md text-[13px] font-medium text-white transition-all shadow-xs bg-[#0A3527] hover:bg-[#124534] cursor-pointer"
                >
                  <span>Request Appointment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
