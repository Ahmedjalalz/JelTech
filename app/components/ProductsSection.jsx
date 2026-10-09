'use client';

import { motion } from "framer-motion";
import { Cpu, ExternalLink, Sparkles, CheckCircle2, Clock, Users, BarChart3, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const products = [
  {
    name: "GrowthPilot AI",
    category: "AI Marketing Intelligence · Flagship Initiative",
    statusBadge: "IN DEVELOPMENT · INTERACTIVE PROTOTYPE",
    statusVariant: "warning", // yellow/amber accent
    targetAudience: "Small businesses, local service businesses, & e-commerce brands (5–7 signed pilot clients)",
    description:
      "Our flagship AI-powered marketing platform handling SEO, Meta advertising, and customer conversations across WhatsApp, Instagram, and Facebook—with signed early-access purchase agreements from 5–7 commercial pilot businesses.",
    previewImage: "/assets/products/growthpilot_preview.svg",
    previewAlt: "GrowthPilot AI interactive prototype workspace preview",
    link: "https://portal.jeltech.net/",
    deepDiveUrl: "/products/growthpilot",
    ctaLabel: "Test Interactive Prototype",
    disclaimer: "Pre-validated demand: Signed agreements from 5–7 commercial pilot clients. Prototype live at portal.jeltech.net; Meta & WhatsApp API connectors in active engineering.",
    plannedFeatures: [
      "Module 1: SEO Intelligence with AI article generation & automated page-head code injection",
      "Module 2: Smart Ads Manager with 1-10 AI creative hook scoring & automated budget rebalancing",
      "Module 3: Unified Leads Management pulling WhatsApp Business, Instagram, & Facebook into one inbox",
      "Plug-and-play modules: Bookings/appointments, custom quote forms, & rental listings",
      "Developer API: REST & GraphQL endpoints to connect backend growth logic headlessly to existing websites",
    ],
  },
  {
    name: "People Power Hub",
    category: "HR Technology / Workforce Intelligence",
    statusBadge: "FINAL TESTING · LAUNCHING SOON",
    statusVariant: "success", // green accent
    targetAudience: "HR leaders, people operations teams & organizational managers",
    description:
      "An HR intelligence platform in its final testing phase, designed to help organizations explore workforce insights and simulate potential scenarios using AI-assisted analysis.",
    previewImage: "/assets/products/people_power_hub_shot.png",
    previewAlt: "People Power Hub live pre-launch application preview",
    link: "https://people-power-hub.vercel.app/",
    ctaLabel: "Preview the Platform",
    disclaimer: "Currently in pre-launch testing. Predictive scenario simulations are being calibrated; not yet claimed as commercially validated attrition percentages.",
    plannedFeatures: [
      "Intuitive workforce ontology & headcount priority dashboards (Implemented & In Testing)",
      "Role-based authentication & enterprise-grade security workspace (Implemented)",
      "Scenario simulation models to explore organizational shifts (Calibration Phase)",
      "Data-sync integrations with HRMS platforms & communication pipelines (Testing)",
    ],
  },
];

export const ProductsSection = () => {
  return (
    <section id="products" className="py-24 relative overflow-hidden bg-secondary/15 border-y border-border/60">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            JelTech Software Initiatives
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our In-House <span className="text-gradient-green">Software Products</span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Alongside our client engineering services, we develop our own software products designed to solve real operational,
            marketing, and workforce challenges.
          </p>
        </motion.div>

        {/* Product Cards Grid */}
        <div className="space-y-16 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-3xl bg-card border border-border/80 hover:border-primary/40 transition-all duration-300 overflow-hidden shadow-xl"
            >
              <div className="grid lg:grid-cols-12 gap-0 items-stretch">
                {/* Visual Preview Side */}
                <div className={`lg:col-span-6 p-6 sm:p-8 flex flex-col justify-center bg-secondary/30 border-b lg:border-b-0 ${
                  index % 2 === 1 ? 'lg:order-2 lg:border-l' : 'lg:border-r'
                } border-border`}>
                  <div className="rounded-xl overflow-hidden border border-border shadow-md bg-background/50 relative group">
                    <Image
                      src={product.previewImage}
                      alt={product.previewAlt}
                      width={1200}
                      height={750}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-card text-foreground border border-border text-xs font-semibold flex items-center gap-2 shadow-lg"
                      >
                        Open Preview Link <ExternalLink className="w-3.5 h-3.5 text-primary" />
                      </a>
                    </div>
                  </div>

                  {/* Status & Audience Footnote */}
                  <div className="mt-4 pt-3 border-t border-border/50 text-[11px] text-muted-foreground flex flex-col gap-1">
                    <div>
                      <span className="font-semibold text-foreground/80">Intended Audience:</span> {product.targetAudience}
                    </div>
                    <div className="text-muted-foreground/80 italic">
                      {product.disclaimer}
                    </div>
                  </div>
                </div>

                {/* Details & Features Side */}
                <div className={`lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}>
                  <div>
                    {/* Status Pill */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${
                        product.statusVariant === 'success'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      }`}>
                        <Clock className="w-3.5 h-3.5" />
                        {product.statusBadge}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        {product.category}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
                      {product.name}
                    </h3>

                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Capabilities breakdown */}
                    <div className="space-y-2 mb-8 pt-4 border-t border-border/70">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/80 mb-3">
                        Product Blueprint &amp; Feature Roadmap
                      </h4>
                      <ul className="space-y-2">
                        {product.plannedFeatures.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="hero" size="lg" className="w-full sm:w-auto gap-2 group/btn" asChild>
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${product.ctaLabel} for ${product.name}`}
                      >
                        {product.ctaLabel}
                        <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                    </Button>
                    {product.deepDiveUrl && (
                      <Button variant="heroOutline" size="lg" className="w-full sm:w-auto gap-2" asChild>
                        <Link href={product.deepDiveUrl}>
                          Deep Dive Overview
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
