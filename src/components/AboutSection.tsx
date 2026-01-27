import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

const values = [
  "Clean, maintainable code that scales",
  "Performance-first development approach",
  "Transparent communication throughout",
  "Long-term partnership mindset",
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              We're Passionate About
              <br />
              <span className="text-gradient-green">Building Great Software</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              At JelTech, we believe that exceptional software is built on a
              foundation of clean code, thoughtful design, and genuine
              partnership with our clients. We're not just developers—we're
              problem solvers who care deeply about the success of every project
              we touch.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Our team brings years of experience across startups and
              enterprises, combining technical excellence with a pragmatic
              approach to deliver results that matter.
            </p>

            {/* Values list */}
            <ul className="space-y-4">
              {values.map((value, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{value}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-secondary to-card border border-border p-8 relative overflow-hidden">
              {/* Decorative code block */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                </div>
                {[
                  { text: "const", color: "text-purple-400" },
                  { text: "buildSuccess", color: "text-primary" },
                  { text: "= (", color: "text-foreground/60" },
                  { text: "passion,", color: "text-orange-400" },
                  { text: "skill,", color: "text-orange-400" },
                  { text: "dedication", color: "text-orange-400" },
                  { text: ") => {", color: "text-foreground/60" },
                ].map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`${item.color} font-mono text-sm md:text-base`}
                  >
                    {item.text}{" "}
                  </motion.span>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.2 }}
                  className="pl-4 pt-2"
                >
                  <span className="text-purple-400 font-mono text-sm md:text-base">
                    return{" "}
                  </span>
                  <span className="text-primary font-mono text-sm md:text-base">
                    amazingProducts
                  </span>
                  <span className="text-foreground/60 font-mono text-sm md:text-base">
                    ;
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.4 }}
                  className="pt-2"
                >
                  <span className="text-foreground/60 font-mono text-sm md:text-base">
                    {"};"}
                  </span>
                </motion.div>
              </div>

              {/* Cursor blink */}
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-2 h-5 bg-primary ml-1 align-middle"
              />

              {/* Glow accent */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[60px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
