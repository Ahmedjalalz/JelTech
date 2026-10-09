'use client';

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Sparkles, PhoneCall, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Configurable project list (NGO domain is easily updatable here)
export const NGO_PROJECT_URL = "https://visionary-digital-three.vercel.app/";

export const featuredProject = {
  title: "KyteLine",
  category: "B2B Customer Experience / Interactive Website",
  description:
    "An interactive website for a B2B customer experience company, designed to turn its services into an experience visitors can explore rather than simply read about.",
  details: [
    "A hanging telephone in the hero section that swings naturally with physics.",
    "The telephone rings on hover, adding a playful and memorable tactile interaction.",
    "An interactive rotary telephone dialer that lets visitors explore services by dialing.",
    "A dynamic service presentation that responds to the selected dial position.",
    "Combines a bold, playful interaction concept with clean commercial business communication.",
  ],
  image: "/assets/projects/kyteline_hero.png",
  link: "https://www.kyteline.com/",
  badge: "Featured Showcase · Flagship Project",
};

export const standardProjects = [
  {
    title: "Paul Movers",
    category: "Moving & Transport / Business Website",
    description:
      "A professional website for an Auckland moving company, featuring service-specific content and a structured quote-request experience designed around the information customers need to provide.",
    highlights: [
      "Structured moving & clearance service catalog",
      "Tailored quote form capturing move details, dates & locations",
      "Streamlined, mobile-first customer booking journey",
    ],
    image: "/assets/projects/paulmovers_shot.png",
    link: "https://www.paulmovers.co.nz/",
  },
  {
    title: "PackifyBoxes",
    category: "Packaging / E-commerce & Lead Generation",
    description:
      "A polished website for a custom packaging business, showcasing packaging solutions and helping potential customers explore services and request tailored quotes.",
    highlights: [
      "Premium visual presentation of custom boxes and mailers",
      "Clear commercial category architecture & product options",
      "Dedicated quote-request and consultation action funnels",
    ],
    image: "/assets/projects/packifyboxes_shot.png",
    link: "https://www.packifyboxes.com/",
  },
  {
    title: "Education and Life Foundation",
    category: "NGO / Social Impact Website",
    description:
      "A digital experience for a nonprofit organization, presenting its education, healthcare, safe-water, and community-support initiatives through a structured, accessible website.",
    highlights: [
      "Mission-driven storytelling and program hierarchy",
      "High-contrast, accessible layouts across mobile & desktop",
      "Clear, transparent donation and program support pathways",
    ],
    image: "/assets/projects/elf_shot.png",
    link: NGO_PROJECT_URL,
    note: "Preview Deployment · Official Domain Coming Soon",
  },
  {
    title: "InfinityBuild",
    category: "Construction / Business Website",
    description:
      "A professional website for a construction and renovation business, built to present its services and establish a clear, credible online presence.",
    highlights: [
      "Structured presentation of construction & renovation services",
      "Bilingual-ready French market presentation & clean typography",
      "Direct estimate request flow with clear credibility cues",
    ],
    image: "/assets/projects/infinitybuild.png",
    link: "https://www.infinitybuild.fr/",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="work" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 block">
            Client Projects · Commercial Software &amp; Web Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Production Software &amp; <span className="text-gradient-green">Digital Experiences</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Engineered for external client businesses: demonstrating our execution capability, tactile interaction
            design, and reliable production standards across web apps and digital platforms.
          </p>
        </motion.div>

        {/* 1. FEATURED PROJECT SHOWCASE: KyteLine */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6 }}
            className="group rounded-3xl bg-card border-2 border-primary/30 hover:border-primary/60 transition-all duration-500 overflow-hidden shadow-2xl relative"
          >
            <div className="grid lg:grid-cols-12 gap-0 items-stretch">
              {/* Left Column: Information & Interactions */}
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-card via-card/95 to-secondary/30 relative z-10">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      {featuredProject.badge}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {featuredProject.category}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors">
                    {featuredProject.title}
                  </h3>

                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                    {featuredProject.description}
                  </p>

                  <div className="space-y-3 mb-8 pt-4 border-t border-border/70">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-primary" />
                      Distinctive Interaction Highlights
                    </h4>
                    <ul className="space-y-2.5">
                      {featuredProject.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto gap-2 group/btn" asChild>
                    <a
                      href={featuredProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit KyteLine live website"
                    >
                      Visit Live Website
                      <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right Column: Live Project Preview */}
              <div className="lg:col-span-7 relative bg-secondary/40 min-h-[360px] sm:min-h-[460px] overflow-hidden flex items-center justify-center p-4 sm:p-8">
                <div className="w-full h-full rounded-2xl overflow-hidden border border-border shadow-2xl relative group-hover:shadow-glow-sm transition-all duration-500">
                  <Image
                    src={featuredProject.image}
                    alt="KyteLine live website hero featuring interactive swinging telephone"
                    width={1280}
                    height={800}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-xs font-medium text-foreground bg-card/90 px-3 py-1.5 rounded-md border border-border flex items-center gap-1.5 backdrop-blur-sm">
                      <ExternalLink className="w-3.5 h-3.5 text-primary" />
                      kyteline.com (Live Experience)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 2. REMAINING CURATED PROJECTS GRID (4 items) */}
        <div className="grid md:grid-cols-2 gap-8">
          {standardProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-all duration-300 flex flex-col justify-between hover-lift shadow-lg"
            >
              <div>
                {/* Visual Header */}
                <div className="aspect-[16/10] relative overflow-hidden bg-muted border-b border-border">
                  <Image
                    src={project.image}
                    alt={`${project.title} website preview`}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase bg-background/85 text-primary border border-border backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                  {project.note && (
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] font-medium bg-background/90 text-muted-foreground border border-border px-2.5 py-1 rounded-md inline-block backdrop-blur-sm">
                        {project.note}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Highlights tag list */}
                  <div className="space-y-1.5 pt-4 border-t border-border/60">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/70 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0">
                <Button
                  variant="secondary"
                  className="w-full justify-between hover:bg-primary hover:text-primary-foreground group/btn transition-all"
                  asChild
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title} live website`}
                  >
                    <span>Visit Live Website</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
