"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useContactPage } from "@/lib/contactPage";
import { postCmsPage } from "@/lib/cmsPage";
import { assetUrl } from "@/lib/home2";

export default function EnquiryAndVisit() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    enquiryAbout: "",
    message: "",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { enquiryForm, planVisit } = useContactPage();
  if (!enquiryForm && !planVisit) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      setError("Please agree to be contacted about your enquiry.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await postCmsPage("contact/enquiries", {
        name: formData.name,
        mobile: formData.mobile,
        ...(formData.email ? { email: formData.email } : {}),
        enquiryAbout: formData.enquiryAbout,
        message: formData.message,
        consent: true,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-[#FAF7F2] py-4 sm:py-5 lg:py-6 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-10 items-stretch">
          {/* Left Column: Send us an enquiry form */}
          {enquiryForm && (
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#E3DDCF] bg-white p-5 sm:p-7 lg:p-8 shadow-2xs">
            <div>
              <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
                {enquiryForm.eyebrow}
              </span>
              <h2 className="mt-1 font-serif text-[28px] sm:text-[32px] lg:text-[36px] font-medium leading-[1.14] text-[#0D3226]">
                {enquiryForm.heading}
              </h2>
              <p className="mt-1 text-[13.5px] sm:text-[14px] font-medium text-[#5A6860]">
                {enquiryForm.description}
              </p>

              {submitted ? (
                <div className="mt-6 rounded-lg bg-[#F2F7F3] border border-[#C5DDCB] p-6 text-center">
                  <h3 className="font-serif text-[18px] font-medium text-[#0D3226]">
                    {enquiryForm.successTitle}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] text-[#4A5950]">
                    {enquiryForm.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                  {/* Row 1: Full name & Mobile number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[12px] font-semibold text-[#4A5950] mb-1">
                        {enquiryForm.nameLabel} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={enquiryForm.namePlaceholder}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-md border border-[#D5CEC0] bg-[#FAF8F3]/60 px-3.5 py-2.5 text-[13.5px] text-[#1F3327] placeholder-[#8A958D] focus:border-[#0D3226] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[#4A5950] mb-1">
                        {enquiryForm.mobileLabel} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder={enquiryForm.mobilePlaceholder}
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full rounded-md border border-[#D5CEC0] bg-[#FAF8F3]/60 px-3.5 py-2.5 text-[13.5px] text-[#1F3327] placeholder-[#8A958D] focus:border-[#0D3226] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Enquiry about */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[12px] font-semibold text-[#4A5950] mb-1">
                        {enquiryForm.emailLabel}
                      </label>
                      <input
                        type="email"
                        placeholder={enquiryForm.emailPlaceholder}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-md border border-[#D5CEC0] bg-[#FAF8F3]/60 px-3.5 py-2.5 text-[13.5px] text-[#1F3327] placeholder-[#8A958D] focus:border-[#0D3226] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[#4A5950] mb-1">
                        {enquiryForm.enquiryAboutLabel} <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.enquiryAbout}
                        onChange={(e) => setFormData({ ...formData, enquiryAbout: e.target.value })}
                        className="w-full rounded-md border border-[#D5CEC0] bg-[#FAF8F3]/60 px-3.5 py-2.5 text-[13.5px] text-[#1F3327] focus:border-[#0D3226] focus:bg-white focus:outline-none transition-colors"
                      >
                        <option value="">{enquiryForm.enquiryAboutPlaceholder}</option>
                        {enquiryForm.items.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Your message */}
                  <div>
                    <label className="block text-[12px] font-semibold text-[#4A5950] mb-1">
                      {enquiryForm.messageLabel} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder={enquiryForm.messagePlaceholder}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-md border border-[#D5CEC0] bg-[#FAF8F3]/60 px-3.5 py-2.5 text-[13.5px] text-[#1F3327] placeholder-[#8A958D] focus:border-[#0D3226] focus:bg-white focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {error && <p className="text-[13px] font-medium text-red-700">{error}</p>}

                  {/* Row 4: Agreement Checkbox & Submit Button */}
                  <div className="pt-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                    <label className="flex items-center gap-2.5 cursor-pointer text-[12.5px] text-[#4A5950]">
                      <input
                        type="checkbox"
                        checked={formData.agree}
                        onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                        className="h-4 w-4 rounded border-[#D5CEC0] text-[#0A3527] focus:ring-[#0A3527]"
                      />
                      <span>{enquiryForm.consentLabel}</span>
                    </label>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group disabled:opacity-60 inline-flex items-center justify-center gap-2 rounded-md bg-[#0A3527] px-6 py-2.5 text-[13.5px] font-semibold text-white shadow-xs transition-all hover:bg-[#124534]"
                    >
                      <span>{submitting ? "Sending..." : enquiryForm.buttonLabel}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          )}

          {/* Right Column: Plan your visit card */}
          {planVisit && planVisit.image && (
            <div className="lg:col-span-5 flex flex-col rounded-2xl border border-[#E3DDCF] bg-[#FAF8F3] shadow-2xs overflow-hidden">
              <img
                src={assetUrl(planVisit.image)}
                alt={planVisit.imageAlt}
                className="w-full h-full object-cover object-center block"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
