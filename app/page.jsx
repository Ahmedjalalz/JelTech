'use client';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GrowthPilotShowcase } from './components/GrowthPilotShowcase';
import { ProjectsSection } from './components/ProjectsSection';
import { ProductsSection } from './components/ProductsSection';
import { ProductJourneySection } from './components/ProductJourneySection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactCTASection } from './components/ContactCTASection';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* 1. Hero Section: Company Positioning & Value Pillars */}
        <HeroSection />

        {/* 2. Flagship AI Product Spotlight: GrowthPilot AI */}
        <GrowthPilotShowcase />

        {/* 3. Featured Client Work: Engineering Track Record (led by KyteLine) */}
        <ProjectsSection />

        {/* 4. Our In-House Products: GrowthPilot AI & People Power Hub */}
        <ProductsSection />

        {/* 5. Product Development Journey & Credible AI Architecture */}
        <ProductJourneySection />

        {/* 6. Commercial Client Services */}
        <ServicesSection />

        {/* 7. Development Process */}
        <ProcessSection />

        {/* 8. Contact / Early Access CTA */}
        <ContactCTASection />
      </main>
      <Footer />
    </div>
  );
}
