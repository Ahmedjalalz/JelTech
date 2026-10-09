'use client';

import { motion } from "framer-motion";
import {
  Lightbulb,
  Palette,
  Terminal,
  CheckCircle,
  RefreshCw,
  Cpu,
  ShieldCheck,
  Code2,
  Workflow,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Problem Discovery",
    icon: Lightbulb,
    badge: "Completed for GrowthPilot",
    badgeColor: "emerald",
    description:
      "We identify high-friction operational bottlenecks experienced by small businesses and client partners—such as data overload in marketing dashboards and disconnects between ad spend and leads.",
    details: "Focuses on genuine business utility over trend chasing.",
  },
  {
    step: "02",
    title: "UX Architecture & Rapid Prototyping",
    icon: Palette,
    badge: "Live at portal.jeltech.net",
    badgeColor: "emerald",
    description:
      "Before engineering complex model pipelines, we design and deploy interactive prototypes to test ergonomics, layout clarity, and workflow ergonomics with real user inputs.",
    details: "Validates workflow simplicity and interface viability early.",
  },
  {
    step: "03",
    title: "Structured LLM Reasoning & Connectors",
    icon: Terminal,
    badge: "In Active Engineering",
    badgeColor: "amber",
    description:
      "We engineer structured data ingestion pipelines (web crawlers, SEO health checkers, ad creative extractors) and leverage frontier LLM reasoning to synthesize plain-English action items.",
    details: "Structured output pipelines over web data; zero hallucinated claims.",
  },
  {
    step: "04",
    title: "Validation & Guardrails",
    icon: CheckCircle,
    badge: "Calibration Phase",
    badgeColor: "amber",
    description:
      "We stress-test model outputs against known SEO best practices and conversion benchmarks to ensure recommendations are verifiable, safe, and actionable for non-technical users.",
    details: "Strict prompt guardrails and deterministic validation checks.",
  },
  {
    step: "05",
    title: "Phased Alpha Rollout",
    icon: RefreshCw,
    badge: "Planned Milestone",
    badgeColor: "sky",
    description:
      "We test with closed cohorts of small business operators to capture qualitative feedback, refine recommendation priorities, and continuously iterate the software.",
    details: "Direct feedback loops to guide production release.",
  },
];

export const ProductJourneySection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-secondary/10 border-b border-border/70">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Workflow className="w-3.5 h-3.5" />
            Product Engineering Framework
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            How JelTech Develops <span className="text-gradient-green">Software Products</span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            We build software grounded in practical business execution. From discovering operational friction
            to engineering structured AI reasoning pipelines, here is our transparent development lifecycle.
          </p>
        </motion.div>

        {/* 5-Step Process Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto mb-16">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-5 rounded-2xl bg-card border border-border/80 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-muted-foreground">
                      STAGE {item.step}
                    </span>
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-foreground mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60">
                  <span
                    className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.badgeColor === "emerald"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : item.badgeColor === "amber"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Credible AI Architecture Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto p-8 rounded-3xl bg-card border border-border/90 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Code2 className="w-4 h-4" />
                Technical Integrity &amp; AI Architecture
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-foreground">
                Grounded AI Reasoning Over Generic Chat Wrappers
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                We do not claim to pre-train proprietary foundation models. Instead, JelTech applies modern full-stack
                engineering, structured API connectors, and frontier LLMs (such as Anthropic Claude) via deterministic
                prompting and schema validation. The result is actionable, hallucination-resistant business intelligence
                rather than conversational novelty.
              </p>
            </div>

            <div className="md:col-span-4 p-5 rounded-2xl bg-secondary/30 border border-border/70 space-y-2.5 text-xs">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Development Standard
              </div>
              <ul className="space-y-1.5 text-muted-foreground text-[11px]">
                <li>• No fabricated user counts or synthetic revenue</li>
                <li>• Clear delineation of prototype vs. production</li>
                <li>• Grounded data extraction over unverified claims</li>
                <li>• Designed for measurable operational utility</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
