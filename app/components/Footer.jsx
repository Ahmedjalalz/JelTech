'use client';

import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter, Linkedin, Mail, Phone } from "lucide-react";

const footerLinks = {
  services: [
    { name: "Custom Websites", href: "/#services", isHash: true },
    { name: "Interactive Web Experiences", href: "/#services", isHash: true },
    { name: "Web Applications", href: "/#services", isHash: true },
    { name: "E-Commerce & Shopify", href: "/#services", isHash: true },
    { name: "UI/UX & Design Systems", href: "/#services", isHash: true },
    { name: "AI Integration & Software", href: "/#services", isHash: true },
  ],
  company: [
    { name: "About", href: "/about", isHash: false },
    { name: "Client Work", href: "/#work", isHash: true },
    { name: "Products Overview", href: "/products", isHash: false },
    { name: "GrowthPilot AI", href: "/products/growthpilot", isHash: false },
    { name: "Contact", href: "/contact", isHash: false },
    { name: "Start a Project", href: "/start-project", isHash: false },
  ],
};

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/jeltech.official", icon: Instagram },
  { name: "Twitter", href: "https://x.com/jeltechofficial", icon: Twitter },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/jeltech-group", icon: Linkedin },
];

export const Footer = () => {
  const handleHashClick = (href) => {
    if (window.location.pathname === "/") {
      const hash = href.split("#")[1];
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="border-t border-border py-16 relative bg-card/20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/assets/jt-logo-letters.png"
                alt="JelTech logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground leading-none">
                  Jel<span className="text-primary">Tech</span>
                </span>
                <span className="text-[10px] tracking-widest text-muted-foreground uppercase font-medium">
                  Digital Canvas
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              We build distinctive digital experiences for businesses and develop intelligent software designed to solve real-world problems.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                  aria-label={link.name}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => link.isHash && handleHashClick(link.href)}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company &amp; Products</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => link.isHash && handleHashClick(link.href)}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:Contact@jeltech.net"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  Contact@jeltech.net
                </a>
              </li>
              <li>
                <a
                  href="tel:+923143394966"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  +92 314 3394966
                </a>
              </li>
            </ul>
            {/* Social Icons repeated for mobile */}
            <div className="flex items-center gap-3 mt-4 lg:hidden">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                  aria-label={link.name}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} JelTech. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="text-border select-none" aria-hidden="true">•</span>
            <Link
              href="/terms-and-conditions"
              className="hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
