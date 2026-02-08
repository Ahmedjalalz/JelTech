'use client';

import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { ContactSection } from '@/components/ContactSection';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
