"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { useContactPage } from "@/lib/contactPage";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2M12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C16.6 3.67 20.3 7.37 20.3 11.92C20.28 16.46 16.59 20.16 12.05 20.16M16.57 14.41C16.32 14.28 15.1 13.68 14.87 13.6C14.65 13.52 14.49 13.48 14.33 13.72C14.16 13.97 13.7 14.51 13.55 14.67C13.41 14.84 13.27 14.86 13.02 14.73C12.78 14.61 11.98 14.35 11.04 13.51C10.3 12.85 9.8 12.04 9.66 11.79C9.51 11.55 9.64 11.41 9.77 11.29C9.88 11.17 10.02 11 10.14 10.85C10.27 10.71 10.31 10.6 10.4 10.42C10.48 10.23 10.44 10.09 10.38 9.96C10.32 9.84 9.83 8.63 9.62 8.14C9.42 7.65 9.22 7.72 9.07 7.71C8.93 7.7 8.77 7.7 8.61 7.7C8.45 7.7 8.18 7.76 7.96 8C7.73 8.25 7.1 8.84 7.1 10.04C7.1 11.25 7.98 12.41 8.1 12.58C8.23 12.74 9.83 15.22 12.3 16.28C14.07 17.05 14.63 16.94 15.2 16.88C15.83 16.82 17.15 16.12 17.42 15.35C17.7 14.58 17.7 13.93 17.62 13.79C17.54 13.66 17.38 13.59 17.13 13.47" />
    </svg>
  );
}

// Used when a method has no uploaded icon, in the order the methods are listed
const FALLBACK_ICONS = [Phone, WhatsAppIcon, Mail, MapPin];

export default function ContactMethods() {
  const { contactMethods } = useContactPage();
  if (!contactMethods) return null;
  const methods = contactMethods.items;

  return (
    <section className="w-full bg-[#FAF8F3] py-4 sm:py-5 lg:py-6 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
            {contactMethods.eyebrow}
          </span>
          <h2 className="mt-1 font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-medium leading-[1.14] text-[#0D3226]">
            {contactMethods.heading}
          </h2>
          <p className="mt-1 text-[13.5px] sm:text-[14px] font-medium leading-[1.5] text-[#4A5950]">
            {contactMethods.description}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {methods.map((method, index) => {
            const Icon = FALLBACK_ICONS[index % FALLBACK_ICONS.length];
            return (
              <div
                key={`${method.title}-${index}`}
                className="flex flex-col justify-between rounded-xl border border-[#E3DDCF] bg-white p-6 text-center shadow-2xs transition-all hover:shadow-xs"
              >
                <div>
                  {/* Icon in Circular Badge */}
                  <div className="mx-auto flex h-13 w-13 items-center justify-center rounded-full bg-[#EBF1EB] text-[#0D3226] mb-3.5">
                    {method.iconImage ? (
                      <CmsImage src={assetUrl(method.iconImage)} alt="" className="h-6 w-6 object-contain" width={24} height={24} />
                    ) : (
                      <Icon className="h-6 w-6 stroke-[1.75]" />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-[19px] sm:text-[20px] font-medium text-[#0D3226]">
                    {method.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-[13px] sm:text-[13.5px] font-medium leading-[1.55] text-[#5A6860] min-h-[58px]">
                    {method.description}
                  </p>

                  {/* Placeholder Value */}
                  <div className="mt-3 font-serif text-[15px] sm:text-[16px] font-medium text-[#0D3226]">
                    {method.value}
                  </div>
                </div>

                {/* Action Button */}
                {method.buttonLabel && method.link && (
                <div className="mt-5 pt-2">
                  <Link
                    href={method.link}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#0A3527] px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-xs transition-all hover:bg-[#124534]"
                  >
                    <span>{method.buttonLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
