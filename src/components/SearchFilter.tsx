"use client";

import React from "react";
import { Search, ArrowRight } from "lucide-react";
import { useJournal } from "@/lib/journalPage";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  /** Category slug; "" means all */
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  onSubmitSearch?: () => void;
}

export default function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onSubmitSearch,
}: SearchFilterProps) {
  const { searchFilter } = useJournal();
  if (!searchFilter) return null;

  const pills = [{ name: searchFilter.allCategoryLabel, slug: "" }, ...searchFilter.categories];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitSearch) onSubmitSearch();
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-2.5 sm:pb-3">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between w-full">
        {/* Search Input Box: Square-style rectangular box matching the left edge */}
        <form
          onSubmit={handleSubmit}
          className="relative w-full sm:w-[380px] lg:w-[410px] flex-shrink-0"
        >
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3.5 h-[18px] w-[18px] text-[#718076]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchFilter.searchPlaceholder}
              className="h-[46px] w-full rounded-md border border-[#D6CFC3] bg-white pl-11 pr-10 text-[14px] text-[#2C3B32] placeholder-[#859289] outline-none transition-all focus:border-[#123E30] focus:ring-1 focus:ring-[#123E30]"
            />
            <button
              type="submit"
              className="absolute right-3 flex h-7 w-7 items-center justify-center text-[#718076] transition-colors hover:text-[#123E30]"
              aria-label="Submit search"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Category Filter Pills: Stretching across to match the right edge */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 lg:justify-end">
          {pills.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug || "all"}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`rounded-full px-5.5 py-2.5 text-[13.5px] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#123E30] text-white shadow-xs"
                    : "border border-[#D6CFC3] bg-white text-[#62645F] hover:border-[#123E30] hover:text-[#123E30]"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
