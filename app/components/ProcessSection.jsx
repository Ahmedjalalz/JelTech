'use client';

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Sparkles,
  PhoneCall,
  RotateCw,
  Zap,
  Search,
  Palette,
  Code,
  TestTube,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import { useMotionReady } from "../hooks/useMotionReady";

const hookPrinciples = [
  {
    icon: PhoneCall,
    badge: "The Memory Anchor",
    title: "The 'Hanging Telephone' Effect",
    description:
      "If a potential client visits 100 websites in your niche, they will forget 99 of them. They will remember yours. We plant a distinctive visual and conceptual anchor—like the swinging telephone receiver on KyteLine—that permanently lodges in the visitor's subconscious.",
  },
  {
    icon: RotateCw,
    badge: "Tactile Engagement",
    title: "Interactive Connection Over Passive Scrolling",
    description:
      "Passive scrollers bounce. Engaged users convert. We design physical, tactile interactions—like the rotating rotary telephone dial on KyteLine—where visitors turn the wheel, trigger micro-delights, and feel a genuine physical connection to your brand.",
  },
  {
    icon: Zap,
    badge: "High-Intent Action",
    title: "From Hooked Attention to Confident Conversion",
    description:
      "A great hook captures attention; intuitive architecture captures revenue. We channel deep visitor curiosity directly into frictionless booking funnels, instant estimate calculators, and high-converting quote flows.",
  },
];

const steps = [
  {
    number: "01",
    title: "Hook & Strategy",
    description: "We uncover your unique edge, audience psychology, and define the signature interaction hook.",
    icon: Search,
  },
  {
    number: "02",
    title: "Tactile Design",
    description: "Crafting bespoke UI with custom animations, micro-interactions, and high-trust layouts.",
    icon: Palette,
  },
  {
    number: "03",
    title: "Bespoke Build",
    description: "Clean, blazing-fast Next.js/React engineering built without bulky bloatware or cookie-cutter templates.",
    icon: Code,
  },
  {
    number: "04",
    title: "Performance Testing",
    description: "Rigorous testing across mobile, tablet, and desktop to ensure 60fps animations and instant loads.",
    icon: TestTube,
  },
  {
    number: "05",
    title: "Launch & Scale",
    description: "Seamless deployment, analytics setup, SEO indexing, and continuous performance optimization.",
    icon: Rocket,
  },
];

const ProcessStep = ({ step, index, isLast, motionReady }) => {
  const Icon = step.icon;

  return (
    <motion.div
      initial={motionReady ? { opacity: 0, y: 30 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col items-center text-center group"
    >
      {/* Connector line - desktop */}
      {!isLast && (
        <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-primary/50 to-border" />
      )}

      {/* Number circle with icon */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="relative w-16 h-16 rounded-full bg-secondary border-2 border-primary/30 flex items-center justify-center mb-4 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(69,190,67,0.3)] transition-all duration-300"
      >
        <Icon className="w-6 h-6 text-primary" />
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
          {step.number}
        </span>
      </motion.div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {step.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
        {step.description}
      </p>

      {/* Connector line - mobile */}
      {!isLast && (
        <div className="lg:hidden w-0.5 h-8 bg-gradient-to-b from-primary/50 to-border mt-4" />
      )}
    </motion.div>
  );
};

export const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionReady = useMotionReady();
  const motionKey = motionReady ? "motion" : "static";

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          ref={ref}
          key={`process-header-${motionKey}`}
          initial={motionReady ? { opacity: 0, y: 30 } : false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            How We Build
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Websites Built to Keep Visitors <span className="text-gradient-green">Hooked</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            When a visitor checks 100 competitors in your industry, they forget 99.
            We design the one they never forget.
          </p>
        </motion.div>

        {/* 3 Core Hook Principles */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {hookPrinciples.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <motion.div
                key={principle.title}
                initial={motionReady ? { opacity: 0, y: 30 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/40 hover-glow transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary text-primary">
                      {principle.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {principle.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-xs font-medium text-primary">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Engineered for unforgettable recall</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Engineering Methodology Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-xs font-semibold tracking-wider uppercase mb-2 block">
            Execution Roadmap
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            From Blueprint to Launch
          </h3>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <ProcessStep
              key={`${motionKey}-${step.number}`}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
              motionReady={motionReady}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
