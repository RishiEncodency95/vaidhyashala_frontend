"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articleHref, useJournal } from "@/lib/journalPage";
import { assetUrl } from "@/lib/home2";
import CmsImage from "@/components/CmsImage";

export default function FeaturedArticle() {
  const { featured } = useJournal();
  if (!featured) return null;
  const { article } = featured;

  return (
    <section id={`article-${article.slug}`} className="scroll-mt-24 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-2.5 sm:pt-3 pb-2.5 sm:pb-3">
      <div className="relative overflow-hidden rounded-2xl border border-[#E3DDCF] bg-[#FAF8F3] shadow-xs transition-shadow duration-300 hover:shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] lg:min-h-[420px]">
          {/* Left Column: Article image */}
          <div className="relative lg:col-span-6 xl:col-span-6 h-full min-h-[300px] lg:min-h-full overflow-hidden">
            {article.image && (
              <CmsImage
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="eager"
                src={assetUrl(article.image)}
                alt={article.imageAlt || article.title}
                className="h-full w-full object-cover rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl"
              />
            )}
          </div>

          {/* Right Column: Article Details with decorative leaves in bottom-right */}
          <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-12 lg:col-span-6 xl:col-span-6 overflow-hidden bg-[#FAF8F3]">
            {featured.decorativeImage && (
              <CmsImage
                width={400}
                height={200}
                src={assetUrl(featured.decorativeImage)}
                style={{ height: "auto" }}
                alt={featured.decorativeImageAlt}
                className="pointer-events-none absolute -bottom-2 -right-2 w-[280px] sm:w-[340px] lg:w-[400px] max-w-[65%] h-auto object-contain mix-blend-multiply select-none"
              />
            )}

            {/* Article Content */}
            <div className="relative z-10">
              {/* Eyebrow */}
              <span className="text-[11.5px] font-bold tracking-[1.4px] uppercase text-[#A58351]">
                {featured.eyebrow}
              </span>

              {/* Title */}
              <h2 className="mt-3 font-serif text-[29px] sm:text-[36px] lg:text-[40px] font-normal leading-[1.15] tracking-[-0.015em] text-[#123E30]">
                {article.title}
              </h2>

              {/* Excerpt */}
              <p className="mt-4 text-[15px] sm:text-[16px] font-normal leading-[1.6] text-[#62645F] max-w-[560px]">
                {article.excerpt}
              </p>

              {/* Read Button */}
              <div className="mt-7">
                <Link
                  href={articleHref(article)}
                  className="group inline-flex items-center gap-2.5 rounded-md bg-[#123E30] px-7 py-3 text-[14px] font-semibold text-white transition-all hover:bg-[#1b5341]"
                >
                  <span>{featured.buttonLabel}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
