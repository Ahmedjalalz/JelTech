import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, Instagram, Twitter, Linkedin } from "lucide-react";

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/jeltech.official", icon: Instagram },
  { name: "Twitter", href: "https://x.com/jeltechofficial", icon: Twitter },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/jeltech-group", icon: Linkedin },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Let's Build Something
            <br />
            <span className="text-gradient-green">Great Together</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a question or want to learn more about our services? Reach out
            to us through any of the channels below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <a
              href="mailto:Support@jeltech.net"
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Us</p>
                <p className="text-foreground font-medium">Support@jeltech.net</p>
              </div>
            </a>

            <a
              href="tel:+923143394966"
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Call Us</p>
                <p className="text-foreground font-medium">+92 314 3394966</p>
              </div>
            </a>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-4">Follow us on social media</p>
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
