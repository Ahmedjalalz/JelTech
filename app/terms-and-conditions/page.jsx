'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Scale, FileCheck, ShieldCheck, DollarSign, Clock, AlertTriangle, ChevronRight, Mail, Phone } from 'lucide-react';

export default function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'acceptance', label: '1. Acceptance of Terms' },
    { id: 'services-scope', label: '2. Scope of Services' },
    { id: 'proposals-estimates', label: '3. Proposals & SOWs' },
    { id: 'client-obligations', label: '4. Client Obligations' },
    { id: 'payment-invoicing', label: '5. Payment & Invoicing' },
    { id: 'intellectual-property', label: '6. Intellectual Property' },
    { id: 'confidentiality', label: '7. Confidentiality & NDA' },
    { id: 'warranty-disclaimers', label: '8. Warranties & Disclaimers' },
    { id: 'limitation-liability', label: '9. Limitation of Liability' },
    { id: 'termination', label: '10. Termination & Cancellation' },
    { id: 'governing-law', label: '11. Governing Law' },
    { id: 'contact', label: '12. Contact Information' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        {/* Header / Hero Section */}
        <section className="relative overflow-hidden border-b border-border/60 pb-16 pt-8">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">Terms & Conditions</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Scale className="w-3.5 h-3.5" />
              Service Agreement
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Terms & <span className="text-gradient-green">Conditions</span>
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed mb-6">
              These Terms & Conditions outline the rules, obligations, and legal agreements governing the use of JelTech&apos;s
              website, project engagements, and digital software development services.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground pt-4 border-t border-border/40">
              <div>
                <span className="font-semibold text-foreground">Last Updated:</span> September 30, 2026
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div>
                <span className="font-semibold text-foreground">Entity:</span> JelTech (JelTech Group)
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div>
                <span className="font-semibold text-foreground">Inquiries:</span> Contact@jeltech.net
              </div>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="container mx-auto px-6 max-w-5xl pt-12">
          <div className="grid lg:grid-cols-[240px_1fr] gap-12">
            {/* Sidebar Sticky Navigation */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 p-4 rounded-xl bg-card/60 border border-border">
                <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-2">
                  Table of Contents
                </h2>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-xs py-1.5 px-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary/40 transition-colors"
                    >
                      {section.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Terms Content */}
            <div className="space-y-12 text-sm sm:text-base leading-relaxed text-muted-foreground">
              {/* 1. Acceptance of Terms */}
              <div id="acceptance" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">01.</span> Acceptance of Terms
                </h2>
                <p className="mb-4">
                  By accessing, browsing, or utilizing the website{' '}
                  <a href="https://jeltech.net" className="text-primary hover:underline">jeltech.net</a>, or by retaining JelTech
                  (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) to perform digital design, engineering, or consulting services, you
                  (&quot;Client,&quot; &quot;User,&quot; or &quot;You&quot;) explicitly agree to be legally bound by these Terms & Conditions.
                </p>
                <p>
                  If you are entering into this agreement on behalf of a company, organization, or entity, you represent and warrant that you possess full legal authority to bind that entity to these Terms. If you do not agree with any part of these terms, you must not use our website or services.
                </p>
              </div>

              {/* 2. Scope of Services */}
              <div id="services-scope" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">02.</span> Scope of Services
                </h2>
                <p className="mb-4">
                  JelTech is a technology studio delivering bespoke digital solutions, including:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  <div className="p-3.5 rounded-lg bg-card/50 border border-border">
                    <span className="text-foreground font-semibold block mb-1">Web Development</span>
                    <span className="text-xs">Full-stack web apps, performant corporate sites, Jamstack, Next.js, and headless CMS integrations.</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-card/50 border border-border">
                    <span className="text-foreground font-semibold block mb-1">Mobile App Development</span>
                    <span className="text-xs">Cross-platform iOS and Android applications built with React Native and modern mobile stacks.</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-card/50 border border-border">
                    <span className="text-foreground font-semibold block mb-1">Shopify & E-Commerce</span>
                    <span className="text-xs">Custom e-commerce storefronts, Shopify theme customization, and API integration.</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-card/50 border border-border">
                    <span className="text-foreground font-semibold block mb-1">UI/UX & Product Design</span>
                    <span className="text-xs">Product prototyping, design systems, wireframes, and user experience audits.</span>
                  </div>
                </div>
                <p>
                  Individual service specifications, deliverables, schedules, and costs are established in individual Statements of Work (SOW), formal proposals, or service agreements executed between JelTech and the Client.
                </p>
              </div>

              {/* 3. Proposals, Estimates & SOWs */}
              <div id="proposals-estimates" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">03.</span> Proposals, Estimates & Change Requests
                </h2>
                <p className="mb-3">
                  All price quotes and timelines provided in discovery calls or informal communications are preliminary estimates.
                  Binding terms are solely established in an approved written Proposal or Statement of Work (SOW).
                </p>
                <div className="p-4 rounded-lg bg-secondary/30 border border-border/70 space-y-2 text-sm">
                  <p className="font-semibold text-foreground">Scope Changes & Out-of-Scope Requests:</p>
                  <p>
                    Any feature, design alteration, or third-party integration not explicitly detailed in the agreed SOW will be treated as out of scope.
                    Such requests will require written client approval through a formal Change Request and may incur additional charges and timeline revisions.
                  </p>
                </div>
              </div>

              {/* 4. Client Obligations */}
              <div id="client-obligations" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">04.</span> Client Obligations & Collaboration
                </h2>
                <p className="mb-3">To ensure timely and successful delivery of projects, the Client agrees to:</p>
                <ul className="list-disc list-inside space-y-2 text-sm ml-2">
                  <li>Provide required assets, high-resolution imagery, copy, logos, and brand guidelines in a prompt manner.</li>
                  <li>Grant necessary administrative access, API keys, credentials, or hosting permissions required to perform work.</li>
                  <li>Designate a primary contact authorized to provide approvals and technical decisions.</li>
                  <li>Review milestones, deliverables, and prototypes within agreed feedback windows (typically 5 business days). Unreasonable delays in client feedback may lead to project milestone deferrals.</li>
                </ul>
              </div>

              {/* 5. Payment & Invoicing */}
              <div id="payment-invoicing" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">05.</span> Payment Terms & Invoicing
                </h2>
                <div className="space-y-4">
                  <p>
                    Unless otherwise agreed in the SOW, standard project billing is structured across milestones (typically an upfront deposit before work commences, milestone disbursements, and a final payment prior to final code deployment or asset handover).
                  </p>
                  <div className="p-4 rounded-lg bg-card/60 border border-border text-sm">
                    <ul className="space-y-2">
                      <li>
                        <strong className="text-foreground">Deposits:</strong> Upfront deposits are required to allocate engineering and design resources and are non-refundable once work has commenced.
                      </li>
                      <li>
                        <strong className="text-foreground">Invoice Due Dates:</strong> Invoices are payable upon receipt or within 14 calendar days from the invoice date.
                      </li>
                      <li>
                        <strong className="text-foreground">Delinquent Accounts:</strong> Failure to pay overdue balances may result in a pause in development activities, suspension of staging environments, or withholding of production deployment until balances are settled.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 6. Intellectual Property */}
              <div id="intellectual-property" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">06.</span> Intellectual Property & Ownership
                </h2>
                <p className="mb-4">
                  We believe in complete transparency regarding intellectual property:
                </p>
                <div className="space-y-3 text-sm">
                  <div className="p-4 rounded-lg bg-card/50 border border-border">
                    <h3 className="font-semibold text-foreground mb-1">Deliverables & Client Ownership</h3>
                    <p>
                      Upon receipt of full and final payment for all billable work under an agreement, full ownership and copyright of bespoke source code, visual designs, and project deliverables developed specifically for the Client shall transfer to the Client.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card/50 border border-border">
                    <h3 className="font-semibold text-foreground mb-1">Pre-Existing Materials & Open Source</h3>
                    <p>
                      JelTech retains ownership of any pre-existing code libraries, developer tools, reusable boilerplate, and general software utilities. Any third-party or open-source software incorporated into the deliverables remains subject to its respective open-source license.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card/50 border border-border">
                    <h3 className="font-semibold text-foreground mb-1">Portfolio & Marketing Rights</h3>
                    <p>
                      Unless explicitly restricted under a signed Non-Disclosure Agreement (NDA), JelTech retains the right to display finished work, client brand logos, and case studies on our website, portfolio, and marketing collateral.
                    </p>
                  </div>
                </div>
              </div>

              {/* 7. Confidentiality & NDA */}
              <div id="confidentiality" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">07.</span> Confidentiality & Non-Disclosure
                </h2>
                <p className="mb-3">
                  Both JelTech and the Client agree to treat all business information, technical architecture, proprietary trade secrets, customer databases, and product strategies disclosed during the engagement as strictly confidential.
                </p>
                <p>
                  Neither party shall disclose confidential information to any third party without prior written consent, except to necessary employees, contractors, or legal advisors who are bound by similar confidentiality commitments.
                </p>
              </div>

              {/* 8. Warranties & Disclaimers */}
              <div id="warranty-disclaimers" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">08.</span> Warranties, Support & Disclaimers
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h3 className="font-semibold text-foreground mb-1">Bug-Fix Warranty Period</h3>
                    <p className="text-sm">
                      JelTech provides a standard 30-day warranty following final delivery or launch. During this period, we will resolve any bugs or defects resulting from code we produced that deviates from the approved project specifications, at no additional charge.
                    </p>
                  </div>
                  <p className="text-sm">
                    This warranty does not cover issues caused by third-party hosting failures, external API changes, unauthorized client modifications to the codebase, or browser updates released after delivery.
                  </p>
                  <p className="text-sm">
                    Except as expressly set forth herein, all services and website contents are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis, without warranties of any kind, whether express or implied.
                  </p>
                </div>
              </div>

              {/* 9. Limitation of Liability */}
              <div id="limitation-liability" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">09.</span> Limitation of Liability
                </h2>
                <p className="mb-4">
                  To the fullest extent permitted by applicable law, in no event shall JelTech, its founders, directors, employees, or contractors be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data loss, business interruption, or goodwill.
                </p>
                <p>
                  JelTech&apos;s total aggregate liability arising out of or related to any project engagement, whether in contract, tort, or otherwise, shall not exceed the total amount paid by the Client to JelTech for the specific service giving rise to liability during the three (3) months preceding the incident.
                </p>
              </div>

              {/* 10. Termination & Cancellation */}
              <div id="termination" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">10.</span> Termination & Cancellation
                </h2>
                <p className="mb-3">
                  Either party may terminate an active project engagement with written notice if the other party materially breaches any term and fails to remedy the breach within 14 calendar days of receiving notice.
                </p>
                <p>
                  Upon cancellation, the Client shall pay JelTech for all work completed, hours logged, and non-cancelable expenses incurred up to the effective termination date.
                </p>
              </div>

              {/* 11. Governing Law */}
              <div id="governing-law" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">11.</span> Governing Law & Dispute Resolution
                </h2>
                <p className="mb-3">
                  These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
                </p>
                <p>
                  The parties agree to attempt in good faith to resolve any dispute or controversy arising out of these Terms through amicable negotiations before initiating formal legal proceedings.
                </p>
              </div>

              {/* 12. Contact Information */}
              <div id="contact" className="scroll-mt-32 pt-4">
                <div className="p-6 rounded-2xl bg-card/70 border border-border">
                  <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    12. Contact & Legal Inquiries
                  </h2>
                  <p className="text-sm mb-4">
                    For any questions, legal inquiries, or contract discussions concerning these Terms & Conditions, please reach out to our team:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 rounded-xl bg-secondary/40 border border-border/60">
                      <div className="text-xs text-muted-foreground uppercase font-semibold mb-1">Email</div>
                      <a href="mailto:Contact@jeltech.net" className="text-foreground hover:text-primary font-medium transition-colors">
                        Contact@jeltech.net
                      </a>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/40 border border-border/60">
                      <div className="text-xs text-muted-foreground uppercase font-semibold mb-1">Phone / Direct</div>
                      <a href="tel:+923143394966" className="text-foreground hover:text-primary font-medium transition-colors">
                        +92 314 3394966
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
