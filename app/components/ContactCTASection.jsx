'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ContactCTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="p-8 sm:p-14 rounded-3xl bg-card border border-border/80 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Let&apos;s Build Together
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 leading-tight">
                Ready to elevate your <span className="text-gradient-green">digital presence</span>?
              </h2>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                Whether you need a distinctive custom website, an interactive digital experience, or intelligent software tools,
                we are ready to discuss your goals and provide a clear roadmap.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <a
                  href="mailto:Contact@jeltech.net"
                  className="flex items-center gap-2 hover:text-primary transition-colors font-medium text-foreground"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  Contact@jeltech.net
                </a>
                <span className="text-border">|</span>
                <a
                  href="tel:+923143394966"
                  className="flex items-center gap-2 hover:text-primary transition-colors font-medium text-foreground"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  +92 314 3394966
                </a>
              </div>
            </div>

            {/* Right Actions */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
              <Button variant="hero" size="xl" className="w-full justify-center group" asChild>
                <Link href="/start-project">
                  Start a Project
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="secondary" size="xl" className="w-full justify-center" asChild>
                <Link href="/contact">
                  General Inquiry
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
