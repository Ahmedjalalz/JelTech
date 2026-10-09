'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Code2, ShieldCheck, Cpu } from "lucide-react";

const pillars = [
  {
    icon: Sparkles,
    title: "Interactive & Purposeful",
    description:
      "We design distinctive web experiences that turn dry service explanations into engaging interfaces visitors actually want to explore.",
  },
  {
    icon: Code2,
    title: "Performance-First Engineering",
    description:
      "Clean, modern React and Next.js architecture with lean bundles, fast load times, and maintainable structure built for longevity.",
  },
  {
    icon: ShieldCheck,
    title: "Direct & Transparent Partnership",
    description:
      "Direct communication with the engineers building your product. Realistic timelines, transparent scoping, and zero buzzwords.",
  },
  {
    icon: Cpu,
    title: "Applied Software & AI Expertise",
    description:
      "We don't just talk about software—we actively engineer our own AI products, bringing tested engineering practices directly to your project.",
  },
];

export const WhyChooseUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-secondary/20 border-y border-border/60">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 block">
            Our Standards
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            How We Deliver <span className="text-gradient-green">Real Value</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Our approach prioritizes quality craftsmanship, engineering rigor, and honest collaboration over inflated promises.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-7 rounded-2xl bg-card border border-border hover:border-primary/40 hover-lift transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
