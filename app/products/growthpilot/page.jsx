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
  ArrowLeft,
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
  Award,
  ArrowUpRight,
  Calendar,
  FileText,
  Building2,
  Code2,
  CheckSquare,
  Globe,
  Database,
  Network,
  Sliders,
  ShieldAlert,
} from 'lucide-react';

const pilotClients = [
  {
    name: 'Oblyvyon',
    sector: 'Fashion & Lifestyle E-Commerce',
    url: 'http://oblyvyon.com/',
    useCase: 'Meta Ad Creative Scoring, Hook Evaluation & Catalog Scaling',
    focus: 'Paid Acquisition & Landing Page Conversion',
  },
  {
    name: 'Aspire Removals & Transport',
    sector: 'UK Logistics & Transport',
    url: 'https://aspireremovalsandtransport.co.uk/',
    useCase: 'Custom Quote Form Builder & Omnichannel Inbound Lead Management',
    focus: 'Structured Quotes & WhatsApp Inquiries',
  },
  {
    name: 'Paul Movers',
    sector: 'Moving & Storage Services (NZ)',
    url: 'https://www.paulmovers.co.nz/',
    useCase: 'Local SEO Audit, AI Content Injection & Automated Quote Triage',
    focus: 'Organic Search & Fast Inbound Closing',
  },
  {
    name: 'PaulAid',
    sector: 'Charitable Foundation & Aid',
    url: 'http://paulaid.org/',
    useCase: 'Community Inquiries Hub & Organic Search Visibility',
    focus: 'Multichannel Inquiries & Program SEO',
  },
  {
    name: 'Education and Life Foundation',
    sector: 'Nonprofit & Social Impact',
    url: 'https://educationandlifefoundation.org/',
    useCase: 'Program Application Forms & Automated Content Publishing',
    focus: 'Form Builder & Content Gap Identification',
  },
  {
    name: 'PackifyBoxes',
    sector: 'Custom Packaging Manufacturing',
    url: 'https://www.packifyboxes.com/',
    useCase: 'B2B Custom Box Quote Pipeline & Meta Ad Scale Optimization',
    focus: 'B2B Lead Pipeline & Paid Search Sync',
  },
  {
    name: 'InfinityBuild',
    sector: 'Construction & Renovation (Europe)',
    url: 'https://www.infinitybuild.eu/',
    useCase: 'Project Estimate Builder & WhatsApp/Web Omnichannel Inbox',
    focus: 'Interactive Inquiries & Automated Budgeting',
  },
];

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
              <span className="text-gradient-green">The Smart Marketing &amp; Growth Assistant</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
              One AI-powered platform handling SEO, Meta advertising, and customer conversations across
              WhatsApp, Instagram, and Facebook—so small and medium businesses can grow online without hiring a marketing team.
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
                <a href="#early-access">Join Pilot Cohort</a>
              </Button>
            </div>

            {/* Commercial Traction & Development Transparency */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-4xl">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 text-xs text-foreground flex items-start gap-3">
                <Award className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-primary block font-bold mb-0.5">Pre-Validated Demand:</strong>
                  Signed early access agreements secured with <strong>5–7 commercial pilot clients</strong> committed to purchasing and deploying upon completion.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 text-xs text-muted-foreground flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground block font-bold mb-0.5">Development Transparency:</strong>
                  Interactive prototype workspace is live at portal.jeltech.net. Live Meta Marketing &amp; WhatsApp Business connectors are in active engineering.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Commercial Market Validation Showcase */}
        <section className="py-20 border-b border-border/60 bg-secondary/10">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="max-w-3xl mb-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Commercial Validation
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                  Signed Early Access
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3">
                Signed Agreements from 5–7 Pilot Clients
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Before writing backend production models, JelTech secured signed early-access adoption agreements
                with 5–7 active commercial businesses across logistics, e-commerce, custom packaging, and construction.
                These pilot partners are committed to adopting GrowthPilot AI to drive their traffic, Meta ad campaigns, and customer workflows:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pilotClients.map((client, idx) => (
                <a
                  key={idx}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all group flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                        {client.name}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-xs text-muted-foreground block mb-2 font-medium">
                      {client.sector}
                    </span>
                    <p className="text-xs text-muted-foreground/90 leading-relaxed">
                      <strong>Focus:</strong> {client.useCase}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Signed Early Adopter
                    </span>
                    <span className="text-muted-foreground underline group-hover:text-foreground">Visit Website</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Problem Statement & Why GrowthPilot Is Needed */}
        <section className="py-20 border-b border-border/60">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
                Problem Discovery
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                Three Jobs Small Businesses Were Never Built For
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2">
                Every business going online today is expected to rank on Google, run profitable ads, and reply instantly
                across WhatsApp, Instagram, and Facebook. Doing all three normally requires three separate specialists.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <h3 className="text-lg font-bold text-foreground">Opaque SEO Without Implementation</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Business owners receive complex 40-page technical audit reports but lack the coding knowledge or time
                  to write SEO-optimized articles and implement page-head tags.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <h3 className="text-lg font-bold text-foreground">Wasted Meta Ad Budgets</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Running Facebook &amp; Instagram ads without dedicated media buyers results in weak hooks, poor targeting,
                  and unmonitored campaigns that burn through ad spend without generating sales.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <h3 className="text-lg font-bold text-foreground">Scattered Customer Conversations</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Inquiries arrive fragmented across WhatsApp Business, Instagram DMs, and Facebook Messenger, forcing
                  the owner to toggle multiple apps, causing slow replies and lost revenue.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Core Growth Engine (The 3 Foundation Modules) */}
        <section className="py-20 border-b border-border/60 bg-secondary/15">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="max-w-3xl mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">
                Core Growth Engine
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">
                The Three Pillars of Automated Growth
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                GrowthPilot AI operates in two synchronized layers. The Core Growth Engine mirrors the three biggest
                growth bottlenecks: bringing search traffic, converting budget into customers, and unifying communication.
              </p>
            </div>

            <div className="space-y-8">
              {/* Module 1: SEO Intelligence Engine */}
              <div className="p-8 rounded-3xl bg-card border border-border shadow-md grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                      Module 01
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Status: Prototype Ready
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    SEO Intelligence Engine
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    A business owner submits their website URL and receives a plain-language picture of their search standing.
                    Unlike passive auditing tools, GrowthPilot writes the content and handles the technical implementation.
                  </p>
                  <ul className="space-y-2.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>SEO Audit &amp; Plain-Language Report:</strong> Scans technical health, content gaps, meta tags, and indexing issues, presenting prioritized, high-impact fixes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>AI Article Generator &amp; CMS Code Injection:</strong> Generates targeted articles to capture missing search intent. Owners can copy a ready-to-paste snippet or grant code access for automated publishing without a developer.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Keyword Research &amp; Off-Page Authority:</strong> Identifies high-converting niche search queries and guides off-page authority and backlink strategies.</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5 p-5 rounded-2xl bg-secondary/40 border border-border font-mono text-xs space-y-3">
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider font-sans font-bold flex items-center justify-between">
                    <span>Automated Action Card</span>
                    <Search className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border text-foreground space-y-2">
                    <div className="text-emerald-400 font-bold">SEO Audit Score: 81 / 100</div>
                    <div className="text-xs text-muted-foreground">Identified 2 high-volume content gaps in service radius.</div>
                    <div className="text-[11px] text-primary font-semibold">Generated 1,200-word article ready for 1-click head snippet injection.</div>
                  </div>
                  <div className="text-[10px] text-muted-foreground text-right italic font-sans">
                    Live prototype workflow at portal.jeltech.net
                  </div>
                </div>
              </div>

              {/* Module 2: Smart Ads Manager (Meta Ads) */}
              <div className="p-8 rounded-3xl bg-card border border-border shadow-md grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                      Module 02
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Clock className="w-3.5 h-3.5" />
                      Status: In Active Engineering
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    Smart Ads Manager (Meta Ads)
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Plans, launches, and continuously monitors Meta (Facebook &amp; Instagram) campaigns on the business&apos;s behalf,
                    protecting budget and maximizing sales without requiring an external media buyer.
                  </p>
                  <ul className="space-y-2.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>AI Creative Scoring:</strong> Rates images, video hooks, and copy (e.g. flagging a 3/10 hook vs. a 7/10 benchmark) with concrete advice to fix angles before spending ad budget.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Automated Campaign Setup:</strong> Selects optimized interests, age ranges, geographic radii, and objective configurations focused on conversions rather than empty clicks.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Continuous Budget Auto-Optimization:</strong> Reallocates budget to winning ad sets, auto-pauses underperformers, and duplicates successful variations to scale revenue hands-free.</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5 p-5 rounded-2xl bg-secondary/40 border border-border font-mono text-xs space-y-3">
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider font-sans font-bold flex items-center justify-between">
                    <span>Creative Hook Evaluation</span>
                    <Megaphone className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-400 font-bold">Hook Score: 8.8 / 10</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">High Resonance</span>
                    </div>
                    <div className="text-xs text-muted-foreground">&quot;Transparent Auckland moving rates with zero hidden fees — instant quote&quot;</div>
                    <div className="text-[11px] text-amber-400 font-semibold pt-1 border-t border-border/60">
                      Recommendation: Scale budget +$150 on Variation #3
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 3: Unified Leads Management (Omnichannel) */}
              <div className="p-8 rounded-3xl bg-card border border-border shadow-md grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                      Module 03
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Status: Prototype Ready
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    Unified Leads Management (Omnichannel)
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Pulls customer conversations from WhatsApp Business, Instagram DMs, Facebook Messenger, and website forms
                    into a single, consolidated portal so business owners never drop an inquiry.
                  </p>
                  <ul className="space-y-2.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Single Shared Inbox:</strong> View, categorize, and reply to all customer inquiries from one dashboard instead of constantly juggling separate apps.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Fast Response Times:</strong> Keeps inquiry response times under 15 minutes to dramatically boost booking and purchase conversion rates.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Campaign Origin Attribution:</strong> Links each conversation back to the exact SEO article or Meta ad creative that generated the initial click.</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5 p-5 rounded-2xl bg-secondary/40 border border-border font-mono text-xs space-y-3">
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider font-sans font-bold flex items-center justify-between">
                    <span>Unified Lead Influx</span>
                    <Inbox className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border space-y-2">
                    <div className="text-foreground font-bold">19 Inbound Inquiries Today</div>
                    <div className="grid grid-cols-3 gap-2 text-[10px] text-center pt-1">
                      <div className="p-1.5 rounded bg-secondary/50">WhatsApp: <strong>11</strong></div>
                      <div className="p-1.5 rounded bg-secondary/50">Instagram: <strong>5</strong></div>
                      <div className="p-1.5 rounded bg-secondary/50">Website: <strong>3</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Plug-and-Play Business Feature Modules */}
        <section className="py-20 border-b border-border/60">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">
                Extensible Platform Architecture
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">
                Plug-and-Play Business Feature Modules
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Businesses can switch on ready-made operational modules tailored to their specific model instead
                of purchasing disconnected third-party software. Because the same platform drives traffic and ads,
                all bookings, quotes, and listings feed directly into the growth engine.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Booking &amp; Appointment Engine
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  For appointment-based businesses such as barbers, salons, clinics, tattoo artists, and consultants.
                  Configure services, staff members, availability calendars, and booking durations.
                </p>
                <div className="text-xs text-primary font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Direct integration with leads inbox
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Custom Form &amp; Quote Builder
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  For institutions and service businesses requiring structured customer data—such as schools capturing
                  admissions or contractors generating estimates. Build customizable forms that embed on any portal.
                </p>
                <div className="text-xs text-primary font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Submissions flow to admin panel
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Rental &amp; Listing Management
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  For businesses renting out residential or commercial properties, hotel rooms, or vehicles.
                  List inventory, define custom rates, durations, and terms, allowing visitors to inquire or reserve directly.
                </p>
                <div className="text-xs text-primary font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Eliminates separate rental SaaS
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Developer API & Headless Integration */}
        <section className="py-20 border-b border-border/60 bg-secondary/15">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="p-8 sm:p-12 rounded-3xl bg-card border border-border shadow-xl grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Code2 className="w-3.5 h-3.5" />
                  Headless Architecture
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  Developer API &amp; Headless Website Integration
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Businesses that already have their own website do not need to abandon it. GrowthPilot AI exposes its
                  feature modules—starting with the booking system, form builder, and rental manager—through a clean set of
                  REST and GraphQL APIs.
                </p>
                <ul className="space-y-2 text-xs text-muted-foreground pt-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Keep your existing custom frontend design while delegating business logic and database storage to GrowthPilot.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Every external booking or form submission flows straight into the GrowthPilot admin dashboard and unified inbox.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Secure API gateway with tenant authentication, webhook events, and rate-limiting.</span>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-5 p-5 rounded-2xl bg-secondary/40 border border-border font-mono text-xs space-y-3">
                <div className="text-[11px] text-muted-foreground uppercase tracking-wider font-sans font-bold">
                  API Integration Snippet
                </div>
                <div className="p-3 rounded-xl bg-card border border-border text-[11px] leading-relaxed overflow-x-auto text-emerald-400">
                  <span className="text-sky-400">POST</span> /api/v1/bookings/create<br />
                  <span className="text-muted-foreground">&#123;</span><br />
                  &nbsp;&nbsp;&quot;serviceId&quot;: &quot;srv_moving_quote&quot;,<br />
                  &nbsp;&nbsp;&quot;channel&quot;: &quot;external_web&quot;,<br />
                  &nbsp;&nbsp;&quot;customerPhone&quot;: &quot;+64 21 000 000&quot;,<br />
                  &nbsp;&nbsp;&quot;sourceAd&quot;: &quot;meta_hook_v3&quot;<br />
                  <span className="text-muted-foreground">&#125;</span>
                </div>
                <div className="text-[10px] text-muted-foreground text-right italic font-sans">
                  Headless REST/GraphQL endpoints
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. System Architecture & Technology Stack */}
        <section className="py-20 border-b border-border/60">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">
                System Engineering
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">
                High-Level System Architecture &amp; Tech Stack
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Rather than deploying generic conversational chatbots that hallucinate metrics, GrowthPilot connects
                deterministic data pipelines directly with official marketing APIs and structured LLM evaluation schemas.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Globe className="w-4 h-4" />
                  Frontend &amp; Portal
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  React.js / Next.js responsive dashboard delivering intuitive SEO audits, creative hook scoring interfaces, and unified customer inbox ergonomics.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Terminal className="w-4 h-4" />
                  Backend &amp; API Layer
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Node.js and Python microservices exposing REST and GraphQL APIs for client portal actions, crawler ingestion, and headless integration.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <Cpu className="w-4 h-4" />
                  AI Reasoning Engine
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Frontier LLMs (Anthropic Claude API) governed by strict JSON schemas for SEO gap synthesis, article writing, and ad hook resonance evaluation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Network className="w-4 h-4" />
                  Marketing &amp; Messaging APIs
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Direct connectors for Meta Marketing API (ad campaign setup &amp; budget shifting) and Meta Graph / WhatsApp Business API (unified inbox).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Database className="w-4 h-4" />
                  Database &amp; Storage
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  PostgreSQL and MongoDB clusters for relational campaign metadata, user permissions, conversational history, and feature module storage.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  Security &amp; Guardrails
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Tenant data isolation, API rate-limiting, and established heuristics ensuring recommendations are grounded before execution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Product Milestones & Roadmap */}
        <section className="py-20 border-b border-border/60 bg-secondary/10">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">
                Engineering Roadmap
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                Current Progress &amp; Planned Milestones
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  phase: 'Milestone 1 · Completed',
                  title: 'UX Architecture & Interactive Prototype Workspace',
                  status: 'Live at portal.jeltech.net',
                  color: 'emerald',
                  details:
                    'Designed complete portal navigation, metric visualization components, sample business workflows, and interactive prototype ergonomics to validate usability.',
                },
                {
                  phase: 'Milestone 2 · In Active Engineering',
                  title: 'SEO Crawler & Automated CMS Snippet Injection',
                  status: 'In Active Engineering',
                  color: 'amber',
                  details:
                    'Developing server-side crawler microservices to extract DOM metadata, detect content gaps, generate SEO articles, and inject page-head snippets automatically.',
                },
                {
                  phase: 'Milestone 3 · In Active Engineering',
                  title: 'Meta Marketing API & AI Creative Hook Scoring Engine',
                  status: 'In Active Engineering',
                  color: 'amber',
                  details:
                    'Connecting Meta Marketing APIs for automated ad set creation, creative hook scoring (1-10 benchmark ratings), and continuous performance budget rebalancing.',
                },
                {
                  phase: 'Milestone 4 · Upcoming Milestone',
                  title: 'Omnichannel WhatsApp & Instagram Leads Inbox',
                  status: 'Upcoming Milestone',
                  color: 'sky',
                  details:
                    'Integrating WhatsApp Business and Instagram Direct APIs to route inquiries into a single unified shared dashboard with origin attribution.',
                },
                {
                  phase: 'Milestone 5 · Commercial Deployment',
                  title: 'Deployment with Signed Pilot Clients (5–7 Businesses)',
                  status: 'Commercial Rollout',
                  color: 'sky',
                  details:
                    'Deploying completed production build to our 5–7 signed pilot partners across e-commerce, logistics, manufacturing, and construction for full operational adoption.',
                },
              ].map((m, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                      <span className={m.color === 'emerald' ? 'text-emerald-400' : m.color === 'amber' ? 'text-amber-400' : 'text-sky-400'}>
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
                        m.color === 'emerald'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : m.color === 'amber'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
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

        {/* 8. Early Access / Inquiry Form */}
        <section id="early-access" className="py-24">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="p-8 sm:p-12 rounded-3xl bg-card border border-border shadow-2xl relative overflow-hidden">
              <div className="text-center max-w-xl mx-auto mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  Follow Development &amp; Join Pilot Cohort
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
                  Interested in GrowthPilot AI?
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  Join our growing cohort of pilot businesses. Leave your details below to receive transparent engineering updates
                  and early access onboarding as we roll out new modules.
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
