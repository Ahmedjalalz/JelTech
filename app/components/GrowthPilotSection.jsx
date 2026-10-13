'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, ExternalLink, ArrowRight, Bot, Cpu, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMotionReady } from "../hooks/useMotionReady";

export const GrowthPilotSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionReady = useMotionReady();
  const motionKey = motionReady ? "motion" : "static";

  return (
    <section id="growthpilot" className="py-24 relative overflow-hidden bg-secondary/30 border-t border-border/60">
      {/* Background glow orbs */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          key={`growthpilot-header-${motionKey}`}
          initial={motionReady ? { opacity: 0, y: 30 } : false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            In-House AI Product
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            See How We Build AI: <span className="text-gradient-green">GrowthPilot AI</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Along with custom websites and digital solutions, we architect and deploy real-world AI products.
            GrowthPilot is our flagship intelligent marketing platform live in production.
          </p>
        </motion.div>

        {/* Feature Showcase Card */}
        <motion.div
          initial={motionReady ? { opacity: 0, y: 40 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden bg-card border-2 border-primary/30 p-8 sm:p-10 lg:p-12 shadow-2xl"
        >
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    SaaS Platform · Live at growth.jeltech.net
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  The Smart Marketing Assistant
                </h3>

                <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-xl">
                  GrowthPilot automates campaign planning, audience targeting, and strategic content creation.
                  It represents our standard for AI software engineering: intuitive human-first interfaces backed
                  by robust LLM pipelines and automated agents.
                </p>

                {/* Feature Grid */}
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-secondary/60 border border-border">
                    <Bot className="w-5 h-5 text-primary mb-2" />
                    <div className="text-xs font-bold text-foreground mb-1">Autonomous AI</div>
                    <div className="text-[11px] text-muted-foreground">Agents that research & draft tailored marketing.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/60 border border-border">
                    <Zap className="w-5 h-5 text-primary mb-2" />
                    <div className="text-xs font-bold text-foreground mb-1">Speed to Market</div>
                    <div className="text-[11px] text-muted-foreground">Instant campaigns configured in seconds.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/60 border border-border">
                    <Cpu className="w-5 h-5 text-primary mb-2" />
                    <div className="text-xs font-bold text-foreground mb-1">Live in Production</div>
                    <div className="text-[11px] text-muted-foreground">Active and accessible worldwide.</div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button variant="hero" size="lg" asChild>
                  <a
                    href="https://growth.jeltech.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 group/btn"
                  >
                    Open growth.jeltech.net
                    <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link href="/start-project" className="inline-flex items-center gap-2 group/btn2">
                    Build Custom AI With Us
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn2:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Preview Image */}
            <div className="lg:col-span-5">
              <a
                href="https://growth.jeltech.net"
                target="_blank"
                rel="noopener noreferrer"
                className="group/preview block relative rounded-2xl overflow-hidden border border-border bg-muted shadow-xl hover:border-primary/60 transition-all aspect-[16/10]"
              >
                <img
                  src="/assets/projects/growthpilot.png"
                  alt="GrowthPilot AI Platform Live"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/preview:scale-105"
                />
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-lg">
                    Visit growth.jeltech.net
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
