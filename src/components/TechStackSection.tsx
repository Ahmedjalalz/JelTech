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

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#339933">
    <path d="M11.998 24c-.321 0-.641-.084-.922-.247L8.14 22.016c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.066-.037.152-.023.22.017l2.255 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.193-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.085.049-.139.143-.139.242v10.15c0 .097.054.189.137.236l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.509 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.943-.922-1.604V6.921c0-.659.352-1.273.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.33.922.944.922 1.603v10.15c0 .659-.352 1.273-.922 1.604l-8.794 5.078c-.28.163-.6.247-.925.247zm2.722-6.989c-3.859 0-4.667-1.773-4.667-3.263 0-.142.114-.253.256-.253h1.136c.127 0 .233.092.253.216.173 1.168.687 1.759 3.022 1.759 1.858 0 2.649-.42 2.649-1.404 0-.567-.224-.988-3.115-1.271-2.415-.238-3.909-.771-3.909-2.702 0-1.78 1.499-2.84 4.013-2.84 2.823 0 4.218.98 4.394 3.082.006.075-.021.148-.073.204-.051.054-.122.085-.197.085h-1.142c-.12 0-.226-.083-.251-.199-.279-1.238-.956-1.634-2.731-1.634-2.011 0-2.245.701-2.245 1.226 0 .637.276.822 3.018 1.181 2.715.355 4.005.859 4.005 2.779 0 1.921-1.601 3.022-4.395 3.022l-.021.012z"/>
  </svg>
);

const NextIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 0-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595-.054.104-.093.146-.177.193-.066.037-.124.044-.432.044H9.2l-.16-.093a.396.396 0 0 1-.14-.15l-.054-.104.006-4.703.007-4.705.073-.091c.041-.043.117-.1.169-.127.091-.041.127-.048.482-.048.42 0 .494.02.61.14.028.027 1.336 1.999 2.907 4.38l4.735 7.17 1.912 2.892.096-.063a12.317 12.317 0 0 0 2.465-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/>
  </svg>
);

const SocketIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M11.936 0A12.004 12.004 0 0 0 0 12.002a12.004 12.004 0 0 0 11.936 11.998A12.003 12.003 0 0 0 24 12.002 12.003 12.003 0 0 0 11.936 0zm4.675 17.467H8.094l5.1-7.084h-4.58l-.122.004-.06.011-.059.02-.053.028-.045.034-.043.042-.033.046-.027.052-.02.058-.011.064-.004.066v.172l.004.064.011.064.02.058.027.052.033.046.043.042.045.034.053.028.059.02.06.011.122.004h8.517l-5.1 7.084h4.58l.121-.004.06-.011.059-.02.053-.028.045-.034.043-.042.033-.046.027-.052.02-.058.011-.064.004-.066v-.172l-.004-.064-.011-.064-.02-.058-.027-.052-.033-.046-.043-.042-.045-.034-.053-.028-.059-.02-.06-.011z"/>
  </svg>
);

const technologies = [
  { name: "JavaScript", icon: <span className="text-yellow-400 font-bold text-sm">JS</span> },
  { name: "TypeScript", icon: <span className="text-blue-400 font-bold text-sm">TS</span> },
  { name: "React", icon: <span className="text-cyan-400">⚛️</span> },
  { name: "Next.js", icon: <span className="text-foreground"><NextIcon /></span> },
  { name: "Tailwind CSS", icon: <span className="text-cyan-400"><TailwindIcon /></span> },
  { name: "Node.js", icon: <span><NodeIcon /></span> },
  { name: "Express.js", icon: <span className="text-muted-foreground font-bold text-sm">Ex</span> },
  { name: "Nest.js", icon: <span className="text-red-500">🐱</span> },
  { name: "MongoDB", icon: <span className="text-green-500">🍃</span> },
  { name: "PostgreSQL", icon: <span className="text-blue-400">🐘</span> },
  { name: "Prisma", icon: <span className="text-foreground">◆</span> },
  { name: "PWA", icon: <span className="text-purple-400">📱</span> },
  { name: "SEO", icon: <span className="text-primary">📈</span> },
  { name: "Socket.io", icon: <span className="text-foreground"><SocketIcon /></span> },
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
