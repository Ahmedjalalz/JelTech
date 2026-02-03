import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Custom SVG icons for technologies
const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const technologies = [
  { name: "JavaScript", icon: <span className="text-yellow-400 font-bold text-sm">JS</span> },
  { name: "TypeScript", icon: <span className="text-blue-400 font-bold text-sm">TS</span> },
  { name: "React", icon: <span className="text-cyan-400">⚛️</span> },
  { name: "Next.js", icon: <span className="text-foreground">▲</span> },
  { name: "Tailwind CSS", icon: <span className="text-cyan-400"><TailwindIcon /></span> },
  { name: "Node.js", icon: <span className="text-green-500">🟢</span> },
  { name: "Express.js", icon: <span className="text-muted-foreground font-bold text-sm">Ex</span> },
  { name: "Nest.js", icon: <span className="text-red-500">🐱</span> },
  { name: "MongoDB", icon: <span className="text-green-500">🍃</span> },
  { name: "PostgreSQL", icon: <span className="text-blue-400">🐘</span> },
  { name: "Prisma", icon: <span className="text-foreground">◆</span> },
  { name: "PWA", icon: <span className="text-purple-400">📱</span> },
  { name: "SEO", icon: <span className="text-primary">📈</span> },
  { name: "Socket.io", icon: <span className="text-yellow-400">⚡</span> },
  { name: "Vercel", icon: <span className="text-foreground">▲</span> },
  { name: "GitHub", icon: <span className="text-foreground"><GitHubIcon /></span> },
];

const TechBadge = ({
  tech,
  index,
}: {
  tech: (typeof technologies)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.05 }}
      className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 hover:bg-secondary transition-all duration-300 cursor-default"
    >
      <span className="text-xl flex items-center justify-center w-6 h-6">{tech.icon}</span>
      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
        {tech.name}
      </span>
    </motion.div>
  );
};

export const TechStackSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
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
            Our Stack
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Powered by Modern Tech
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We use cutting-edge technologies to build fast, scalable, and
            maintainable applications.
          </p>
        </motion.div>

        {/* Tech grid */}
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {technologies.map((tech, index) => (
            <TechBadge key={tech.name} tech={tech} index={index} />
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground text-sm">
            ...and many more tools tailored to your project needs
          </p>
        </motion.div>
      </div>
    </section>
  );
};
