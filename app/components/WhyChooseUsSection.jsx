import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Calendar, FolderCheck, Heart, Cpu } from "lucide-react";

const stats = [
  {
    icon: Calendar,
    value: 5,
    suffix: "+",
    label: "Years Experience",
    description: "Building digital products",
  },
  {
    icon: FolderCheck,
    value: 50,
    suffix: "+",
    label: "Projects Delivered",
    description: "Across various industries",
  },
  {
    icon: Heart,
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Based on client feedback",
  },
  {
    icon: Cpu,
    value: 20,
    suffix: "+",
    label: "Technologies Mastered",
    description: "Modern tech stack",
  },
];

const AnimatedCounter = ({
  value,
  suffix,
  isInView,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(easeOutQuart * value);
      
      setDisplayValue(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span className="text-4xl sm:text-5xl font-bold text-foreground">
      <span>{displayValue}</span>
      <span className="text-primary">{suffix}</span>
    </span>
  );
};

const StatCard = ({
  stat,
  index,
  isInView,
}) => {
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group p-6 rounded-2xl bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-300 text-center"
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_rgba(69,190,67,0.2)] transition-all duration-300">
        <Icon className="w-7 h-7 text-primary" />
      </div>

      {/* Counter */}
      <AnimatedCounter
        value={stat.value}
        suffix={stat.suffix}
        isInView={isInView}
      />

      {/* Label */}
      <h3 className="text-lg font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">
        {stat.label}
      </h3>
      <p className="text-muted-foreground text-sm mt-1">{stat.description}</p>
    </motion.div>
  );
};

export const WhyChooseUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Numbers That Speak
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our track record demonstrates our commitment to excellence and
            client success.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
