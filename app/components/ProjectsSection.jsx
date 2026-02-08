'use client';

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Battlex Online Store",
    category: "E-commerce Platform",
    description: "A full-featured online store with seamless checkout experience and modern design.",
    image: "/assets/projects/battlex.png",
    link: "https://battlex.store/",
  },
  {
    title: "Glammzi Online Store",
    category: "E-commerce Store",
    description: "A stylish e-commerce store delivering beauty and lifestyle products with elegance.",
    image: "/assets/projects/glammzi.png",
    link: "https://glammzi.com/",
  },
  {
    title: "RentNGo Car Rentals",
    category: "Car Rental Platform",
    description: "A sleek car rental platform with easy booking, vehicle browsing, and a smooth user experience.",
    image: "/assets/projects/rentngo.png",
    link: "https://rentngofrontend.netlify.app/",
  },
  {
    title: "Infinity Build Agency",
    category: "Agency Website",
    description: "A modern agency website showcasing web development services with a bold, professional look.",
    image: "/assets/projects/infinitybuild.png",
    link: "https://www.infinitybuild.fr/",
  },
];

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border hover-glow cursor-pointer block"
    >
      {/* Project image area */}
      <div className="aspect-[4/3] relative overflow-hidden bg-muted">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex items-center gap-2 text-primary font-medium">
            Visit Project
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
        <p className="text-muted-foreground text-sm">{project.description}</p>
      </div>
    </motion.a>
  );
};

export const ProjectsSection = () => {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="work" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A selection of our recent work that showcases our expertise in
            building modern web experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
