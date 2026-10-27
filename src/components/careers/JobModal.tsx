"use client";

import React, { useState } from "react";
import { X, CheckCircle, Send, MapPin, Briefcase } from "lucide-react";

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
  isGeneralProfile?: boolean;
}

export default function JobModal({
  isOpen,
  onClose,
  jobTitle = "Ayurvedic Specialist",
  isGeneralProfile = false,
}: JobModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#FAF7F0] p-6 sm:p-8 shadow-2xl border border-[#DCD5C6] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#5A6B62] hover:bg-[#EAE4D7] transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E5F2EB] text-[#1E704C] mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="font-sans text-[26px] font-semibold text-[#0D3226]">
              Application Received!
            </h3>
            <p className="mt-2 text-[15.5px] text-[#4A5950] max-w-xs mx-auto">
              Thank you for your interest in joining Vaidhyashala. Our talent acquisition team will review your profile.
            </p>
          </div>
        ) : (
          <div>
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#8C713A]">
              {isGeneralProfile ? "Talent Network" : "Career Opportunity"}
            </span>

            <h3 className="mt-1 font-sans text-[28px] font-medium text-[#0D3226]">
              {isGeneralProfile ? "Share Your Profile" : jobTitle}
            </h3>

            {!isGeneralProfile && (
              <div className="mt-2 flex items-center gap-4 text-[14px] text-[#55695E]">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[#B89658]" /> Delhi NCR
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 text-[#B89658]" /> Full Time
                </span>
              </div>
            )}

            <p className="mt-2.5 text-[14.5px] text-[#4E5D55] leading-relaxed">
              {isGeneralProfile
                ? "Let us know about your expertise and we will connect when a matching opportunity opens."
                : `Submit your details to apply for the ${jobTitle} position at Vaidhyashala.`}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-[13px] font-semibold uppercase tracking-wider text-[#3D4F45] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Priya Sharma"
                  className="w-full rounded-md border border-[#D5CDC0] bg-white px-3.5 py-2.5 text-[15px] text-[#13271E] focus:border-[#0D3226] focus:outline-none focus:ring-1 focus:ring-[#0D3226]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[13px] font-semibold uppercase tracking-wider text-[#3D4F45] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full rounded-md border border-[#D5CDC0] bg-white px-3.5 py-2.5 text-[15px] text-[#13271E] focus:border-[#0D3226] focus:outline-none focus:ring-1 focus:ring-[#0D3226]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold uppercase tracking-wider text-[#3D4F45] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-md border border-[#D5CDC0] bg-white px-3.5 py-2.5 text-[15px] text-[#13271E] focus:border-[#0D3226] focus:outline-none focus:ring-1 focus:ring-[#0D3226]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold uppercase tracking-wider text-[#3D4F45] mb-1">
                  Years of Experience
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g. 3+ years in clinical Ayurveda"
                  className="w-full rounded-md border border-[#D5CDC0] bg-white px-3.5 py-2.5 text-[15px] text-[#13271E] focus:border-[#0D3226] focus:outline-none focus:ring-1 focus:ring-[#0D3226]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold uppercase tracking-wider text-[#3D4F45] mb-1">
                  Brief Introduction / LinkedIn / Portfolio
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your background and interests..."
                  className="w-full rounded-md border border-[#D5CDC0] bg-white px-3.5 py-2.5 text-[15px] text-[#13271E] focus:border-[#0D3226] focus:outline-none focus:ring-1 focus:ring-[#0D3226] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-md bg-[#093526] py-3 text-[15px] font-semibold text-white shadow-xs transition-colors hover:bg-[#124534] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit Application</span>
                <Send className="h-4 w-4 text-[#D8B45D]" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
