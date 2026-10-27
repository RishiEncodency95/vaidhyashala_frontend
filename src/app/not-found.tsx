"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  const quickNavCards = [
    {
      title: "Explore Treatments",
      subtitle: "Find care by health concern.",
      href: "/treatments",
      iconSrc: "/icon_treatments.webp",
      alt: "Explore Treatments Icon",
    },
    {
      title: "Panchakarma & Therapies",
      subtitle: "Explore our therapy information.",
      href: "/panchakarma",
      iconSrc: "/icon_panchakarma.webp",
      alt: "Panchakarma Therapies Icon",
    },
    {
      title: "Products Catalogue",
      subtitle: "View products and send an enquiry.",
      href: "/products",
      iconSrc: "/icon_products.webp",
      alt: "Products Catalogue Icon",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F5] text-[#22332A] selection:bg-[#CCD8CB]">
      {/* 1. Header Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. Hero Section: /404.png as Background */}
        <section className="relative w-full overflow-hidden bg-[#FAF8F5]">
          {/* Full-bleed background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/404.webp"
              alt="Vaidhyashala Clinic Serene Ayurvedic Setting"
              fill
              className="object-cover object-right lg:object-center"
              priority
            />
            {/* Subtle overlay on mobile for guaranteed text readability */}
            <div className="lg:hidden absolute inset-0 bg-[#FAF8F5]/75" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] items-center">
              {/* Left Column: 404 Text & CTA Buttons */}
              <div className="lg:col-span-6 px-4 sm:px-8 lg:pl-12 lg:pr-6 py-12 sm:py-16 lg:py-20">
                <span className="text-[11.5px] font-bold tracking-[0.18em] uppercase text-[#A58351]">
                  PAGE NOT FOUND
                </span>

                <h1 className="font-serif text-[80px] sm:text-[98px] md:text-[110px] font-normal leading-none text-[#8DA796] tracking-tight mt-1 mb-2 select-none">
                  404
                </h1>

                <h2 className="font-serif text-[34px] sm:text-[42px] md:text-[46px] font-medium text-[#0D3226] leading-[1.12] tracking-tight">
                  Let&apos;s guide you back.
                </h2>

                <p className="mt-3.5 text-[15px] sm:text-[16px] text-[#4F6255] font-normal leading-[1.55] max-w-md">
                  The page you&apos;re looking for may have moved or is unavailable.
                </p>

                {/* Action Buttons */}
                <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-md bg-[#0D3226] px-6 py-3 text-[14px] font-medium text-white shadow-xs transition-colors hover:bg-[#071E16]"
                  >
                    <span>Back to Home</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-md border border-[#0D3226] bg-[#FAF8F5] px-6 py-3 text-[14px] font-medium text-[#0D3226] transition-colors hover:bg-[#ECE4D6]"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Right Column: Spacer letting the background image scene display */}
              <div className="hidden lg:block lg:col-span-6 h-full min-h-[460px] sm:min-h-[500px] lg:min-h-[540px]" />
            </div>
          </div>
        </section>

        {/* 3. Navigation Quick Links Strip (3 Cards) */}
        <section className="w-full bg-[#FAF8F5] py-8 sm:py-10 border-t border-[#EAE3D6]/70">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {quickNavCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group flex items-center justify-between rounded-lg border border-[#E3DBD0] bg-[#FAF8F5] p-5 sm:p-6 transition-all hover:border-[#CAD5C9] hover:bg-white hover:shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center shrink-0">
                      <Image
                        src={card.iconSrc}
                        alt={card.alt}
                        width={46}
                        height={46}
                        className="h-11 w-11 object-contain transition-transform group-hover:scale-105"
                      />
                    </div>

                    {/* Card Text */}
                    <div className="flex flex-col">
                      <h3 className="font-serif text-[17px] sm:text-[18px] font-semibold text-[#0D3226] leading-snug group-hover:text-[#185340] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-[12.5px] sm:text-[13px] text-[#55675C] font-normal leading-snug mt-1">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <ArrowRight className="h-4.5 w-4.5 text-[#0D3226] transition-transform duration-200 group-hover:translate-x-1 shrink-0 ml-3 stroke-[2]" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 4. Footer Matching Reference Image */}
      <footer className="bg-[#0C3B29] text-[#D3E0D8]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-9 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
            {/* Col 1: Brand & Logo */}
            <div className="lg:col-span-3 flex flex-col items-center sm:items-start text-center sm:text-left lg:pr-8 lg:border-r lg:border-[#1E523F]/80">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full overflow-hidden border border-[#235848]/60 bg-[#FAF8F3] shadow-xs mb-3">
                <Image
                  src="/logo.webp"
                  alt="Vaidhyashala Logo"
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>

              <span className="font-serif text-[18px] sm:text-[19px] font-normal tracking-[0.14em] uppercase text-[#F1F6F3] leading-tight">
                VAIDHYASHALA
              </span>

              <span className="text-[9px] font-medium tracking-[0.16em] uppercase text-[#8FA598] leading-tight mt-1.5">
                AYURVEDIC CLINIC &<br />
                PANCHAKARMA CENTRE
              </span>
            </div>

            {/* Col 2: QUICK LINKS */}
            <div className="lg:col-span-3 lg:px-8 lg:border-r lg:border-[#1E523F]/80">
              <h3 className="text-[11.5px] font-bold tracking-[0.16em] uppercase text-[#C4A876]">
                QUICK LINKS
              </h3>
              <ul className="mt-3.5 space-y-1.5 text-[13px]">
                {[
                  { name: "Home", href: "/" },
                  { name: "About Us", href: "/about" },
                  { name: "Treatments", href: "/treatments" },
                  { name: "Products", href: "/products" },
                  { name: "FAQs", href: "/faqs" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[#D3E0D8] transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: OUR SERVICES */}
            <div className="lg:col-span-3 lg:px-8 lg:border-r lg:border-[#1E523F]/80">
              <h3 className="text-[11.5px] font-bold tracking-[0.16em] uppercase text-[#C4A876]">
                OUR SERVICES
              </h3>
              <ul className="mt-3.5 space-y-1.5 text-[13px]">
                {[
                  { name: "Doctor Consultation", href: "/doctor-consultation" },
                  { name: "Panchakarma Therapies", href: "/panchakarma" },
                  { name: "Yoga & Lifestyle Care", href: "/yoga-lifestyle-care" },
                  { name: "Ayurvedic Medicines", href: "/ayurvedic-medicines" },
                ].map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="text-[#D3E0D8] transition-colors hover:text-white"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: VISIT & CONNECT */}
            <div className="lg:col-span-3 lg:pl-8">
              <h3 className="text-[11.5px] font-bold tracking-[0.16em] uppercase text-[#C4A876]">
                VISIT & CONNECT
              </h3>
              <div className="mt-4 flex items-center space-x-3">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D3E0D8]/60 text-[#D3E0D8] transition-all hover:border-white hover:text-white"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D3E0D8]/60 text-[#D3E0D8] transition-all hover:border-white hover:text-white"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2M12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C16.6 3.67 20.3 7.37 20.3 11.92C20.28 16.46 16.59 20.16 12.05 20.16M16.57 14.41C16.32 14.28 15.1 13.68 14.87 13.6C14.65 13.52 14.49 13.48 14.33 13.72C14.16 13.97 13.7 14.51 13.55 14.67C13.41 14.84 13.27 14.86 13.02 14.73C12.78 14.61 11.98 14.35 11.04 13.51C10.3 12.85 9.8 12.04 9.66 11.79C9.51 11.55 9.64 11.41 9.77 11.29C9.88 11.17 10.02 11 10.14 10.85C10.27 10.71 10.31 10.6 10.4 10.42C10.48 10.23 10.44 10.09 10.38 9.96C10.32 9.84 9.83 8.63 9.62 8.14C9.42 7.65 9.22 7.72 9.07 7.71C8.93 7.7 8.77 7.7 8.61 7.7C8.45 7.7 8.18 7.76 7.96 8C7.73 8.25 7.1 8.84 7.1 10.04C7.1 11.25 7.98 12.41 8.1 12.58C8.23 12.74 9.83 15.22 12.3 16.28C14.07 17.05 14.63 16.94 15.2 16.88C15.83 16.82 17.15 16.12 17.42 15.35C17.7 14.58 17.7 13.93 17.62 13.79C17.54 13.66 17.38 13.59 17.13 13.47" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D3E0D8]/60 text-[#D3E0D8] transition-all hover:border-white hover:text-white"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D3E0D8]/60 text-[#D3E0D8] transition-all hover:border-white hover:text-white"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.738-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Legal Links */}
          <div className="mt-8 pt-5 border-t border-[#1E523F]/80 flex flex-col sm:flex-row items-center justify-between text-[12.5px] text-[#A6C0B4] gap-3">
            <span>© 2026 Vaidhyashala. All rights reserved.</span>
            <div className="flex items-center space-x-2">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span>·</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
