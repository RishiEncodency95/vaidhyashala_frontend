import React from "react";
import type { Metadata } from "next";
import TestimonialsNavbar from "@/components/testimonials/TestimonialsNavbar";
import TestimonialsHero from "@/components/testimonials/TestimonialsHero";
import FeaturedTestimonial from "@/components/testimonials/FeaturedTestimonial";
import TestimonialGrid from "@/components/testimonials/TestimonialGrid";
import VideoStories from "@/components/testimonials/VideoStories";
import FeedbackImpact from "@/components/testimonials/FeedbackImpact";
import FeedbackForm from "@/components/testimonials/FeedbackForm";
import TestimonialsFAQ from "@/components/testimonials/TestimonialsFAQ";
import TestimonialsCTA from "@/components/testimonials/TestimonialsCTA";
import { TestimonialsProvider } from "@/lib/testimonialsPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Patient Testimonials & Experiences | The Vaidhyashala",
  description:
    "Read genuine experiences from patients at The Vaidhyashala. Feedback on Ayurvedic consultations, Panchakarma therapies, and compassionate clinic care.",
};

export default function TestimonialsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F3] text-[#22332A]">
      {/* 1. Header Navigation */}
      <TestimonialsNavbar />

      {/* Main Content */}
      <TestimonialsProvider>
      <main className="flex-1">
        {/* 2. Hero Section: Experiences that help us care better */}
        <TestimonialsHero />

        {/* 3. Featured Spotlight Testimonial: Care begins with being heard */}
        <FeaturedTestimonial />

        {/* 4. Filterable Testimonials Grid: Explore patient experiences (6 cards + Load More) */}
        <TestimonialGrid />

        {/* 5. Video Stories: Patient stories, in their own words */}
        <VideoStories />

        {/* 6. Impact Banner: What your feedback helps us improve */}
        <FeedbackImpact />

        {/* 7. Experience Sharing Form: Share your experience */}
        <FeedbackForm />

        {/* 8. FAQs: Frequently asked questions */}
        <TestimonialsFAQ />

        {/* 9. Pre-Footer Banner: Ready to discuss your care? */}
        <TestimonialsCTA />
      </main>
      </TestimonialsProvider>

      {/* 10. Official Vaidhyashala Footer */}
      <Footer />
    </div>
  );
}
