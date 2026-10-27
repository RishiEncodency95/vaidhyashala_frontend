"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import HeroJournal from "@/components/HeroJournal";
import SearchFilter from "@/components/SearchFilter";
import FeaturedArticle from "@/components/FeaturedArticle";
import ArticleGrid from "@/components/ArticleGrid";
import ConsultationCTA from "@/components/ConsultationCTA";
import Footer from "@/components/Footer";
import { JournalProvider, useJournal } from "@/lib/journalPage";

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

export default function HealthJournalPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF9F5]">
      {/* Top Navigation */}
      <Navbar />

      {/* Content comes from Admin → Pages & CMS → Home 1, Articles and Categories */}
      <JournalProvider>
        <JournalBody />
      </JournalProvider>

      {/* Footer */}
      <Footer />
    </div>
  );
}
