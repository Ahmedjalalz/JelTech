'use client';

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMotionReady } from "../hooks/useMotionReady";

const Particle = ({ delay, x, y }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-primary/40"
    style={{ left: x, top: y }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.2, 0.8, 0.2],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
    
    {/* Animated grid */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                         linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
    
    {/* Glow orbs */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "-1s" }} />
  </div>
);

export const HeroSection = () => {
  const motionReady = useMotionReady();
  const motionKey = motionReady ? "motion" : "static";
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 4,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GridBackground />
      
      {/* Particles */}
      {particles.map((particle) => (
        <Particle key={particle.id} {...particle} />
      ))}

      <div className="container mx-auto px-6 pt-24 pb-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow Badge */}
          <motion.div
            key={`hero-badge-${motionKey}`}
            initial={motionReady ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-foreground/90">
              DIGITAL CANVAS · SOFTWARE &amp; AI
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            key={`hero-title-${motionKey}`}
            initial={motionReady ? { opacity: 0, y: 30 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
          >
            Technology that does{" "}
            <br className="hidden sm:inline" />
            <span className="relative inline-block">
              <span className="text-gradient-green">more than look good</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-primary rounded-full"
                key={`hero-underline-${motionKey}`}
                initial={motionReady ? { scaleX: 0 } : false}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </span>
            .
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            key={`hero-subtitle-${motionKey}`}
            initial={motionReady ? { opacity: 0, y: 30 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We build distinctive digital experiences for businesses and develop intelligent software designed to solve real-world problems.
          </motion.p>

          {/* CTAs */}
          <motion.div
            key={`hero-cta-${motionKey}`}
            initial={motionReady ? { opacity: 0, y: 30 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="hero" size="xl" asChild>
              <Link href="/#work" className="group">
                Explore Our Work
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link href="/#products">Discover Our Products</Link>
            </Button>
          </motion.div>

          {/* Grounded Value Pillars (Replacing unverified numbers) */}
          <motion.div
            key={`hero-pillars-${motionKey}`}
            initial={motionReady ? { opacity: 0, y: 40 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid sm:grid-cols-3 gap-4 sm:gap-6 mt-16 max-w-3xl mx-auto text-left"
          >
            {[
              {
                title: "Interactive Web Experiences",
                description: "Immersive, memorable websites designed around genuine user interactions.",
              },
              {
                title: "Reliable Modern Code",
                description: "Clean architecture, fast load times, and maintainable software standards.",
              },
              {
                title: "In-House AI Software",
                description: "Active product development solving real operational and marketing workflows.",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-xl bg-card/60 border border-border/70 backdrop-blur-sm"
              >
                <div className="w-2 h-2 rounded-full bg-primary mb-3" />
                <div className="text-sm font-semibold text-foreground mb-1">
                  {pillar.title}
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  {pillar.description}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
};
