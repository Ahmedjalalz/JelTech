'use client';

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useMotionReady } from "../hooks/useMotionReady";
import {
  Globe,
  Server,
  Palette,
  Smartphone,
  ShoppingBag,
  Search,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Custom Websites & Redesigns",
    description:
      "Tailored websites built from scratch or redesigned to modern standards - fast, responsive, and aligned perfectly with your brand and goals.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps (iOS and Android)",
    description:
      "High-performance native and cross-platform mobile apps designed to deliver seamless user experiences across iOS and Android devices.",
  },
  {
    icon: ShoppingBag,
    title: "Shopify E-commerce Stores",
    description:
      "Shopify stores with optimized themes, smooth checkout flows, and scalable e-commerce functionality.",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    description:
      "Secure, scalable backend systems and API integrations that power your applications reliably behind the scenes.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Data-driven SEO strategies that improve visibility, boost rankings, and bring consistent organic traffic to your business.",
  },
  {
    icon: Palette,
    title: "Professional UI/UX Design",
    description:
      "Clean, intuitive interface designs crafted to enhance user experience, build trust, and drive meaningful engagement.",
  },
];

const ServiceCard = ({ service, index, motionReady }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={motionReady ? { opacity: 0, y: 40 } : false}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-card border border-border hover-glow hover-lift cursor-default"
    >
      <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
          <service.icon className="w-6 h-6 text-primary" />
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2">
          {service.title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed">
          {service.description}
        </p>
      </div>

      <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
      </div>
    </motion.div>
  );
};

export const ServicesSection = () => {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });
  const motionReady = useMotionReady();
  const motionKey = motionReady ? "motion" : "static";

  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={headerRef}
          key={`services-header-${motionKey}`}
          initial={motionReady ? { opacity: 0, y: 30 } : false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Services Built for Success
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From concept to launch, we deliver end-to-end web & mobile solutions that
            help businesses thrive in the digital age.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={`${motionKey}-${service.title}`}
              service={service}
              index={index}
              motionReady={motionReady}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
