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
  Calendar,
  FileText,
  Building2,
  Code2,
  CheckSquare,
  Award,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EarlyAccessForm } from "./EarlyAccessForm";

export const pilotClients = [
  {
    name: "Oblyvyon",
    sector: "Fashion & Lifestyle E-Commerce",
    url: "http://oblyvyon.com/",
    useCase: "Meta Ad Creative Scoring & Catalog Sales Optimization",
  },
  {
    name: "Aspire Removals & Transport",
    sector: "UK Logistics & Transport",
    url: "https://aspireremovalsandtransport.co.uk/",
    useCase: "Quote Form Builder & Omnichannel Lead Management",
  },
  {
    name: "Paul Movers",
    sector: "Moving & Storage Services (NZ)",
    url: "https://www.paulmovers.co.nz/",
    useCase: "Local SEO Intelligence & Automated Quote Triage",
  },
  {
    name: "PaulAid",
    sector: "Charitable Foundation & Aid",
    url: "http://paulaid.org/",
    useCase: "Community Inquiries Hub & Organic Search Visibility",
  },
  {
    name: "Education and Life Foundation",
    sector: "Nonprofit & Social Impact",
    url: "https://educationandlifefoundation.org/",
    useCase: "Program Inquiry Forms & Content Gap Publishing",
  },
  {
    name: "PackifyBoxes",
    sector: "Custom Packaging Manufacturing",
    url: "https://www.packifyboxes.com/",
    useCase: "Custom B2B Quote Pipeline & Meta Ad Scaling",
  },
  {
    name: "InfinityBuild",
    sector: "Construction & Renovation (Europe)",
    url: "https://www.infinitybuild.eu/",
    useCase: "Project Estimate Builder & WhatsApp/Web Inbox",
  },
];

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
            GrowthPilot AI: <span className="text-gradient-green">The Smart Marketing Assistant</span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            One AI-powered platform handling SEO, Meta advertising, and unified customer conversations across
            WhatsApp, Instagram, and Facebook—so small businesses can grow online without hiring a marketing team.
          </p>
        </motion.div>

        {/* Commercial Validation Banner: Signed Pilot Client Agreements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto mb-14 p-6 sm:p-7 rounded-3xl bg-card border-2 border-primary/30 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 mb-5 border-b border-border/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Commercial Market Validation
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                      Signed Agreements
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    Pre-Validated Demand: Signed Early Access Agreements with 5–7 Pilot Clients
                  </h3>
                </div>
              </div>
              <div className="text-xs text-muted-foreground md:text-right">
                Committed to purchasing and deploying upon completion
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
              Before writing backend production models, JelTech secured signed early-access adoption agreements
              with 5–7 active commercial businesses across logistics, e-commerce, custom manufacturing, and construction.
              These pilot partners will deploy GrowthPilot AI to drive their traffic, Meta ad campaigns, and customer workflows:
            </p>

            {/* Pilot Clients Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {pilotClients.map((client, idx) => (
                <a
                  key={idx}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-secondary/30 border border-border/80 hover:border-primary/50 hover:bg-secondary/50 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">
                        {client.name}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-[11px] text-muted-foreground block mb-2">
                      {client.sector}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-border/50 text-[10px] text-emerald-400 font-medium">
                    Signed Early Adopter Agreement
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Showcase Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left: Problem, Multi-Module Engine & Status (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* The Core Problem */}
            <div className="p-6 sm:p-7 rounded-2xl bg-card border border-border/80 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                <ShieldAlert className="w-4 h-4" />
                The Problem Every Small Business Faces Online
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                Three Jobs SMBs Were Never Built For
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                To succeed online, a business owner is expected to rank on Google, run profitable Meta ads, and reply
                instantly across Instagram, WhatsApp, and Facebook. Doing all three normally requires an SEO consultant,
                an ads specialist, and a social media manager—a recurring cost most SMBs cannot justify.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 pt-3 border-t border-border/60 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">01.</span>
                  <span>Opaque SEO reports without code fixes or written content</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">02.</span>
                  <span>Wasted ad budget from unoptimized hooks and manual bidding</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">03.</span>
                  <span>Missed leads scattered across WhatsApp, IG, and Facebook</span>
                </div>
              </div>
            </div>

            {/* Core Capabilities Breakdown */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                <span>Core Engine &amp; Feature Modules</span>
                <span className="text-primary">Click to inspect</span>
              </div>

              {/* Capability Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("seo")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeTab === "seo"
                      ? "bg-card border-primary/50 shadow-md text-foreground"
                      : "bg-secondary/20 border-border/60 text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Search className={`w-3.5 h-3.5 ${activeTab === "seo" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-xs font-bold">SEO Engine</span>
                  </div>
                  <span className="text-[10px] block text-emerald-400 font-medium">In Prototype</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("ads")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeTab === "ads"
                      ? "bg-card border-primary/50 shadow-md text-foreground"
                      : "bg-secondary/20 border-border/60 text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Megaphone className={`w-3.5 h-3.5 ${activeTab === "ads" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-xs font-bold">Meta Ads</span>
                  </div>
                  <span className="text-[10px] block text-amber-400 font-medium">In Engineering</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("leads")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeTab === "leads"
                      ? "bg-card border-primary/50 shadow-md text-foreground"
                      : "bg-secondary/20 border-border/60 text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Inbox className={`w-3.5 h-3.5 ${activeTab === "leads" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-xs font-bold">Omnichannel</span>
                  </div>
                  <span className="text-[10px] block text-emerald-400 font-medium">In Prototype</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("modules")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeTab === "modules"
                      ? "bg-card border-primary/50 shadow-md text-foreground"
                      : "bg-secondary/20 border-border/60 text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Layers className={`w-3.5 h-3.5 ${activeTab === "modules" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-xs font-bold">Biz Modules</span>
                  </div>
                  <span className="text-[10px] block text-emerald-400 font-medium">Plug &amp; Play</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("api")}
                  className={`p-3 rounded-xl border text-left transition-all col-span-2 sm:col-span-1 ${
                    activeTab === "api"
                      ? "bg-card border-primary/50 shadow-md text-foreground"
                      : "bg-secondary/20 border-border/60 text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Code2 className={`w-3.5 h-3.5 ${activeTab === "api" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-xs font-bold">Dev API</span>
                  </div>
                  <span className="text-[10px] block text-sky-400 font-medium">Headless</span>
                </button>
              </div>

              {/* Tab Detail Card */}
              <div className="p-6 rounded-2xl bg-card/60 border border-border/80">
                {activeTab === "seo" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-foreground text-base">Module 1: SEO Intelligence Engine</h4>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                        Interactive Prototype Ready
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Scans any submitted website link and produces a plain-language audit of technical issues, content gaps,
                      and missed search opportunities. GrowthPilot does not just report problems—it takes action.
                    </p>
                    <ul className="space-y-1.5 text-xs text-muted-foreground pt-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>AI-Generated SEO Articles:</strong> Writes targeted articles to fill content gaps, with ready-to-paste snippets or automated CMS code injection.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Keyword Research &amp; Off-Page Authority:</strong> Identifies high-converting niche search terms and runs authority-building backlink strategies.</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "ads" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-foreground text-base">Module 2: Smart Ads Manager (Meta Ads)</h4>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold">
                        In Active Engineering
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Plans, launches, and continuously optimizes Facebook &amp; Instagram ad campaigns without requiring an ads specialist or manual budget tracking.
                    </p>
                    <ul className="space-y-1.5 text-xs text-muted-foreground pt-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>AI Creative Scoring:</strong> Pre-evaluates images, copy, and video hooks (e.g. 3/10 hook vs 7/10 benchmark) with specific improvement advice before ad spend is live.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Auto-Optimization &amp; Budget Scaling:</strong> Continuously shifts budget to top-performing ads, pauses underperformers, and duplicates winners with variations.</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "leads" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-foreground text-base">Module 3: Unified Leads Management (Omnichannel)</h4>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                        Interactive Prototype Ready
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Consolidates conversations across WhatsApp Business, Instagram DMs, Facebook Messenger, and website forms into a single shared inbox.
                    </p>
                    <ul className="space-y-1.5 text-xs text-muted-foreground pt-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Zero Missed Leads:</strong> Business owners reply from one dashboard instead of checking multiple apps throughout the day.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Origin Attribution:</strong> Automatically links customer inquiries back to the SEO page or Meta ad that brought them in.</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "modules" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-foreground text-base">Plug-and-Play Business Feature Modules</h4>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                        Modular Architecture
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Optional operational tools that businesses switch on based on their model—feeding directly into the growth engine:
                    </p>
                    <div className="grid sm:grid-cols-3 gap-2 text-xs text-muted-foreground pt-1">
                      <div className="p-2.5 rounded-lg bg-secondary/30 border border-border/70">
                        <div className="font-bold text-foreground flex items-center gap-1 mb-1">
                          <Calendar className="w-3 h-3 text-primary" /> Bookings
                        </div>
                        For salons, barbers, clinics, &amp; consultants with staff and schedule management.
                      </div>
                      <div className="p-2.5 rounded-lg bg-secondary/30 border border-border/70">
                        <div className="font-bold text-foreground flex items-center gap-1 mb-1">
                          <FileText className="w-3 h-3 text-primary" /> Quotes &amp; Forms
                        </div>
                        For schools, admissions, and service businesses capturing structured quote requests.
                      </div>
                      <div className="p-2.5 rounded-lg bg-secondary/30 border border-border/70">
                        <div className="font-bold text-foreground flex items-center gap-1 mb-1">
                          <Building2 className="w-3 h-3 text-primary" /> Rental Listings
                        </div>
                        For property, vehicle, and unit rentals to manage inventory and capture bookings.
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "api" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-foreground text-base">Developer API &amp; Headless Integration</h4>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-semibold">
                        API Gateway
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Businesses with existing websites don&apos;t need to abandon them. GrowthPilot AI exposes its feature
                      modules (bookings, quote builder, rental engine) as backend APIs.
                    </p>
                    <ul className="space-y-1.5 text-xs text-muted-foreground pt-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Keep your existing custom frontend and simply connect GrowthPilot&apos;s backend logic.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Every external booking or form submission flows straight into the unified growth dashboard.</span>
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
                    Complete Documentation &amp; Architecture
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              {/* Inline Early Access Input */}
              <div className="p-4 rounded-2xl bg-card border border-border/80 mt-4">
                <span className="text-xs font-bold text-foreground block mb-2">
                  Join Pilot Client Cohort &amp; Follow Development Updates
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
                    <span className="text-sm font-bold text-foreground">Paul Movers · Auckland Hub</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-muted-foreground block font-medium">Overall Growth Score</span>
                    <span className="text-sm font-extrabold text-primary">84 / 100</span>
                  </div>
                </div>

                {/* Priority Action Card (The Core Philosophy: Action over Graphs) */}
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/30">
                  <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    Auto-Optimization Recommendation
                  </div>
                  <h5 className="text-sm font-semibold text-foreground mb-1">
                    Meta Ad Campaign: Scale Ad Variation #3
                  </h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Creative hook scored 8.8/10 with 18 lead inquiries generated. GrowthPilot suggests reallocating
                    $150 from underperforming Campaign #1 to scale Variation #3.
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Action: <strong className="text-foreground">Budget Rebalance (1-Click)</strong></span>
                    <span className="text-emerald-400 font-semibold">Projected: +32% Inquiries</span>
                  </div>
                </div>

                {/* Metrics Breakdown Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-secondary/20 border border-border/60">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">SEO Health</span>
                      <Search className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="text-lg font-bold text-foreground">81%</div>
                    <span className="text-[10px] text-emerald-400">2 articles ready to publish</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-secondary/20 border border-border/60">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Unified Leads</span>
                      <Inbox className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="text-lg font-bold text-foreground">19 New</div>
                    <span className="text-[10px] text-muted-foreground">WhatsApp (11), IG (5), Web (3)</span>
                  </div>
                </div>

                {/* Simulated Campaign Hook Score */}
                <div className="p-3.5 rounded-xl bg-secondary/20 border border-border/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">AI Creative Hook Evaluation</span>
                    <span className="text-emerald-400 font-bold">Scored 8.8 / 10</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>&quot;Auckland moving with zero hidden fees — instant quote&quot;</span>
                      <span className="font-bold text-foreground">Strong Hook</span>
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
                    <strong className="text-foreground">Development Transparency:</strong> The preview above illustrates our prototype interface at portal.jeltech.net. Live Meta Marketing &amp; WhatsApp Business API connectors and automated LLM reasoning are currently in active engineering.
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
