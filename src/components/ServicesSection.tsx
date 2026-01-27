import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  Code2,
  Server,
  Gauge,
  Palette,
  LayoutDashboard,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Custom Websites",
    description:
      "Tailored websites built from the ground up to match your brand and goals perfectly.",
  },
  {
    icon: Code2,
    title: "React & Next.js",
    description:
      "Modern frontend development with React and Next.js for fast, interactive experiences.",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    description:
      "Robust server-side solutions and API integrations that power your applications.",
  },
  {
    icon: Gauge,
    title: "Performance",
    description:
      "Optimized code and infrastructure for lightning-fast load times and smooth UX.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive interfaces designed to delight users and drive conversions.",
  },
  {
    icon: LayoutDashboard,
    title: "Web Apps",
    description:
      "Full-featured web applications and dashboards built for scale and reliability.",
  },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-card border border-border hover-glow hover-lift cursor-default"
    >
      {/* Glow effect on hover */}
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

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
      </div>
    </motion.div>
  );
};

export const ServicesSection = () => {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
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
            From concept to launch, we deliver end-to-end web solutions that
            help businesses thrive in the digital age.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
