"use client";

import React, { useState } from "react";
import { ArrowRight, Upload } from "lucide-react";
import { useTestimonialsPage } from "@/lib/testimonialsPage";
import { API_BASE, assetUrl } from "@/lib/home2";

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    service: "",
    experience: "",
    feedback: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { feedbackForm } = useTestimonialsPage();
  if (!feedbackForm) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/website/testimonials/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          ...(formData.mobile ? { mobile: formData.mobile } : {}),
          ...(formData.email ? { email: formData.email } : {}),
          service: formData.service,
          ...(formData.experience ? { experience: formData.experience } : {}),
          feedback: formData.feedback,
          consentToPublish: formData.consent,
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        const detail = Array.isArray(json?.errors) && json.errors.length ? String(json.errors[0]) : "";
        throw new Error(detail || json?.message || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const experienceOptions = feedbackForm.experienceOptions
    .split("\n")
    .map((o) => o.trim())
    .filter(Boolean);

  return (
    <section className="relative overflow-hidden w-full bg-[#FAF8F3] py-5 sm:py-6 lg:py-7 border-b border-[#ECE6DB]">
      {/* Botanical leaf watermark in the background of the left area */}
      <div className="pointer-events-none absolute -bottom-10 -left-10 sm:-bottom-16 sm:-left-16 w-[360px] sm:w-[460px] lg:w-[540px] opacity-25 lg:opacity-30 select-none z-0">
        {feedbackForm.decorativeImage && (
          <img
            src={assetUrl(feedbackForm.decorativeImage)}
            alt=""
            className="w-full h-auto object-contain"
          />
        )}
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-[36px] sm:text-[42px] font-semibold leading-[1.12] text-[#0A291F]">
              {feedbackForm.heading}
            </h2>

            <p className="mt-3 text-[15.5px] sm:text-[16.5px] font-medium leading-[1.65] text-[#3D4C42] max-w-md">
              {feedbackForm.description}
            </p>
          </div>

          {/* Right Column: Feedback Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#ECE5D8] bg-[#F7F4EC] p-5 sm:p-7 shadow-2xs">
              {submitted ? (
                <div className="rounded-lg bg-[#EFE9DF] p-8 text-center">
                  <h3 className="font-serif text-[24px] font-semibold text-[#0A291F]">
                    {feedbackForm.successTitle}
                  </h3>
                  <p className="mt-2 text-[15px] font-medium text-[#4A5B52]">
                    {feedbackForm.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Full name & Mobile number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[14px] sm:text-[14.5px] font-semibold text-[#24362C] mb-1.5">
                        {feedbackForm.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={feedbackForm.namePlaceholder}
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full rounded-md border border-[#D5CDC0] bg-white px-3.5 py-2.5 text-[14.5px] sm:text-[15px] font-medium text-[#22332A] placeholder-[#8C988F] focus:border-[#0A291F] focus:outline-none shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[14px] sm:text-[14.5px] font-semibold text-[#24362C] mb-1.5">
                        {feedbackForm.mobileLabel}
                      </label>
                      <input
                        type="tel"
                        placeholder={feedbackForm.mobilePlaceholder}
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full rounded-md border border-[#D5CDC0] bg-white px-3.5 py-2.5 text-[14.5px] sm:text-[15px] font-medium text-[#22332A] placeholder-[#8C988F] focus:border-[#0A291F] focus:outline-none shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Service used */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[14px] sm:text-[14.5px] font-semibold text-[#24362C] mb-1.5">
                        {feedbackForm.emailLabel}
                      </label>
                      <input
                        type="email"
                        placeholder={feedbackForm.emailPlaceholder}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-md border border-[#D5CDC0] bg-white px-3.5 py-2.5 text-[14.5px] sm:text-[15px] font-medium text-[#22332A] placeholder-[#8C988F] focus:border-[#0A291F] focus:outline-none shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[14px] sm:text-[14.5px] font-semibold text-[#24362C] mb-1.5">
                        {feedbackForm.serviceLabel}
                      </label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full rounded-md border border-[#D5CDC0] bg-white px-3.5 py-2.5 text-[14.5px] sm:text-[15px] font-medium text-[#22332A] focus:border-[#0A291F] focus:outline-none shadow-2xs"
                      >
                        <option value="">{feedbackForm.servicePlaceholder}</option>
                        {feedbackForm.items.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Overall experience */}
                  <div>
                    <label className="block text-[14px] sm:text-[14.5px] font-semibold text-[#24362C] mb-1.5">
                      {feedbackForm.experienceLabel}
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full rounded-md border border-[#D5CDC0] bg-white px-3.5 py-2.5 text-[14.5px] sm:text-[15px] font-medium text-[#22332A] focus:border-[#0A291F] focus:outline-none shadow-2xs"
                    >
                      <option value="">{feedbackForm.experiencePlaceholder}</option>
                      {experienceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 4: Your feedback */}
                  <div>
                    <label className="block text-[14px] sm:text-[14.5px] font-semibold text-[#24362C] mb-1.5">
                      {feedbackForm.feedbackLabel}
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder={feedbackForm.feedbackPlaceholder}
                      value={formData.feedback}
                      onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                      className="w-full rounded-md border border-[#D5CDC0] bg-white px-3.5 py-2.5 text-[14.5px] sm:text-[15px] font-medium text-[#22332A] placeholder-[#8C988F] focus:border-[#0A291F] focus:outline-none shadow-2xs"
                    />
                  </div>

                  {/* Row 5: Upload media box */}
                  <div className="rounded-md border border-dashed border-[#C5BDAF] bg-white/70 p-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-[#D5CDC0] bg-[#FAF8F3] text-[#0A291F]">
                        <Upload className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="block text-[14px] font-semibold text-[#22332A]">
                          {feedbackForm.uploadLabel}
                        </span>
                        <span className="block text-[12.5px] font-medium text-[#68766F]">
                          {feedbackForm.uploadHint}
                        </span>
                      </div>
                    </div>
                    <span className="text-[12px] font-medium text-[#68766F] italic sm:text-right">
                      {feedbackForm.publicationNote}
                    </span>
                  </div>

                  {error && <p className="text-[13.5px] font-medium text-red-700">{error}</p>}

                  {/* Row 6: Consent checkbox & Submit button row */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <label className="flex items-start gap-2.5 cursor-pointer max-w-md">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-0.5 h-4.5 w-4.5 rounded border-[#C5BDAF] text-[#0A291F] focus:ring-[#0A291F]"
                      />
                      <span className="text-[13px] sm:text-[13.5px] font-medium text-[#3D4C42] leading-snug">
                        {feedbackForm.consentLabel}{" "}
                        <span className="block text-[#68766F] font-normal">Your contact details will not be displayed publicly.</span>
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group disabled:opacity-60 inline-flex items-center justify-center gap-2 rounded-md bg-[#0A291F] px-7 py-3 text-[15.5px] font-bold text-white shadow-xs transition-all hover:bg-[#154536] flex-shrink-0"
                    >
                      <span>{submitting ? "Sending..." : feedbackForm.buttonLabel}</span>
                      <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
