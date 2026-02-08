'use client';

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Palette, Code, TestTube, Rocket } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Discovery",
    description: "We dive deep into your goals, audience, and vision to craft the perfect strategy.",
    icon: Search,
  },
  {
    number: 2,
    title: "Design",
    description: "Wireframes and stunning UI/UX designs that bring your ideas to life.",
    icon: Palette,
  },
  {
    number: 3,
    title: "Development",
    description: "Clean, scalable code built with modern technologies and best practices.",
    icon: Code,
  },
  {
    number: 4,
    title: "Testing",
    description: "Rigorous testing across devices to ensure flawless performance.",
    icon: TestTube,
  },
  {
    number: 5,
    title: "Launch",
    description: "Deployment, optimization, and ongoing support for your success.",
    icon: Rocket,
  },
];

const ProcessStep = ({ step, index, isLast }) => {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col items-center text-center group"
    >
      {/* Connector line - desktop */}
      {!isLast && (
        <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-primary/50 to-border" />
      )}

      {/* Number circle with icon */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="relative w-16 h-16 rounded-full bg-secondary border-2 border-primary/30 flex items-center justify-center mb-4 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(69,190,67,0.3)] transition-all duration-300"
      >
        <Icon className="w-6 h-6 text-primary" />
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
          {step.number}
        </span>
      </motion.div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {step.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
        {step.description}
      </p>

      {/* Connector line - mobile */}
      {!isLast && (
        <div className="lg:hidden w-0.5 h-8 bg-gradient-to-b from-primary/50 to-border mt-4" />
      )}
    </motion.div>
  );
};

export const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Process
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A proven methodology that delivers exceptional results, every time.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.number}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
