'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { EarlyAccessForm } from '@/components/EarlyAccessForm';
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
  BarChart3,
  ShieldCheck,
  Zap,
  Target,
  Users,
  Terminal,
  Cpu,
  ArrowLeft,
} from 'lucide-react';

export default function GrowthPilotPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Breadcrumb & Hero */}
        <section className="relative overflow-hidden pt-12 pb-16 border-b border-border/70">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            {/* Back to Products */}
            <div className="mb-6">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to All Products
              </Link>
            </div>

            {/* Status & Eyebrow */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Clock className="w-3.5 h-3.5" />
                IN DEVELOPMENT · INTERACTIVE PROTOTYPE
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                JelTech Flagship Software Initiative
              </span>
            </div>

            {/* Title & Mission */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              GrowthPilot AI: <br className="hidden sm:inline" />
              <span className="text-gradient-green">Marketing Intelligence for Small Businesses</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
              A purposeful software platform in active development, engineered to turn fragmented marketing noise into
              clear, prioritized next actions for business owners without dedicated analytics teams.
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="hero" size="xl" asChild>
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
              <Button variant="heroOutline" size="xl" asChild>
                <a href="#early-access">Join Early Access</a>
              </Button>
            </div>

            {/* Honest Disclosure Callout */}
            <div className="mt-8 p-4 rounded-2xl bg-secondary/30 border border-border/80 text-xs text-muted-foreground flex items-start gap-3 max-w-3xl">
              <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground">Development Transparency:</strong> GrowthPilot AI is currently in
                interactive prototype phase hosted at portal.jeltech.net. It is not yet a commercial SaaS with paying users.
                Features described below reflect implemented prototype workflows and active engineering roadmap milestones.
              </div>
            </div>
          </div>
        </section>

        {/* 1. The Core Problem */}
        <section className="py-20 border-b border-border/60 bg-secondary/10">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
                Problem Discovery
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                Why Small Business Marketing Is Broken
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <h3 className="text-lg font-bold text-foreground">Fragmented Tooling</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Business owners juggle Google Analytics, Meta Ads Manager, Google Search Console, and chaotic email spreadsheets. None of these tools communicate with each other.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <h3 className="text-lg font-bold text-foreground">Analytics Paralysis</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Traditional dashboards present CTR percentages, bounce rates, and indexing tables without answering the critical question: &quot;What concrete action should I take this week?&quot;
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <h3 className="text-lg font-bold text-foreground">Message &amp; Lead Disconnect</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Paid advertising hooks rarely align with landing page promises, leading to high bounce rates and lost inquiries before customers ever convert.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Target Audience */}
        <section className="py-20 border-b border-border/60">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">
                Target Users
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                Who We Are Building For
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  title: "Local Service Businesses",
                  description:
                    "Movers, renovation contractors, and professional firms needing steady inquiry volume without hiring a £3,000/month digital marketing agency.",
                },
                {
                  icon: Target,
                  title: "Independent E-commerce Brands",
                  description:
                    "DTC stores and boutique product companies that need to test advertising creative hooks and audit product landing pages quickly.",
                },
                {
                  icon: Cpu,
                  title: "Solo Founders & Operators",
                  description:
                    "Operators who wear every hat—sales, fulfillment, finance—and require automated weekly marketing directives to stay competitive.",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-6 rounded-2xl bg-card border border-border space-y-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary w-fit">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Product Architecture & Capabilities */}
        <section className="py-20 border-b border-border/60 bg-secondary/15">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="max-w-3xl mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">
                Core Capabilities
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">
                How GrowthPilot AI Works
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                GrowthPilot replaces confusing dashboards with an intelligent synthesis engine.
                Data is ingested, structured, analyzed against proven heuristics, and converted into prioritized actions.
              </p>
            </div>

            <div className="space-y-8">
              {/* Capability 1: SEO Intelligence */}
              <div className="p-8 rounded-3xl bg-card border border-border shadow-md grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Status: Interactive Prototype Ready
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    Automated Website SEO &amp; Health Auditing
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Crawls web pages to assess title tags, meta descriptions, structural headings, mobile responsiveness,
                    and indexation health. Instead of generating a 40-page PDF audit, GrowthPilot prioritizes the top 3 high-impact
                    updates needed to capture local search intent.
                  </p>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Instant Health Score calculated against standard web standards
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Effort vs. impact matrix for non-technical website owners
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5 p-5 rounded-2xl bg-secondary/40 border border-border font-mono text-xs space-y-3">
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider font-sans font-bold">
                    Sample Recommendation Card
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border text-foreground">
                    <div className="text-amber-400 font-bold mb-1">Issue: Low Click-Through on /services</div>
                    <div className="text-xs text-muted-foreground">Title tag missing geographic intent (&quot;Auckland&quot;). Projected lift: +18% organic visibility.</div>
                  </div>
                  <div className="text-[10px] text-muted-foreground text-right italic font-sans">
                    Simulated logic in current prototype
                  </div>
                </div>
              </div>

              {/* Capability 2: Ad Creative & Hook Evaluator */}
              <div className="p-8 rounded-3xl bg-card border border-border shadow-md grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Clock className="w-3.5 h-3.5" />
                    Status: Engineering Roadmap Milestone
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    Ad Creative &amp; Hook Strength Evaluator
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Pre-tests advertising headlines, copy angles, and hook concepts against target audience personas.
                    Verifies that the promise made in advertising creatives matches the messaging on destination landing pages.
                  </p>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Hook resonance scoring based on copy clarity and value proposition
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Continuity checks between social ad hooks and landing page copy
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5 p-5 rounded-2xl bg-secondary/40 border border-border font-mono text-xs space-y-3">
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider font-sans font-bold">
                    Creative Hook Analysis Concept
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border space-y-2">
                    <div className="text-emerald-400 font-bold">Hook Score: 8.8 / 10</div>
                    <div className="text-xs text-muted-foreground">&quot;Transparent moving rates with zero hidden fees&quot;</div>
                    <div className="text-[10px] text-muted-foreground">High resonance for cost-conscious movers.</div>
                  </div>
                </div>
              </div>

              {/* Capability 3: Lead Management Hub */}
              <div className="p-8 rounded-3xl bg-card border border-border shadow-md grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Status: Interactive Prototype Ready
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    Unified Inbound Lead Stream &amp; Triage
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Centralizes customer inquiries from web forms, quote requests, and messaging channels into one inbox.
                    Generates instant context summaries so operators can reply swiftly and close inquiries into booked jobs.
                  </p>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Origin attribution linking each lead to its campaign or search origin
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Status management pipeline (New &rarr; Contacted &rarr; Booked)
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5 p-5 rounded-2xl bg-secondary/40 border border-border font-mono text-xs space-y-3">
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider font-sans font-bold">
                    Inbound Lead Architecture
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border space-y-1.5">
                    <div className="text-foreground font-bold">3 New Inbound Inquiries</div>
                    <div className="text-[11px] text-emerald-400">Avg. Response Time Target: &lt; 15 mins</div>
                    <div className="text-[10px] text-muted-foreground">Integrated with standard webhook endpoints</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Technical Architecture & Engineering Narrative */}
        <section className="py-20 border-b border-border/60">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">
                Technical Architecture
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">
                Structured Engineering, Grounded AI
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Rather than deploying generic conversational chatbots that hallucinate metrics, GrowthPilot is designed
                around deterministic data extraction pipelines coupled with structured LLM reasoning.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-7 rounded-2xl bg-card border border-border space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Terminal className="w-4 h-4" />
                  Structured Ingestion &amp; Synthesis
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Web pages are crawled and serialized into clean JSON DOM schemas. Technical metrics (HTTP response,
                  meta descriptions, Open Graph data, page speeds) are extracted deterministically before being passed
                  to LLM reasoning prompts.
                </p>
                <div className="p-3.5 rounded-xl bg-secondary/30 border border-border text-xs text-muted-foreground space-y-1">
                  <div><strong>Frontend:</strong> Next.js 15, React, Tailwind CSS</div>
                  <div><strong>Data Modeling:</strong> TypeScript / JSON Schema validation</div>
                  <div><strong>Reasoning Models:</strong> Frontier LLMs (e.g., Anthropic Claude) via structured prompts</div>
                </div>
              </div>

              <div className="p-7 rounded-2xl bg-card border border-border space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  Engineering Guardrails
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  To protect business operators from erroneous recommendations, all suggestions are validated against
                  established SEO heuristics. If an ad creative cannot be evaluated with high confidence, the system flags it
                  for human review instead of providing speculative advice.
                </p>
                <div className="p-3.5 rounded-xl bg-secondary/30 border border-border text-xs text-muted-foreground space-y-1">
                  <div><strong>No Foundation Model Claims:</strong> We leverage best-in-class third-party models</div>
                  <div><strong>No Fabricated Metrics:</strong> Prototype clearly labeled as simulation</div>
                  <div><strong>Privacy Respecting:</strong> Business customer data is not used for model training</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Development Roadmap */}
        <section className="py-20 border-b border-border/60 bg-secondary/10">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">
                Product Milestones
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                Current Progress &amp; Planned Milestones
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  phase: "Milestone 1 · Completed",
                  title: "UX Architecture & Interactive Prototype Workspace",
                  status: "Live at portal.jeltech.net",
                  color: "emerald",
                  details:
                    "Designed full portal navigation, metric visualization components, sample business workflows, and interactive prototype ergonomics to validate usability.",
                },
                {
                  phase: "Milestone 2 · In Active Engineering",
                  title: "Live Web Crawl & Technical Audit Pipeline",
                  status: "In Development",
                  color: "amber",
                  details:
                    "Building server-side crawler microservices to extract DOM metadata, detect broken tags, evaluate page performance, and structure site health signals.",
                },
                {
                  phase: "Milestone 3 · Planned Roadmap",
                  title: "Structured LLM Reasoning & Ad Creative Evaluator",
                  status: "Upcoming Milestone",
                  color: "sky",
                  details:
                    "Integrating structured LLM prompts (via Anthropic Claude API) to synthesize audit signals into plain-English priority action cards and evaluate ad creative hooks.",
                },
                {
                  phase: "Milestone 4 · Planned Roadmap",
                  title: "Closed Alpha Cohort Testing",
                  status: "Planned Milestone",
                  color: "sky",
                  details:
                    "Inviting an initial cohort of 10-15 small business operators to test live audits on their actual commercial websites and provide iterative qualitative feedback.",
                },
              ].map((m, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                      <span className={m.color === "emerald" ? "text-emerald-400" : m.color === "amber" ? "text-amber-400" : "text-sky-400"}>
                        {m.phase}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{m.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {m.details}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        m.color === "emerald"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : m.color === "amber"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Honest Early Access / Inquiry Form */}
        <section id="early-access" className="py-24">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="p-8 sm:p-12 rounded-3xl bg-card border border-border shadow-2xl relative overflow-hidden">
              <div className="text-center max-w-xl mx-auto mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  Follow Development
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
                  Interested in GrowthPilot AI?
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  We are actively building and testing with small business operators. Leave your details below
                  to receive transparent engineering updates and be notified when closed alpha testing opens.
                </p>
              </div>

              <EarlyAccessForm productName="GrowthPilot AI" />

              <div className="mt-8 pt-6 border-t border-border/60 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-muted-foreground">
                <a
                  href="https://portal.jeltech.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1 font-semibold"
                >
                  Test Interactive Prototype <ExternalLink className="w-3 h-3" />
                </a>
                <span className="hidden sm:inline">•</span>
                <Link href="/start-project" className="hover:text-primary transition-colors font-semibold">
                  Need Custom Client Engineering? Start a Project &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
