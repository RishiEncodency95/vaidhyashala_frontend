import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import { articleHref, JournalArticle } from "@/lib/journalPage";
import { assetUrl } from "@/lib/home2";

interface ArticleCardProps {
  article: JournalArticle;
  readMoreLabel: string;
}

export default function ArticleCard({ article, readMoreLabel }: ArticleCardProps) {
  const href = articleHref(article);

  return (
    <article id={`article-${article.slug}`} className="group scroll-mt-24 flex flex-col justify-between transition-all duration-200">
      <div>
        {/* Image Container */}
        <div className="overflow-hidden rounded-xl">
          <ImagePlaceholder
            label={article.title}
            subLabel="Aspect: 16:10"
            aspectRatio="aspect-[16/10]"
            className="w-full"
            src={article.image ? assetUrl(article.image) : undefined}
            alt={article.imageAlt || article.title}
          />
        </div>

        {/* Title */}
        <h3 className="mt-4 font-serif text-[20px] sm:text-[22px] lg:text-[23px] font-normal leading-[1.2] text-[#123E30] group-hover:text-[#1e5845] transition-colors">
          <Link href={href}>{article.title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="mt-2.5 text-[14px] sm:text-[14.5px] font-normal leading-[1.55] text-[#62645F]">
          {article.excerpt}
        </p>
      </div>

      {/* Read Article Link */}
      <div className="mt-5 pt-1">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#123E30] transition-colors hover:text-[#1e5845]"
        >
          <span className="border-b-[1.5px] border-[#A58351] pb-0.5">{readMoreLabel}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
