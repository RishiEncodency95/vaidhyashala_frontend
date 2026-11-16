"use client";

import { useState, useMemo } from "react";
import HeroJournal from "@/components/blog/HeroJournal";
import SearchFilter from "@/components/blog/SearchFilter";
import FeaturedArticle from "@/components/blog/FeaturedArticle";
import ArticleGrid from "@/components/blog/ArticleGrid";
import ConsultationCTA from "@/components/common/ConsultationCTA";
import { JournalProvider, useJournal } from "@/lib/content/journal";

function JournalBody() {
  const { articlesSection } = useJournal();
  const [searchQuery, setSearchQuery] = useState("");
  // Category slug; "" means all
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return (articlesSection?.articles ?? []).filter((article) => {
      const matchesCategory = selectedCategory === "" || article.category.slug === selectedCategory;
      const matchesSearch =
        query === "" ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.name.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [articlesSection, searchQuery, selectedCategory]);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <HeroJournal />

      {/* Search & Category Filter Bar */}
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Featured Article Card */}
      <FeaturedArticle />

      {/* Articles Grid & Load More */}
      <ArticleGrid articles={filteredArticles} />

      {/* Pre-Footer Consultation CTA */}
      <ConsultationCTA />
    </main>
  );
}

export default function BlogPage() {
  return (
    <div className="flex flex-1 flex-col bg-[#FBF9F5]">
      {/* Content comes from Admin → Pages & CMS → Home 1, Articles and Categories */}
      <JournalProvider>
        <JournalBody />
      </JournalProvider>
    </div>
  );
}
