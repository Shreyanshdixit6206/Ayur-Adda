import Link from "next/link";
import { Leaf, Mail, Phone, MapPin, Instagram, Youtube, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
        {/* Brand */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2 group w-max">
            <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Leaf className="w-7 h-7 text-primary" />
            </div>
            <span className="text-2xl font-heading font-bold text-foreground">
              AyurAdda
            </span>
          </Link>
          <p className="text-muted-foreground font-serif text-sm leading-relaxed">
            Most Trusted By BAMS Students. Bridging ancient wisdom with modern learning techniques to help you score better in university exams.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors shadow-sm">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors shadow-sm">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm">
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-xl text-foreground mb-6 inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-1 after:bg-primary/30 after:rounded-full">Quick Links</h4>
          <ul className="space-y-3">
            {[
              { name: "Home", href: "/" },
              { name: "Browse Courses", href: "/courses" },
              { name: "Free Resources", href: "/notes" },
              { name: "Live Classes", href: "/live" },
              { name: "About Us", href: "/about" },
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-heading text-xl text-foreground mb-6 inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-1 after:bg-primary/30 after:rounded-full">Legal</h4>
          <ul className="space-y-3">
            {[
              { name: "Terms & Conditions", href: "/terms" },
              { name: "Privacy Policy", href: "/privacy" },
              { name: "Refund & Cancellation", href: "/refund" },
              { name: "Contact Us", href: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-xl text-foreground mb-6 inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-1 after:bg-primary/30 after:rounded-full">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-muted-foreground group">
              <Mail className="w-5 h-5 text-secondary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span className="text-sm">support@ayuradda.com</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground group">
              <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span className="text-sm">+91 XXXXX XXXXX</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground group">
              <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Pune, Maharashtra, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-border/50 text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} AyurAdda. All Rights Reserved.
        </p>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          Designed with <span className="text-destructive animate-pulse">❤</span> for BAMS Students
        </p>
      </div>
    </footer>
  );
}
