'use client';

import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { AboutSection } from '@/components/AboutSection';
import { WhyChooseUsSection } from '@/components/WhyChooseUsSection';
import { TeamSection } from '@/components/TeamSection';
import { TechStackSection } from '@/components/TechStackSection';
import { Footer } from '@/components/Footer';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <AboutSection />
        <WhyChooseUsSection />
        <TeamSection />
        <TechStackSection />
      </main>
      <Footer />
    </div>
  );
}
