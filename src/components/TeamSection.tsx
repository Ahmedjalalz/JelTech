import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

import ahmedImg from "@/assets/team/ahmed-jalal.png";
import saraImg from "@/assets/team/sara.jpeg";
import abdulRehmanImg from "@/assets/team/abdul-rehman.jpeg";
import abdullahImg from "@/assets/team/abdullah.jpeg";
import umerImg from "@/assets/team/umer-nadeem.jpeg";
import awaisImg from "@/assets/team/awais.jpeg";

const teamMembers = [
  {
    name: "Ahmed Jalal",
    role: "Founder & CEO",
    image: ahmedImg,
  },
  {
    name: "Abdul Rehman",
    role: "Backend Developer",
    image: abdulRehmanImg,
  },
  {
    name: "Sara Chaudary",
    role: "Mobile Developer",
    image: saraImg,
  },
  {
    name: "Abdullah Asif",
    role: "Shopify Developer",
    image: abdullahImg,
  },
  {
    name: "Umer Nadeem",
    role: "UI/UX Designer",
    image: umerImg,
  },
  {
    name: "Awais Jamil",
    role: "Business Developer",
    image: awaisImg,
  },
];

const TeamMemberCard = ({
  member,
  index,
}: {
  member: (typeof teamMembers)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group text-center"
    >
      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative w-32 h-32 mx-auto mb-4"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/40 group-hover:to-primary/20 transition-all duration-300" />
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full rounded-full object-cover border-2 border-transparent group-hover:border-primary transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(69,190,67,0.3)]"
        />
      </motion.div>

      {/* Info */}
      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
        {member.name}
      </h3>
      <p className="text-muted-foreground text-sm mt-1">{member.role}</p>
    </motion.div>
  );
};

export const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet the Experts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A passionate team of developers and designers dedicated to crafting
            exceptional digital experiences.
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
