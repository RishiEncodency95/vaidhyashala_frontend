"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import PlanConsultationModal from "@/components/consultation/PlanConsultationModal";

export default function Navbar() {
  const pathname = usePathname() || "/";
  const isActive = (href: string) => {
    const path = href.split("#")[0];
    if (href.includes("#")) return false;
    if (path === "/") return pathname === "/" || pathname === "/home";
    return pathname === path || pathname.startsWith(path + "/");
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  const baseItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Treatments", href: "/treatments" },
    { name: "Our Doctors", href: "/about#team" },
    { name: "Products", href: "/products" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
  ];
  const navItems = baseItems.map((item) => ({ ...item, active: isActive(item.href) }));

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[#EAE5DA]/80 bg-[#FAF8F3]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[80px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-12">
          {/* Left: Brand Logo */}
          <Link href="/" className="transition-opacity hover:opacity-95 shrink-0">
            <Logo variant="dark" />
          </Link>

          {/* Center: Navigation Links matching reference image2 */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative inline-flex flex-col items-center py-1 transition-colors"
              >
                <span
                  className={`text-[14.5px] xl:text-[15px] leading-normal transition-colors ${
                    item.active
                      ? "font-semibold text-[#0E3A2A]"
                      : "font-normal text-[#5E645F] hover:text-[#0E3A2A]"
                  }`}
                >
                  {item.name}
                </span>
                {item.active && (
                  <span className="absolute -bottom-2 h-[2.5px] w-full rounded-full bg-[#C4933F]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right: CTA Button */}
          <div className="hidden sm:flex items-center">
            <button
              type="button"
              onClick={() => setIsConsultModalOpen(true)}
              className="group inline-flex items-center gap-2 rounded-lg bg-[#093526] px-5 py-2.5 text-[14.5px] font-semibold text-white shadow-xs transition-all hover:bg-[#104834] cursor-pointer"
            >
              <span>Book Appointment</span>
              <ArrowRight className="h-4 w-4 text-[#D8B45D] transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-md p-2 text-[#2F4439] hover:bg-[#EFE9DF]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EAE5DA] bg-[#FAF8F3] px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-1.5 text-[15px] ${
                  item.active
                    ? "font-semibold text-[#0E3A2A]"
                    : "font-normal text-[#5E645F]"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsConsultModalOpen(true);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#093526] py-2.5 text-[15px] font-semibold text-white"
              >
                <span>Book Appointment</span>
                <ArrowRight className="h-4 w-4 text-[#D8B45D]" />
              </button>
            </div>
          </div>
        )}
      </header>

      <PlanConsultationModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
      />
    </>
  );
}
