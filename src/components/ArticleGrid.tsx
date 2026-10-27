"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import ArticleCard from "./ArticleCard";
import { JournalArticle, useJournal } from "@/lib/journalPage";

interface ArticleGridProps {
  articles: JournalArticle[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  const { articlesSection, searchFilter } = useJournal();
  const [shown, setShown] = useState<number | null>(null);
  if (!articlesSection) return null;

  const visibleCount = shown ?? articlesSection.initialCount;
  const displayedArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-2.5 sm:pt-3 pb-8 sm:pb-10">
      {/* Section Header */}
      <div className="mb-8 sm:mb-10">
        <span className="text-[11.5px] font-bold tracking-[1.4px] uppercase text-[#A58351]">
          {articlesSection.eyebrow}
        </span>
        <h2 className="mt-2.5 font-serif text-[29px] sm:text-[34px] lg:text-[40px] font-normal leading-[1.15] tracking-[-0.015em] text-[#123E30]">
          {articlesSection.heading}
        </h2>
      </div>

      {/* Grid of Articles */}
      {displayedArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {displayedArticles.map((article) => (
            <ArticleCard key={article._id ?? article.slug} article={article} readMoreLabel={articlesSection.readMoreLabel} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-base text-[#62645F]">
          {searchFilter?.noResultsMessage ?? "No articles found matching your criteria."}
        </div>
      )}

      {/* Editorial Notice & Load More Action */}
      <div className="mt-14 flex flex-col items-center justify-center space-y-4">
        {articlesSection.notice && <p className="text-center text-[12.5px] text-[#62645F]">{articlesSection.notice}</p>}
        {hasMore && (
          <button
            onClick={() => setShown(visibleCount + articlesSection.loadMoreStep)}
            className="group inline-flex items-center gap-2.5 rounded-md border border-[#D0C9BD] bg-white px-8 py-3.5 text-[14px] font-semibold text-[#123E30] shadow-sm transition-all hover:border-[#123E30] hover:bg-[#F9F7F2]"
          >
            <span>{articlesSection.loadMoreLabel}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        )}
      </div>
    </section>
  );
}
