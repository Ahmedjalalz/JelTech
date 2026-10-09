'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { ProductsSection } from '@/components/ProductsSection';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Cpu, ArrowRight, Sparkles } from 'lucide-react';

export default function ProductsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Intro Banner */}
        <section className="relative overflow-hidden pt-12 pb-8 border-b border-border/60">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Cpu className="w-3.5 h-3.5" />
              Software &amp; AI Products
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Intelligent Software for <span className="text-gradient-green">Real-World Workflows</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
              In addition to crafting high-performance digital experiences for clients, JelTech engineers
              specialized software products addressing business operations, marketing workflows, and workforce intelligence.
            </p>
          </div>
        </section>

        {/* Core Products Section */}
        <ProductsSection />

        {/* CTA Banner */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <div className="p-8 sm:p-12 rounded-3xl bg-card border border-border shadow-xl relative">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-primary mb-3">
                <Sparkles className="w-4 h-4" />
                Collaborate With JelTech
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Have a software challenge or product idea?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl mx-auto">
                Whether you need a bespoke web application, interactive client experience, or custom AI integration,
                let&apos;s build something practical and high-performing together.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link href="/start-project" className="gap-2">
                    Start a Project
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/#work">
                    Explore Client Work
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
