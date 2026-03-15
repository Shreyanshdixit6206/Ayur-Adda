"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sneha Patil",
    college: "Tilak Ayurved Mahavidyalaya",
    year: "2nd Year BAMS",
    review: "The Sankalp Batch notes are a lifesaver! I scored 78% in Dravyaguna just because of Dr. Ruchita's mnemonics.",
    rating: 5,
  },
  {
    name: "Rahul Deshmukh",
    college: "Podar Ayurved Medical College",
    year: "1st Year BAMS",
    review: "AyurAdda made Anatomy so much easier to understand. The video lectures are very high quality and strictly follow NCISM syllabus.",
    rating: 5,
  },
  {
    name: "Anjali Kadam",
    college: "GAC Nanded",
    year: "3rd Year BAMS",
    review: "I have joined the clinical batches and it perfectly bridges the gap between Samhitas and practical patient history taking.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-premium relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-primary shadow-sm mb-4">
            <Star className="w-4 h-4 fill-secondary text-secondary" />
            <span className="text-sm font-semibold tracking-wider uppercase">Student Reviews</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading text-foreground">
            Don't Just Take <span className="text-gradient-gold">Our Word</span>
          </h2>
          <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
            Thousands of BAMS students across Maharashtra trust AyurAdda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="glass-card p-8 rounded-[2rem] relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10 rotate-180" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-foreground/80 font-serif italic mb-8 relative z-10 text-lg leading-relaxed">
                "{testimonial.review}"
              </p>

              <div className="flex items-center gap-4 border-t border-border/50 pt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-xl uppercase shadow-inner">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground font-heading tracking-wide">{testimonial.name}</h4>
                  <p className="text-sm text-secondary font-medium">{testimonial.year}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.college}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
