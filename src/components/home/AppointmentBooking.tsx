"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Calendar, ChevronDown, CheckCircle2 } from "lucide-react";
import { useHome2 } from "@/components/home/Home2Provider";
import { submitAppointment } from "@/lib/home2";

export default function AppointmentBooking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<"clinic" | "online">("clinic");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  // Today's date for the date picker's minimum; read in the browser only, never while prerendering
  const [today, setToday] = useState("");
  useEffect(() => {
    const d = new Date();
    setToday(new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10));
  }, []);
  const { appointment } = useHome2();
  if (!appointment) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await submitAppointment({ name: name.trim(), phone: phone.trim(), service, preferredDate: date, consultationType: type });
      setSubmitted(true);
      setName("");
      setPhone("");
      setService("");
      setDate("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="appointment" className="w-full bg-[#FAF8F3] pt-2.5 sm:pt-3 pb-4 sm:pb-5 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
            {appointment.eyebrow}
          </span>
          <h2 className="mt-1.5 font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.14] text-[#0D3226]">
            {appointment.heading}
          </h2>
          <p className="mt-2 text-[14.5px] sm:text-[15px] font-medium leading-[1.6] text-[#4A5950] max-w-2xl">
            {appointment.description}
          </p>
        </div>

        {/* Interactive Booking Form Strip */}
        <div className="mt-4 sm:mt-5 rounded-xl border border-[#DFD8CC] bg-[#F7F4EE] p-5 sm:p-6 shadow-2xs">
          {submitted ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-2 text-[#0D3226]">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#164D3C]" />
                <span className="text-[14.5px] font-medium">
                  {appointment.successMessage}
                </span>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="text-[13.5px] font-medium underline text-[#0E382B] hover:text-[#185340]"
              >
                Book another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-end">
              {/* Contact details, so the clinic can reach the patient */}
              <div className="lg:col-span-6">
                <label className="block text-[11.5px] font-bold uppercase tracking-wider text-[#67776E] mb-1.5">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  maxLength={100}
                  className="h-[44px] w-full rounded-md border border-[#D6CFC3] bg-white px-3.5 text-[13.5px] font-medium text-[#2C3B32] outline-none transition-all placeholder:text-[#95A39B] focus:border-[#0D3226] focus:ring-1 focus:ring-[#0D3226]"
                />
              </div>
              <div className="lg:col-span-6">
                <label className="block text-[11.5px] font-bold uppercase tracking-wider text-[#67776E] mb-1.5">Mobile number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your mobile number"
                  required
                  pattern="[+\d][\d\s\-]{6,18}"
                  title="Please enter a valid mobile number"
                  className="h-[44px] w-full rounded-md border border-[#D6CFC3] bg-white px-3.5 text-[13.5px] font-medium text-[#2C3B32] outline-none transition-all placeholder:text-[#95A39B] focus:border-[#0D3226] focus:ring-1 focus:ring-[#0D3226]"
                />
              </div>

              {/* Field 1: Service */}
              <div className="lg:col-span-3">
                <label className="block text-[11.5px] font-bold uppercase tracking-wider text-[#67776E] mb-1.5">
                  {appointment.serviceLabel}
                </label>
                <div className="relative">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                    className="h-[44px] w-full appearance-none rounded-md border border-[#D6CFC3] bg-white px-3.5 pr-9 text-[13.5px] font-medium text-[#2C3B32] outline-none transition-all focus:border-[#0D3226] focus:ring-1 focus:ring-[#0D3226]"
                  >
                    <option value="">{appointment.servicePlaceholder}</option>
                    {appointment.items.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-[#75847B]" />
                </div>
              </div>

              {/* Field 2: Preferred Date */}
              <div className="lg:col-span-3">
                <label className="block text-[11.5px] font-bold uppercase tracking-wider text-[#67776E] mb-1.5">
                  {appointment.dateLabel}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="h-[44px] w-full rounded-md border border-[#D6CFC3] bg-white px-3.5 pr-9 text-[13.5px] font-medium text-[#2C3B32] outline-none transition-all focus:border-[#0D3226] focus:ring-1 focus:ring-[#0D3226]"
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-[#75847B]" />
                </div>
              </div>

              {/* Field 3: Consultation Type */}
              <div className="lg:col-span-3">
                <label className="block text-[11.5px] font-bold uppercase tracking-wider text-[#67776E] mb-1.5">
                  {appointment.typeLabel}
                </label>
                <div className="flex h-[44px] items-center gap-4 px-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-[13.5px] font-medium text-[#2C3B32]">
                    <input
                      type="radio"
                      name="consultationType"
                      checked={type === "clinic"}
                      onChange={() => setType("clinic")}
                      className="h-4 w-4 text-[#0D3226] focus:ring-[#0D3226] accent-[#0D3226]"
                    />
                    <span>{appointment.clinicLabel}</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer text-[13.5px] font-medium text-[#2C3B32]">
                    <input
                      type="radio"
                      name="consultationType"
                      checked={type === "online"}
                      onChange={() => setType("online")}
                      className="h-4 w-4 text-[#0D3226] focus:ring-[#0D3226] accent-[#0D3226]"
                    />
                    <span>{appointment.onlineLabel}</span>
                  </label>
                </div>
              </div>

              {/* Field 4: Submit Button */}
              <div className="lg:col-span-3">
                <button
                  type="submit"
                  disabled={sending}
                  className="group flex h-[44px] w-full items-center justify-center gap-2 rounded-md bg-[#0A3527] px-6 text-[14px] font-semibold text-white shadow-xs transition-all hover:bg-[#124534] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span>{sending ? "Sending..." : appointment.buttonLabel}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
              {error && (
                <p role="alert" className="text-[13px] font-medium text-[#B3261E] sm:col-span-2 lg:col-span-12">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
