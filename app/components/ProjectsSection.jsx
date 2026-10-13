'use client';

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, PhoneCall, Compass, ExternalLink } from "lucide-react";
import { useMotionReady } from "../hooks/useMotionReady";

const flagshipProject = {
  title: "KyteLine",
  tagline: "Outsourced Call Center & CX Platform",
  category: "Featured Flagship · Tactile Web Experience",
  description:
    "An interactive B2B platform engineered around deep psychological memory hooks. Features a signature swinging telephone receiver and a tactile rotary dial switchboard that users physically turn to explore channels. While competitors blend together into generic templates, KyteLine creates an unforgettable emotional anchor that visitors remember long after leaving.",
  image: "/assets/projects/kyteline.png",
  link: "http://kyteline.com/",
  hooks: [
    {
      title: "The Hanging Telephone Hook",
      description: "A signature visual anchor that sticks in the user's mind instantly among 100 competitor sites.",
    },
    {
      title: "Interactive Rotary Switchboard",
      description: "Tactile dial-in interaction that creates a physical sense of connection with the website.",
    },
    {
      title: "Frictionless B2B Funnels",
      description: "Direct-to-action quote flows designed for high SLA enterprise conversions.",
    },
  ],
  tags: ["Bespoke Animations", "Tactile Micro-Interactions", "High Dwell Time", "Conversion Engine"],
};

const otherProjects = [
  {
    title: "PackifyBoxes",
    category: "Custom E-Commerce & Packaging",
    description:
      "A premium custom packaging platform engineered for ambitious brands. Showcases luxury rigid, cosmetic, food, and retail shipping solutions with instant quote requests and tactile catalog browsing.",
    image: "/assets/projects/packifyboxes.png",
    link: "https://www.packifyboxes.com/",
    tags: ["Custom Packaging", "Interactive Catalog", "Fast Quotation Flow"],
  },
  {
    title: "Infinity Build Agency",
    category: "Agency Website & Brand Architecture",
    description:
      "A modern agency platform showcasing web engineering and digital experiences with bold European aesthetic, refined typography, and high-performance server architecture.",
    image: "/assets/projects/infinitybuild.png",
    link: "https://www.infinitybuild.fr/",
    tags: ["Agency Platform", "Modern Architecture", "High Performance"],
  },
  {
    title: "Education And Life Foundation",
    category: "Global Non-Profit & Humanitarian Portal",
    description:
      "A purpose-driven portal bringing sharp visibility to education, community empowerment, and grassroots humanitarian relief initiatives worldwide.",
    image: "/assets/projects/educationandlife.png",
    link: "https://educationandlifefoundation.org/",
    tags: ["Non-Profit Portal", "Visual Storytelling", "Community Impact"],
  },
  {
    title: "Paul Movers Auckland",
    category: "Logistics & Moving Platform",
    description:
      "Auckland's premier residential and commercial moving platform. Engineered with intuitive quote calculators, clear moving checklists, and high-conversion booking journeys.",
    image: "/assets/projects/paulmovers.png",
    link: "https://www.paulmovers.co.nz",
    tags: ["Logistics Funnel", "Instant Estimations", "Auckland, New Zealand"],
  },
  {
    title: "Aspire Removals & Transport",
    category: "UK Relocation & Transport Platform",
    description:
      "Full-scale UK residential and commercial relocation platform featuring an interactive multi-step quote builder, fleet showcases, and trust-first customer onboarding.",
    image: "/assets/projects/aspireremovals.png",
    link: "https://aspireremovalsandtransport.co.uk/",
    tags: ["UK Removals", "Multi-Step Quote Builder", "High-Trust UX"],
  },
];

const FlagshipCard = ({ project, motionReady }) => {
  return (
    <motion.div
      initial={motionReady ? { opacity: 0, y: 35 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative rounded-3xl overflow-hidden bg-card border-2 border-primary/30 shadow-2xl hover:border-primary/60 transition-all duration-500 mb-12 group"
    >
      {/* Background glow */}
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10 relative z-10">
        {/* Left: Project Image & Preview */}
        <div className="lg:col-span-7">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative rounded-2xl overflow-hidden border border-border group/image bg-muted aspect-[16/10]"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/image:scale-105"
            />
            <div className="absolute inset-0 bg-background/80 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg">
                Explore KyteLine Live
                <ExternalLink className="w-4 h-4" />
              </span>
            </div>
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-background/90 text-primary border border-primary/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                Creator&apos;s Favorite & Best
              </span>
            </div>
          </a>
        </div>

        {/* Right: Hook Breakdown & Story */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                {project.category}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
              {project.title}
              <ArrowUpRight className="w-6 h-6 text-primary shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </h3>
            <p className="text-sm font-medium text-primary/80 mb-4">{project.tagline}</p>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Hook Highlights */}
            <div className="space-y-3 mb-6 bg-secondary/50 p-4 rounded-xl border border-border/80">
              <div className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5" />
                The Hook Strategy in Action
              </div>
              {project.hooks.map((h, i) => (
                <div key={i} className="text-xs leading-relaxed">
                  <span className="font-semibold text-foreground">{h.title}:</span>{" "}
                  <span className="text-muted-foreground">{h.description}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-md group/btn"
          >
            Visit kyteline.com Live
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index, motionReady }) => {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={motionReady ? { opacity: 0, y: 30 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/40 hover-glow cursor-pointer block flex flex-col justify-between"
    >
      <div>
        {/* Project image area */}
        <div className="aspect-[16/10] relative overflow-hidden bg-muted">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex items-center gap-2 text-primary font-medium">
              Visit Live Site
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              {project.category}
            </span>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
        </div>
      </div>

      {/* Tags footer */}
      <div className="px-6 pb-6 pt-0">
        <div className="flex flex-wrap gap-1.5 border-t border-border pt-4">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-0.5 rounded bg-secondary/80 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

export const ProjectsSection = () => {
  const motionReady = useMotionReady();

  return (
    <section id="work" className="py-20 sm:py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={motionReady ? { opacity: 0, y: 25 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Proven Client Projects
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Websites Built to Hook & Convert
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We don&apos;t build generic templates. We craft unforgettable digital experiences
            with signature interaction hooks that plant your brand deep in your customer&apos;s memory.
          </p>
        </motion.div>

        {/* Flagship Feature Card: KyteLine */}
        <FlagshipCard project={flagshipProject} motionReady={motionReady} />

        {/* 5 Real Client Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              motionReady={motionReady}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
