'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ExternalLink,
  Search,
  Megaphone,
  Inbox,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  BarChart2,
  ChevronRight,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EarlyAccessForm } from "./EarlyAccessForm";

export const GrowthPilotShowcase = () => {
  const [activeTab, setActiveTab] = useState("seo");

  return (
    <section id="growthpilot" className="py-24 relative overflow-hidden bg-background border-b border-border/70">
      {/* Subtle ambient glow matching brand green */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Eyebrow & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            JelTech Flagship Product Initiative
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            GrowthPilot AI: <span className="text-gradient-green">Marketing Intelligence for Small Businesses</span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Small business owners don&apos;t have time to decipher fragmented analytics across Google, Meta, and SEO tools.
            GrowthPilot AI is being developed to turn marketing noise into prioritized, actionable next steps.
          </p>
        </motion.div>

        {/* Main Showcase Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left: Problem, Capabilities & Honest Status (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* The Problem We Are Solving */}
            <div className="p-6 sm:p-7 rounded-2xl bg-card border border-border/80 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                <ShieldAlert className="w-4 h-4" />
                The Problem Small Businesses Face
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                Data Without Direction
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                Most digital marketing tools are engineered for enterprise growth teams with dedicated data analysts.
                Small business operators are left drowning in CTR percentages, bounce rates, and cryptic SEO scores—without
                knowing what change will actually generate more customer inquiries.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 pt-3 border-t border-border/60 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">01.</span>
                  <span>Fragmented dashboards across multiple ad and search platforms</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">02.</span>
                  <span>Opaque technical jargon rather than concrete execution tasks</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">03.</span>
                  <span>Ad hooks that disconnect from landing page user journeys</span>
                </div>
              </div>
            </div>

            {/* Core Capabilities Breakdown */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                <span>Planned &amp; Prototype Modules</span>
                <span className="text-primary">Click to inspect</span>
              </div>

              {/* Capability Tabs */}
              <div className="grid sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("seo")}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    activeTab === "seo"
                      ? "bg-card border-primary/50 shadow-md text-foreground"
                      : "bg-secondary/20 border-border/60 text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Search className={`w-4 h-4 ${activeTab === "seo" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-xs font-bold">SEO Audit</span>
                  </div>
                  <span className="text-[11px] block text-emerald-400 font-medium">In Prototype</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("ads")}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    activeTab === "ads"
                      ? "bg-card border-primary/50 shadow-md text-foreground"
                      : "bg-secondary/20 border-border/60 text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Megaphone className={`w-4 h-4 ${activeTab === "ads" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-xs font-bold">Ad Evaluator</span>
                  </div>
                  <span className="text-[11px] block text-amber-400 font-medium">Planned Module</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("leads")}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    activeTab === "leads"
                      ? "bg-card border-primary/50 shadow-md text-foreground"
                      : "bg-secondary/20 border-border/60 text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Inbox className={`w-4 h-4 ${activeTab === "leads" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-xs font-bold">Unified Leads</span>
                  </div>
                  <span className="text-[11px] block text-emerald-400 font-medium">In Prototype</span>
                </button>
              </div>

              {/* Tab Detail Card */}
              <div className="p-6 rounded-2xl bg-card/60 border border-border/80">
                {activeTab === "seo" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-foreground text-base">Website SEO &amp; Health Intelligence</h4>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                        Interactive Prototype Ready
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Crawls site architecture to detect broken meta tags, indexing bottlenecks, and keyword voids.
                      Instead of presenting an incomprehensible audit report, GrowthPilot distills issues into 3 prioritized, plain-English action items.
                    </p>
                    <ul className="space-y-1.5 text-xs text-muted-foreground pt-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span>Instant health score with effort-vs-impact rating</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span>Actionable recommendations tailored for non-technical founders</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "ads" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-foreground text-base">Ad Creative &amp; Hook Evaluator</h4>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold">
                        Roadmap Milestone
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Evaluates advertising copy, headline hooks, and landing page continuity before budget is spent.
                      Assists business owners in matching customer intent to page messaging to prevent expensive bounce rates.
                    </p>
                    <ul className="space-y-1.5 text-xs text-muted-foreground pt-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span>Pre-flight headline and hook strength scoring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span>Alignment audit between advertising promise and website copy</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "leads" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-foreground text-base">Inbound Lead Hub &amp; Workflows</h4>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                        Interactive Prototype Ready
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Consolidates form inquiries, quote requests, and messaging channels in one streamlined inbox.
                      Provides automated context summaries so small business owners can follow up quickly and effectively.
                    </p>
                    <ul className="space-y-1.5 text-xs text-muted-foreground pt-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span>Centralized inquiry stream with origin source tracking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span>Simulated lead triage &amp; status workflow in prototype</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* CTAs & Early Access */}
            <div className="pt-2 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="hero" size="lg" asChild>
                  <a
                    href="https://portal.jeltech.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    Test Interactive Prototype
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link href="/products/growthpilot" className="gap-2">
                    Technical Deep Dive
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              {/* Inline Early Access Input */}
              <div className="p-4 rounded-2xl bg-card border border-border/80 mt-4">
                <span className="text-xs font-bold text-foreground block mb-2">
                  Follow Development &amp; Early Alpha Testing
                </span>
                <EarlyAccessForm compact productName="GrowthPilot AI" />
              </div>
            </div>
          </motion.div>

          {/* Right: Realistic SaaS Concept & Grounded Dashboard Preview (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5"
          >
            {/* Dashboard Mockup Card */}
            <div className="rounded-3xl bg-card border border-border/90 shadow-2xl overflow-hidden">
              {/* Window Header */}
              <div className="px-5 py-3.5 bg-secondary/40 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  <span className="text-xs font-mono text-muted-foreground ml-2">portal.jeltech.net</span>
                </div>
                <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-primary/20 text-primary uppercase">
                  Prototype UI
                </span>
              </div>

              {/* Dashboard Content Container */}
              <div className="p-5 space-y-4 bg-gradient-to-b from-card to-background">
                {/* Simulated Business Header */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/60">
                  <div>
                    <span className="text-[11px] text-muted-foreground block font-medium">Workspace</span>
                    <span className="text-sm font-bold text-foreground">Auckland Local Logistics</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-muted-foreground block font-medium">Overall Health</span>
                    <span className="text-sm font-extrabold text-primary">82 / 100</span>
                  </div>
                </div>

                {/* Priority Action Card (The Core Philosophy: Action over Graphs) */}
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/30">
                  <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    Recommended Priority Action
                  </div>
                  <h5 className="text-sm font-semibold text-foreground mb-1">
                    Optimize &quot;Auckland Furniture Moving&quot; Landing Page
                  </h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Page bounce rate is 64%. Updating the primary mobile CTA and adding customer reviews above the fold is projected to lift inquiries.
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Effort: <strong className="text-foreground">Low (15 min)</strong></span>
                    <span className="text-emerald-400 font-semibold">Impact: High</span>
                  </div>
                </div>

                {/* Metrics Breakdown Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-secondary/20 border border-border/60">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Organic Health</span>
                      <Search className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="text-lg font-bold text-foreground">78%</div>
                    <span className="text-[10px] text-muted-foreground">3 meta titles need attention</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-secondary/20 border border-border/60">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Lead Flow</span>
                      <Inbox className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="text-lg font-bold text-foreground">14 New</div>
                    <span className="text-[10px] text-muted-foreground">Across quote forms &amp; chat</span>
                  </div>
                </div>

                {/* Simulated Campaign Hook Score */}
                <div className="p-3.5 rounded-xl bg-secondary/20 border border-border/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">Ad Hook Resonance Analysis</span>
                    <span className="text-amber-400 font-bold">Planned Model</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>&quot;Transparent moving rates with zero hidden fees&quot;</span>
                      <span className="font-bold text-foreground">8.8 / 10</span>
                    </div>
                    <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "88%" }} />
                    </div>
                  </div>
                </div>

                {/* Transparent Disclosure */}
                <div className="p-3 rounded-xl bg-secondary/40 border border-border/50 text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground">Development Transparency:</strong> The preview above illustrates our prototype interface at portal.jeltech.net. Live search engine API synchronization and automated LLM reasoning are currently in active engineering.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
