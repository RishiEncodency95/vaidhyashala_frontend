"use client";

import React from "react";
import Link from "next/link";
import { useAbout } from "./AboutProvider";
import { assetUrl } from "@/lib/home2";

export default function CoreServices() {
  const { services } = useAbout();
  if (!services) return null;

  return (
    <section className="w-full bg-[#FAF8F3] pt-2.5 sm:pt-3 pb-4 sm:pb-5 border-b border-[#ECE6DB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-[11.5px] sm:text-[12px] font-bold tracking-[1.5px] uppercase text-[#A58351]">
            {services.eyebrow}
          </span>
          <h2 className="mt-1.5 font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.14] text-[#0D3226]">
            {services.heading}
          </h2>
          <p className="mt-2 text-[14.5px] sm:text-[15px] font-medium leading-[1.6] text-[#4A5950]">
            {services.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-5 sm:mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {services.items.map((service, index) => {
            const card = (
              <>
                <div className="overflow-hidden rounded-xl aspect-[16/11] bg-[#EAE4D8]">
                  {service.image && (
                    <img
                      src={assetUrl(service.image)}
                      alt={service.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                <h3 className="mt-3 font-serif text-[17.5px] sm:text-[18px] font-medium leading-[1.25] text-[#0D3226]">
                  {service.title}
                </h3>

                <p className="mt-1.5 text-[13px] sm:text-[13.5px] font-medium leading-[1.5] text-[#4A5950]">
                  {service.description}
                </p>
              </>
            );
            const className = "group flex flex-col transition-all duration-200";
            return service.link ? (
              <Link key={index} href={service.link} className={className}>
                {card}
              </Link>
            ) : (
              <div key={index} className={className}>
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
