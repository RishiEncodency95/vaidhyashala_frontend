import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function NotFoundPage() {
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
    <div className="flex flex-1 flex-col bg-[#FAF8F5] text-[#22332A] selection:bg-[#CCD8CB]">
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
    </div>
  );
}
