'use client';

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Sparkles, Layers, Terminal, Cpu, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const principles = [
  "Thoughtful design and purposeful user interactions",
  "Performance-first architecture with maintainable code",
  "Transparent, collaborative client communication",
  "Active in-house AI software research and product engineering",
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 block">
              About JelTech
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Crafting Digital Experiences &amp;{" "}
              <span className="text-gradient-green">Intelligent Software</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-5">
              At JelTech, we believe that software should do more than look good—it must be fast, reliable,
              and built around real human interactions. We work across two complementary fronts: delivering
              bespoke digital products for ambitious clients, and engineering our own AI-powered software solutions.
            </p>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
              Our engineering philosophy is grounded in practical problem-solving. From high-touch interactive
              websites (like KyteLine&apos;s tactile rotary interface) to enterprise workflow intelligence, we build
              clean, scalable software with zero unnecessary fluff.
            </p>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
              Today, alongside our client engagements, we actively advance our own software initiatives,
              including <strong className="text-foreground">GrowthPilot AI</strong> (a dedicated marketing assistant)
              and <strong className="text-foreground">People Power Hub</strong> (a workforce intelligence platform).
            </p>

            {/* Principles list */}
            <ul className="space-y-3.5 mb-8">
              {principles.map((principle, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 text-sm text-foreground/90 font-medium"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{principle}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Studio & Product Direction Card (Replaces obsolete decorative code snippet) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl bg-card border border-border p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm font-bold text-foreground tracking-wide">
                    The JelTech Model
                  </span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  DIGITAL CANVAS
                </span>
              </div>

              {/* Side 1: Client Studio */}
              <div className="p-5 rounded-2xl bg-secondary/40 border border-border/80 mb-5 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <Layers className="w-4 h-4" />
                    <span>01. Client Digital Solutions</span>
                  </div>
                  <Link href="/#work" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    View work <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Custom web applications, memorable interactive websites, Shopify e-commerce, and high-performance frontends crafted to help businesses stand out and serve customers effectively.
                </p>
              </div>

              {/* Side 2: Software & AI Products */}
              <div className="p-5 rounded-2xl bg-secondary/40 border border-border/80 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <Cpu className="w-4 h-4" />
                    <span>02. Software &amp; AI Products</span>
                  </div>
                  <Link href="/products" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    Explore products <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                  Proprietary software applications engineered in-house to solve concrete operational challenges:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-background/60 border border-border/60">
                    <span className="font-semibold text-foreground block">GrowthPilot AI</span>
                    <span className="text-[10px] text-amber-400 font-medium">In Development · Prototype</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-background/60 border border-border/60">
                    <span className="font-semibold text-foreground block">People Power Hub</span>
                    <span className="text-[10px] text-emerald-400 font-medium">Final Testing · Pre-Launch</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span>Location: Global / Remote</span>
                <span className="text-primary font-medium">jeltech.net</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
