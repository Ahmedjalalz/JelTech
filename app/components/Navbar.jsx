'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMotionReady } from "../hooks/useMotionReady";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/#work" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/#services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const motionReady = useMotionReady();
  const motionKey = motionReady ? "motion" : "static";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);

    if (href.includes("#") && pathname === "/") {
      const hash = href.split("#")[1];
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isLinkActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  return (
    <motion.nav
      key={`nav-${motionKey}`}
      initial={motionReady ? { y: -100 } : false}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-strong py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/assets/jt-logo-letters.png"
            alt="JelTech logo"
            width={36}
            height={36}
            className="h-8 sm:h-9 w-auto transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-foreground leading-none">
              Jel<span className="text-primary">Tech</span>
            </span>
            <span className="text-[10px] tracking-widest text-muted-foreground uppercase font-medium">
              Digital Canvas
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-sm font-medium transition-colors relative py-1 group ${
                isLinkActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-0.5 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isLinkActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Button variant="hero" size="default" asChild>
            <Link href="/start-project">Start a Project</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-foreground p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong mt-2 mx-4 rounded-xl overflow-hidden border border-border"
          >
            <div className="flex flex-col p-6 gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-base font-medium transition-colors py-2 ${
                    isLinkActive(link.href)
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-border mt-2">
                <Button variant="hero" size="lg" className="w-full" asChild>
                  <Link href="/start-project" onClick={() => setIsMobileMenuOpen(false)}>
                    Start a Project
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
