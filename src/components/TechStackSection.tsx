import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Node.js", icon: "🟢" },
  { name: "MongoDB", icon: "🍃" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Tailwind", icon: "🎨" },
  { name: "Prisma", icon: "◆" },
  { name: "GraphQL", icon: "◈" },
  { name: "Vercel", icon: "▲" },
  { name: "AWS", icon: "☁️" },
  { name: "Docker", icon: "🐳" },
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
      <span className="text-xl">{tech.icon}</span>
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
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
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
