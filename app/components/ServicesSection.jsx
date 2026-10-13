'use client';

import { motion } from "framer-motion";
import { useMotionReady } from "../hooks/useMotionReady";
import {
  Globe,
  Layers,
  Bot,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const coreServices = [
  {
    icon: Globe,
    badge: "Primary Focus",
    title: "Custom Websites & Experiences",
    description:
      "Bespoke websites engineered from the ground up to captivate visitors. We build distinctive visual hooks, interactive tactile details, and lightning-fast performance so your brand remains permanently unforgettable.",
    features: [
      "Signature interactive hooks & micro-interactions",
      "High-dwell-time UI designed to hook users",
      "Clean, modern code with Next.js & React",
      "Sub-second load times & technical SEO",
    ],
  },
  {
    icon: Layers,
    badge: "Core Expertise",
    title: "Custom Digital Solutions",
    description:
      "Tailor-made web applications and digital infrastructure built to resolve business bottlenecks. From custom quote engines and customer portals to interactive dashboards and automated workflows.",
    features: [
      "Custom portals, calculators & booking flows",
      "Seamless integrations & API architecture",
      "Scalable database & backend logic",
      "User-friendly workflows that save team hours",
    ],
  },
  {
    icon: Bot,
    badge: "Next-Gen Capabilities",
    title: "AI Solutions & Intelligent Products",
    description:
      "We design and deploy practical AI solutions that transform business operations. From autonomous workflow agents and conversational tools to full-scale AI SaaS products like GrowthPilot.",
    features: [
      "Custom AI agents & intelligent automation",
      "LLM integrations tailored to your domain",
      "Automated lead capture & data enrichment",
      "Production-ready AI product development",
    ],
  },
];

export const ServicesSection = () => {
  const motionReady = useMotionReady();

  return (
    <section id="services" className="py-20 sm:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={motionReady ? { opacity: 0, y: 25 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            What We Build
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Focused On What Moves The Needle
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            We don&apos;t spread ourselves thin. We concentrate on crafting exceptional custom websites,
            tailored digital solutions, and cutting-edge AI systems.
          </p>
        </motion.div>

        {/* 3 Core Services Pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {coreServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={motionReady ? { opacity: 0, y: 30 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/40 hover-glow transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-primary border border-primary/20">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 pt-4 border-t border-border mb-6">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/90">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Button variant="ghost" className="w-full justify-between group/link px-0 text-primary hover:bg-transparent hover:text-primary" asChild>
                    <Link href="/start-project">
                      <span>Discuss Your Project</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
