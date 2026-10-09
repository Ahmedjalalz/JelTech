'use client';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProductsSection } from './components/ProductsSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactCTASection } from './components/ContactCTASection';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Featured Work Section (led by KyteLine) */}
        <ProjectsSection />

        {/* 3. Our Products Section (GrowthPilot AI & People Power Hub) */}
        <ProductsSection />

        {/* 4. Services Section */}
        <ServicesSection />

        {/* 5. Process Section */}
        <ProcessSection />

        {/* 6. Contact / Project CTA Section */}
        <ContactCTASection />
      </main>
      <Footer />
    </div>
  );
}
