import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer:
      "Project timelines vary based on complexity. A simple website typically takes 2-4 weeks, while more complex web applications can take 2-3 months. We'll provide a detailed timeline during our initial consultation based on your specific requirements.",
  },
  {
    question: "How do you handle project communication?",
    answer:
      "We believe in transparent, consistent communication. You'll have a dedicated project manager, weekly progress updates, and access to our project management tools. We use Slack, email, and video calls to ensure you're always in the loop.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "We specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various database solutions. We choose the best tech stack for your specific needs, ensuring scalability and maintainability.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Absolutely! We offer various maintenance and support packages to keep your application running smoothly. This includes bug fixes, security updates, performance monitoring, and feature enhancements as needed.",
  },
  {
    question: "How do you price your projects?",
    answer:
      "We offer both fixed-price and hourly billing depending on the project scope. After our initial consultation, we provide a detailed proposal with transparent pricing. No hidden fees – you'll know exactly what you're paying for.",
  },
  {
    question: "Can you work with our existing team?",
    answer:
      "Yes! We're experienced in collaborating with in-house teams. Whether you need us to lead development, augment your team, or provide specialized expertise, we adapt to your workflow and tools.",
  },
];

export const FAQSection = () => {
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
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Common Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Everything you need to know about working with us.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-secondary/50 border border-border rounded-xl px-6 data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5 [&[data-state=open]]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
