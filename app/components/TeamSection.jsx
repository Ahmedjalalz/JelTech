'use client';

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Ahmed Jalal",
    role: "Founder & Lead Developer",
    image: "/assets/team/ahmed-jalal.png",
  },
  {
    name: "Abdul Rehman",
    role: "Backend Developer",
    image: "/assets/team/abdul-rehman.jpeg",
  },
  {
    name: "Ahmed Shahid",
    role: "Software Developer",
    image: "/assets/team/ahmed-shahid.png",
  },
  {
    name: "Abdullah Asif",
    role: "Shopify & Web Developer",
    image: "/assets/team/abdullah.jpeg",
  },
  {
    name: "Umer Nadeem",
    role: "UI/UX Designer",
    image: "/assets/team/umer-nadeem.jpeg",
  },
  {
    name: "Awais Jamil",
    role: "Business Development",
    image: "/assets/team/awais.jpeg",
  },
];

const TeamMemberCard = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group text-center p-4 rounded-2xl bg-card/40 border border-border/60 hover:border-primary/40 transition-all duration-300"
    >
      {/* Avatar */}
      <div className="relative w-28 h-28 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300" />
        <Image
          src={member.image}
          alt={member.name}
          width={112}
          height={112}
          className="w-full h-full rounded-full object-cover border-2 border-border group-hover:border-primary transition-all duration-300 shadow-md"
        />
      </div>

      {/* Info */}
      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
        {member.name}
      </h3>
      <p className="text-muted-foreground text-xs mt-1 font-medium">{member.role}</p>
    </motion.div>
  );
};

export const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 block">
            The People Behind JelTech
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Core Team &amp; <span className="text-gradient-green">Collaborators</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            The developers, designers, and specialists who bring JelTech&apos;s digital experiences and software products to life.
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
