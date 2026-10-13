'use client';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProcessSection } from './components/ProcessSection';
import { ServicesSection } from './components/ServicesSection';
import { GrowthPilotSection } from './components/GrowthPilotSection';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ProcessSection />
        <ServicesSection />
        <GrowthPilotSection />
      </main>
      <Footer />
    </div>
  );
}
