'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Shield, Lock, Eye, FileText, Server, RefreshCw, Mail, Phone, ChevronRight } from 'lucide-react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'introduction', label: '1. Introduction' },
    { id: 'information-we-collect', label: '2. Information We Collect' },
    { id: 'how-we-use-information', label: '3. How We Use Information' },
    { id: 'sharing-and-disclosure', label: '4. Sharing & Disclosure' },
    { id: 'data-security', label: '5. Data Security & Storage' },
    { id: 'cookies-tracking', label: '6. Cookies & Tracking' },
    { id: 'your-rights', label: '7. Your Rights & Choices' },
    { id: 'third-party-links', label: '8. Third-Party Services' },
    { id: 'children-privacy', label: '9. Children’s Privacy' },
    { id: 'updates', label: '10. Policy Updates' },
    { id: 'contact', label: '11. Contact Us' },
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
              <span className="text-foreground">Privacy Policy</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Shield className="w-3.5 h-3.5" />
              Legal & Privacy
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Privacy <span className="text-gradient-green">Policy</span>
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed mb-6">
              At JelTech, protecting your privacy and safeguarding your personal and business data is our top priority.
              This Privacy Policy explains what information we collect, how we handle it, and the rights you have regarding your data.
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
                <span className="font-semibold text-foreground">Contact:</span> Contact@jeltech.net
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

            {/* Main Policy Content */}
            <div className="space-y-12 text-sm sm:text-base leading-relaxed text-muted-foreground">
              {/* 1. Introduction */}
              <div id="introduction" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">01.</span> Introduction
                </h2>
                <p className="mb-4">
                  Welcome to JelTech (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We build modern, high-performance web applications,
                  mobile solutions, bespoke software, and digital experiences. This Privacy Policy governs your use of our website
                  (<a href="https://jeltech.net" className="text-primary hover:underline">jeltech.net</a>) and any engagement with our digital services.
                </p>
                <p>
                  By accessing our website, communicating with our team, or submitting project information via our forms,
                  you acknowledge that you have read, understood, and agree to the practices outlined in this policy.
                </p>
              </div>

              {/* 2. Information We Collect */}
              <div id="information-we-collect" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">02.</span> Information We Collect
                </h2>
                <p className="mb-4">
                  We collect information that helps us communicate with you, evaluate your project needs, and deliver exceptional digital solutions.
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card/50 border border-border">
                    <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      A. Information You Provide Voluntarily
                    </h3>
                    <p className="text-sm">
                      When you fill out our &quot;Start a Project&quot; form, use our contact form, or write to our team directly,
                      we may collect your name, business email address, company name, phone number, project requirements, budget range, and timeline expectations.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-card/50 border border-border">
                    <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                      <Server className="w-4 h-4 text-primary" />
                      B. Technical & Usage Data
                    </h3>
                    <p className="text-sm">
                      When you navigate our website, our servers automatically record standard technical data such as your IP address,
                      browser type and version, operating system, referring URL, pages viewed, time spent per page, and basic interaction events.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-card/50 border border-border">
                    <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-primary" />
                      C. Project & Confidential Materials
                    </h3>
                    <p className="text-sm">
                      When engaged in a client project, you may share API credentials, wireframes, brand assets, or design specifications.
                      Such data is strictly protected under Non-Disclosure Agreements (NDAs) and project contracts.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. How We Use Information */}
              <div id="how-we-use-information" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">03.</span> How We Use Your Information
                </h2>
                <p className="mb-3">We use the information we collect strictly for legitimate business purposes:</p>
                <ul className="list-disc list-inside space-y-2 text-sm ml-2">
                  <li>To review project inquiries and prepare tailored proposals, scopes of work, and estimates.</li>
                  <li>To provide, execute, test, and maintain client development and design services.</li>
                  <li>To communicate project milestones, updates, invoices, and technical documentation.</li>
                  <li>To enhance website responsiveness, security, user experience, and overall performance.</li>
                  <li>To detect and prevent fraudulent, malicious, or abusive activities across our digital properties.</li>
                  <li>To comply with statutory, legal, and regulatory obligations.</li>
                </ul>
              </div>

              {/* 4. Sharing & Disclosure */}
              <div id="sharing-and-disclosure" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">04.</span> Sharing & Disclosure of Information
                </h2>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 mb-4">
                  <p className="text-foreground text-sm font-medium">
                    We do not sell, rent, lease, or monetize your personal or company information to third-party data brokers or advertisers under any circumstances.
                  </p>
                </div>
                <p className="mb-3">We only share information under the following limited circumstances:</p>
                <ul className="list-disc list-inside space-y-2 text-sm ml-2">
                  <li>
                    <strong className="text-foreground">Service Providers:</strong> Trusted third-party vendors who assist with our hosting,
                    email dispatch (e.g. Resend), version control, or analytics, bound by strict confidentiality obligations.
                  </li>
                  <li>
                    <strong className="text-foreground">Legal Requirements:</strong> When mandated by applicable law, court order,
                    or governmental regulation to protect our rights, client safety, or public welfare.
                  </li>
                  <li>
                    <strong className="text-foreground">With Your Consent:</strong> When you give explicit written permission, such as publishing a case study, testimonial, or logo on our portfolio.
                  </li>
                </ul>
              </div>

              {/* 5. Data Security */}
              <div id="data-security" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">05.</span> Data Security & Storage
                </h2>
                <p className="mb-4">
                  We employ rigorous administrative, physical, and technical safeguards designed to protect personal and client information from unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p className="mb-4">
                  These measures include TLS/SSL encrypted transmission, strict role-based access control, secure credential vaults, and continuous monitoring.
                  However, please note that no internet transmission or electronic storage is 100% immune from security risks; we encourage clients to use secure channels when transmitting sensitive API secrets or keys.
                </p>
                <p>
                  We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy, manage our client relationships, and fulfill legal requirements.
                </p>
              </div>

              {/* 6. Cookies & Tracking */}
              <div id="cookies-tracking" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">06.</span> Cookies & Tracking Technologies
                </h2>
                <p className="mb-3">
                  Our website may use cookies and similar browser storage mechanisms to enhance user experience, remember theme preferences, and analyze aggregated traffic.
                </p>
                <p>
                  You can set your browser to refuse cookies or alert you when cookies are being sent. Note that certain features of the site may not function properly if cookies are disabled.
                </p>
              </div>

              {/* 7. Your Rights */}
              <div id="your-rights" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">07.</span> Your Rights & Choices
                </h2>
                <p className="mb-3">Depending on your geographic location, you may have rights regarding your personal information, including:</p>
                <ul className="list-disc list-inside space-y-2 text-sm ml-2 mb-4">
                  <li><strong className="text-foreground">Access:</strong> Request confirmation of whether we process your data and receive a copy.</li>
                  <li><strong className="text-foreground">Correction:</strong> Request rectification of inaccurate or incomplete personal information.</li>
                  <li><strong className="text-foreground">Deletion:</strong> Request erasure of personal data that is no longer required.</li>
                  <li><strong className="text-foreground">Restriction / Objection:</strong> Object to processing or request restriction under specific circumstances.</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact our privacy desk at{' '}
                  <a href="mailto:Contact@jeltech.net" className="text-primary hover:underline">
                    Contact@jeltech.net
                  </a>.
                </p>
              </div>

              {/* 8. Third-Party Services */}
              <div id="third-party-links" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">08.</span> Third-Party Services & External Links
                </h2>
                <p>
                  Our site may contain links to external websites, social platforms (e.g. LinkedIn, X/Twitter, Instagram), or third-party documentation.
                  JelTech is not responsible for the privacy practices or content of these external entities. We encourage you to review the privacy policies of any third-party websites you visit.
                </p>
              </div>

              {/* 9. Children's Privacy */}
              <div id="children-privacy" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">09.</span> Children’s Privacy
                </h2>
                <p>
                  Our website and software services are exclusively intended for commercial and business audiences.
                  We do not knowingly collect personal identifiable information from individuals under the age of 16. If we discover that a minor has provided us with personal information, we promptly delete it from our servers.
                </p>
              </div>

              {/* 10. Updates */}
              <div id="updates" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-lg">10.</span> Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect operational, technological, or legal adjustments.
                  Any changes will be posted on this page with an updated &quot;Last Updated&quot; date. We advise reviewing this page periodically for any modifications.
                </p>
              </div>

              {/* 11. Contact */}
              <div id="contact" className="scroll-mt-32 pt-4">
                <div className="p-6 rounded-2xl bg-card/70 border border-border">
                  <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    11. Contact Us
                  </h2>
                  <p className="text-sm mb-4">
                    If you have questions, feedback, or concerns regarding this Privacy Policy or our data management protocols, please reach out to us:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 rounded-xl bg-secondary/40 border border-border/60">
                      <div className="text-xs text-muted-foreground uppercase font-semibold mb-1">Email</div>
                      <a href="mailto:Contact@jeltech.net" className="text-foreground hover:text-primary font-medium transition-colors">
                        Contact@jeltech.net
                      </a>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/40 border border-border/60">
                      <div className="text-xs text-muted-foreground uppercase font-semibold mb-1">Phone / WhatsApp</div>
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
