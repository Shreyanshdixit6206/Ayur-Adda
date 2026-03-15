"use client";

import { motion } from "framer-motion";
import { BookOpen, Stethoscope, Microscope, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const categories = [
  {
    year: "1st Year BAMS",
    title: "Foundation of Ayurveda",
    desc: "Master Anatomy, Physiology, and Basic Principles. (Batch: UDAY)",
    icon: <BookOpen className="w-8 h-8" />,
    color: "from-amber-100 to-amber-200",
    textColor: "text-amber-800",
    href: "/courses?year=1",
    delay: 0.1,
  },
  {
    year: "2nd Year BAMS",
    title: "Pathology & Pharmacology",
    desc: "Deep dive into Dravyaguna, Rasashastra, and Rog Nidan. (Batch: SANKALP)",
    icon: <Microscope className="w-8 h-8" />,
    color: "from-emerald-100 to-emerald-200",
    textColor: "text-emerald-800",
    href: "/courses?year=2",
    delay: 0.2,
  },
  {
    year: "3rd & 4th Year BAMS",
    title: "Clinical Core",
    desc: "Surgery, ENT, and advanced clinical practice.",
    icon: <Stethoscope className="w-8 h-8" />,
    color: "from-blue-100 to-blue-200",
    textColor: "text-blue-800",
    href: "/courses?year=3",
    delay: 0.3,
  },
  {
    year: "AIAPGET Prep",
    title: "Post-Graduation",
    desc: "Intense MCQ practice and high-yield topics for PG entrance.",
    icon: <BrainCircuit className="w-8 h-8" />,
    color: "from-purple-100 to-purple-200",
    textColor: "text-purple-800",
    href: "/courses?type=aiapget",
    delay: 0.4,
  },
];

export function CourseCategories() {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-heading text-foreground">
            Find Your <span className="text-primary text-gradient">Batch</span>
          </h2>
          <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
            Choose your academic year to discover tailored video lectures, handwritten notes, and test series.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: cat.delay, duration: 0.5 }}
            >
              <Link href={cat.href} className="block h-full transition-transform hover:-translate-y-2 duration-300">
                <div className="h-full bg-background rounded-3xl p-8 border border-border shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center group">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center ${cat.textColor} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                    {cat.icon}
                  </div>
                  <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full mb-4">
                    {cat.year}
                  </div>
                  <h3 className="text-xl font-heading text-foreground mb-3">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground grow mb-6">{cat.desc}</p>
                  
                  <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors mt-auto">
                    Explore Details
                  </Button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
