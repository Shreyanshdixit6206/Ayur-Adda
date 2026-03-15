"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const facultyMembers = [
  {
    name: "Dr. Ruchita Harde",
    role: "Dravyaguna & Sanskrit Expert",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "7+ years teaching experience. Simplifying complex Samhitas for 2nd Year students.",
    color: "from-amber-100 to-orange-100",
  },
  {
    name: "Dr. Akash Kshirsagar",
    role: "Founder & Physiology Expert",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Pioneer in BAMS modern education. Master of Kriya Sharir and Rasshastra.",
    color: "from-emerald-100 to-teal-100",
  },
  {
    name: "Dr. Sneha Bhalke",
    role: "Samhita Adhyayan Expert",
    image: "https://images.unsplash.com/photo-1594824436906-ce6940a455a1?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Making Samhitas easy to remember with unique Mnemonics.",
    color: "from-blue-100 to-indigo-100",
  },
  {
    name: "Dr. Sakshi Mathnikar",
    role: "Anatomy Expert",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Visualizing Rachana Sharir for 1st Year students like never before.",
    color: "from-purple-100 to-pink-100",
  },
];

export function Faculty() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-heading text-foreground">
            Meet Our <span className="text-gradient">Experts</span>
          </h2>
          <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
            Learn directly from top-rated BAMS professors who understand what examiners want.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facultyMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-6 border-4 border-background shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-40 mix-blend-multiply z-10`} />
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Social Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="text-center px-4">
                <h3 className="text-xl font-bold font-heading text-foreground">{member.name}</h3>
                <p className="text-sm font-semibold text-secondary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
