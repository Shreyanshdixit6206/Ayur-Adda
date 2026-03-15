"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Leaf, GraduationCap, Building2, Calendar, Send } from "lucide-react";
import { useState } from "react";

export function ContactCTA() {
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    year: "",
    examDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Usually connects to an API endpoint here to save the lead
    alert("Query Sent! Our team will contact you shortly.");
  };

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-heading text-foreground">
            Confused About Your <span className="text-gradient">BAMS Journey?</span>
          </h2>
          <p className="text-lg text-muted-foreground font-serif">
            Whether you need help selecting a batch, understanding the syllabus, or preparing for your next university exam, our academic counselors are here to help.
          </p>
          
          <ul className="space-y-6">
            <li className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Expert Counseling</h4>
                <p className="text-sm text-muted-foreground">Get guidance from senior BAMS doctors.</p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Batch Selection</h4>
                <p className="text-sm text-muted-foreground">Find the right batch starting near your exam date.</p>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* Right Side Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-background rounded-3xl p-8 md:p-10 shadow-2xl border border-border/50 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -z-10" />
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold font-heading text-foreground mb-2">Get In Touch</h3>
              <p className="text-sm text-muted-foreground">Chat with us for any course related doubts.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/70">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <Input 
                  placeholder="Your Full Name" 
                  className="pl-12 h-14 bg-muted/30 border-border/50 focus-visible:ring-primary/50 text-foreground"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/70">
                  <Building2 className="h-5 w-5" />
                </div>
                <Input 
                  placeholder="College Name" 
                  className="pl-12 h-14 bg-muted/30 border-border/50 focus-visible:ring-primary/50 text-foreground"
                  required
                  value={formData.college}
                  onChange={(e) => setFormData({...formData, college: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/70">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <select 
                    className="flex h-14 w-full rounded-md border border-border/50 bg-muted/30 pl-12 pr-4 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                  >
                    <option value="" disabled>Current Year</option>
                    <option value="1">1st Year BAMS</option>
                    <option value="2">2nd Year BAMS</option>
                    <option value="3">3rd Year BAMS</option>
                    <option value="4">4th Year BAMS</option>
                  </select>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/70">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <Input 
                    placeholder="Final Exam Date" 
                    className="pl-12 h-14 bg-muted/30 border-border/50 focus-visible:ring-primary/50 text-foreground"
                    onChange={(e) => setFormData({...formData, examDate: e.target.value})}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-14 text-lg font-bold tracking-wide bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all mt-4 group">
                Submit Query
                <Send className="w-5 h-5 ml-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
