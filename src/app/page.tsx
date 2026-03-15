"use client";

import { Hero } from "@/components/landing/Hero";
import { CourseCategories } from "@/components/landing/CourseCategories";
import { Faculty } from "@/components/landing/Faculty";
import { Testimonials } from "@/components/landing/Testimonials";
import { ContactCTA } from "@/components/landing/ContactCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Hero />
      <CourseCategories />
      <Faculty />
      <Testimonials />
      <ContactCTA />
    </main>
  );
}
