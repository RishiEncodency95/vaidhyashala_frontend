"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { usePanchakarma } from "@/lib/panchakarmaPage";
import { postCmsPage } from "@/lib/cmsPage";

export default function RequestConsultationForm() {
  const { requestForm } = usePanchakarma();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // Today's date for the date picker's minimum; read in the browser only, never while prerendering
  const [today, setToday] = useState("");
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    therapy: "",
    date: "",
  });

  if (!requestForm) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await postCmsPage("panchakarma/consultation-requests", {
        name: formData.name,
        mobile: formData.mobile,
        ...(formData.therapy ? { therapy: formData.therapy } : {}),
        ...(formData.date ? { preferredDate: formData.date } : {}),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="consultation" className="w-full bg-[#FAF8F3] pt-2.5 sm:pt-3 pb-2.5 sm:pb-3 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#E3DDCF] bg-white p-6 sm:p-8 lg:p-9 shadow-2xs">
          {/* Form Header */}
          <div className="max-w-2xl">
            <h2 className="font-serif text-[26px] sm:text-[30px] font-medium leading-tight text-[#0D3226]">
              {requestForm.heading}
            </h2>
            <p className="mt-1 text-[13.5px] sm:text-[14px] font-medium text-[#5A6860]">
              {requestForm.description}
            </p>
          </div>

          {submitted ? (
            <div className="mt-6 rounded-lg bg-[#F2F7F3] border border-[#C5DDCB] p-5 text-center">
              <h3 className="font-serif text-[18px] font-medium text-[#0D3226]">
                {requestForm.successTitle}
              </h3>
              <p className="mt-1 text-[13.5px] text-[#4A5950]">
                {requestForm.successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                {/* Name */}
                <div>
                  <label className="block text-[12px] font-semibold uppercase tracking-wider text-[#4A5950] mb-1.5">
                    {requestForm.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={requestForm.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-md border border-[#D5CEC0] bg-[#FAF8F3]/60 px-3.5 py-2.5 text-[13.5px] text-[#1F3327] placeholder-[#8A958D] focus:border-[#0D3226] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-[12px] font-semibold uppercase tracking-wider text-[#4A5950] mb-1.5">
                    {requestForm.mobileLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={requestForm.mobilePlaceholder}
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full rounded-md border border-[#D5CEC0] bg-[#FAF8F3]/60 px-3.5 py-2.5 text-[13.5px] text-[#1F3327] placeholder-[#8A958D] focus:border-[#0D3226] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                {/* Therapy of interest */}
                <div>
                  <label className="block text-[12px] font-semibold uppercase tracking-wider text-[#4A5950] mb-1.5">
                    {requestForm.therapyLabel}
                  </label>
                  <select
                    value={formData.therapy}
                    onChange={(e) => setFormData({ ...formData, therapy: e.target.value })}
                    className="w-full rounded-md border border-[#D5CEC0] bg-[#FAF8F3]/60 px-3.5 py-2.5 text-[13.5px] text-[#1F3327] focus:border-[#0D3226] focus:bg-white focus:outline-none transition-colors"
                  >
                    <option value="">{requestForm.therapyPlaceholder}</option>
                    {requestForm.items.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred date */}
                <div>
                  <label className="block text-[12px] font-semibold uppercase tracking-wider text-[#4A5950] mb-1.5">
                    {requestForm.dateLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={today}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-md border border-[#D5CEC0] bg-[#FAF8F3]/60 px-3.5 py-2.5 text-[13.5px] text-[#1F3327] focus:border-[#0D3226] focus:bg-white focus:outline-none transition-colors"
                    />
                    <Calendar className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A958D]" />
                  </div>
                </div>
              </div>

              {/* Submit Button Row */}
              {error && <p className="mt-4 text-right text-[13px] font-medium text-red-700">{error}</p>}
              <div className="mt-5 flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="group disabled:opacity-60 inline-flex items-center gap-2 rounded-md bg-[#0A3527] px-6 sm:px-7 py-3 text-[14px] font-semibold text-white shadow-xs transition-all hover:bg-[#124534]"
                >
                  <span>{submitting ? "Sending..." : requestForm.buttonLabel}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
