"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, PlayCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-premium -z-20" />
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-center lg:text-left"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-primary shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm font-semibold tracking-wider uppercase">BAMS Complete Learning</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-heading text-foreground leading-[1.1]">
            Master BAMS With <br />
            <span className="text-gradient">AyurAdda.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 font-serif leading-relaxed">
            The most trusted platform by BAMS students. High-quality lectures, handwritten notes, and test series—tailored perfectly for your university exams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <Link href="/courses">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-primary/20 transition-all group">
                Browse Courses
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl border-accent text-accent hover:bg-accent/10 glass">
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch Free Demo
              </Button>
            </Link>
          </div>

          <div className="pt-6 flex items-center justify-center lg:justify-start gap-4 text-sm font-medium text-foreground/80">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-secondary/20 flex items-center justify-center text-xs">
                  S{i}
                </div>
              ))}
            </div>
            <p>Join <span className="text-primary font-bold">10,000+</span> Students</p>
          </div>
        </motion.div>

        {/* Image / Visuals Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative lg:h-[600px] w-full flex justify-center items-center"
        >
          {/* Main stylistic image wrapper */}
          <div className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden border-8 border-background shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay z-10" />
            <img 
              src="https://images.unsplash.com/photo-1542840410-3092f99611a3?auto=format&fit=crop&q=80" 
              alt="Ayurvedic Study"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Feature Cards */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-10 -left-6 md:-left-12 glass-card p-4 rounded-2xl flex items-center gap-4 z-20 shadow-xl"
          >
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
              <span className="text-secondary font-bold font-heading">A+</span>
            </div>
            <div>
              <p className="font-bold text-foreground">Top Scorers</p>
              <p className="text-xs text-muted-foreground">Proven Results</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 -right-6 md:-right-12 glass-card p-4 rounded-2xl flex items-center gap-4 z-20 shadow-xl"
          >
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <PlayCircle className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="font-bold text-foreground">HD Lectures</p>
              <p className="text-xs text-muted-foreground">Anytime, Anywhere</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
