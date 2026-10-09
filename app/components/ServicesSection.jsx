'use client';

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useMotionReady } from "../hooks/useMotionReady";
import {
  Globe,
  MousePointerClick,
  Code2,
  ShoppingBag,
  Server,
  Palette,
  Search,
  Cpu,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Custom Websites & Redesigns",
    description:
      "Modern, responsive websites built to present your brand clearly, load fast, and convert visitors across all screen sizes.",
  },
  {
    icon: MousePointerClick,
    title: "Interactive Web Experiences",
    description:
      "Creative front-end interactions and dynamic features that make your digital presence memorable and engaging for users.",
  },
  {
    icon: Code2,
    title: "Web Application Development",
    description:
      "Full-stack web applications, business dashboards, and customer portals built with maintainable, modern Next.js and React architecture.",
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce & Shopify",
    description:
      "Tailored Shopify storefronts, theme customizations, and checkout optimizations designed around clean product discovery.",
  },
  {
    icon: Server,
    title: "Backend & API Integrations",
    description:
      "Reliable backend services, secure authentication, database schemas, and third-party API integrations that connect your tools.",
  },
  {
    icon: Palette,
    title: "UI/UX & Design Systems",
    description:
      "User-centered interface design, wireframes, and design consistency that turn complex workflows into intuitive user journeys.",
  },
  {
    icon: Search,
    title: "SEO & Website Performance",
    description:
      "Technical SEO foundations, structured metadata, clean page hierarchies, and speed optimizations to improve search visibility.",
  },
  {
    icon: Cpu,
    title: "AI Integration & Custom Software",
    description:
      "Pragmatic AI API integrations, workflow automation, and custom software utilities built to solve specific operational bottlenecks.",
  },
];

const ServiceCard = ({ service, index, motionReady }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={motionReady ? { opacity: 0, y: 30 } : false}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative p-6 sm:p-7 rounded-2xl bg-card border border-border hover:border-primary/40 hover-glow transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
          <service.icon className="w-6 h-6 text-primary" />
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2.5 group-hover:text-primary transition-colors">
          {service.title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed">
          {service.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-border/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs text-primary font-medium flex items-center gap-1">
          Learn how we help &rarr;
        </span>
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
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          key={`services-header-${motionKey}`}
          initial={motionReady ? { opacity: 0, y: 30 } : false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 block">
            What We Deliver
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Services Focused on <span className="text-gradient-green">Real Needs</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            From custom marketing websites to interactive product experiences and internal software utilities,
            we engineer solutions built for speed, usability, and long-term maintainability.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
