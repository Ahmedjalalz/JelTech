import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Send, ArrowRight, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "We learn about your business, goals, and vision to understand exactly what you need.",
  },
  {
    step: "02",
    title: "Proposal",
    description: "We craft a detailed proposal with timeline, deliverables, and transparent pricing.",
  },
  {
    step: "03",
    title: "Design & Build",
    description: "Our team designs and develops your project with regular updates and feedback rounds.",
  },
  {
    step: "04",
    title: "Launch & Support",
    description: "We deploy your project and provide ongoing support to ensure everything runs smoothly.",
  },
];

const StartProject = () => {
  const { pathname } = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-100px" });
  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, margin: "-100px" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: "Request submitted!",
      description: "We'll review your project details and get back to you within 24 hours.",
    });
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
                Start a Project
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Let's Bring Your{" "}
                <span className="text-gradient-green">Vision to Life</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Tell us about your project and we'll get back to you with a custom proposal 
                tailored to your needs and budget.
              </p>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <motion.div
              ref={processRef}
              initial={{ opacity: 0, y: 30 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                How It Works
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Our streamlined process ensures your project is delivered on time and beyond expectations.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {processSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border relative"
                >
                  <span className="text-4xl font-bold text-primary/20 absolute top-4 right-4">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
          <div className="container mx-auto px-6 relative">
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 40 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-xl mx-auto"
            >
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  Get a Free Quote
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll respond within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className="bg-secondary/50 border-border focus:border-primary h-12"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="bg-secondary/50 border-border focus:border-primary h-12"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="project-type" className="block text-sm font-medium text-foreground mb-2">
                    Project Type
                  </label>
                  <Input
                    id="project-type"
                    name="project-type"
                    placeholder="e.g., E-commerce website, Mobile app, Shopify store..."
                    required
                    className="bg-secondary/50 border-border focus:border-primary h-12"
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
                    Estimated Budget (Optional)
                  </label>
                  <Input
                    id="budget"
                    name="budget"
                    placeholder="e.g., $1,000 - $5,000"
                    className="bg-secondary/50 border-border focus:border-primary h-12"
                  />
                </div>

                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-foreground mb-2">
                    Project Details
                  </label>
                  <Textarea
                    id="details"
                    name="details"
                    placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                    rows={5}
                    required
                    className="bg-secondary/50 border-border focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StartProject;
