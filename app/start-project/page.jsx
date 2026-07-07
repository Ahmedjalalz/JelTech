'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Send, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We learn about your business, goals, and vision to understand exactly what you need.',
  },
  {
    step: '02',
    title: 'Proposal',
    description: 'We craft a detailed proposal with timeline, deliverables, and transparent pricing.',
  },
  {
    step: '03',
    title: 'Design & Build',
    description: 'Our team designs and develops your project with regular updates and feedback rounds.',
  },
  {
    step: '04',
    title: 'Launch & Support',
    description: 'We deploy your project and provide ongoing support and maintenance.',
  },
];

export default function StartProject() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/start-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error || 'Failed to submit form.');
      }

      toast({
        title: 'Success!',
        description: 'We received your project details. We&apos;ll contact you soon!',
      });

      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: '',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: error?.message || 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Process Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                Start Your Project
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Tell us about your vision and let&apos;s build something amazing together
              </p>
            </motion.div>

            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-card border border-border rounded-lg p-6 h-full hover:border-primary/50 transition-colors">
                    <div className="text-4xl font-bold text-primary mb-3">{step.step}</div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Form Section */}
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-lg p-8 md:p-12 max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Project Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Type</label>
                    <Input
                      type="text"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      placeholder="Website, Mobile App, E-commerce..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Timeline</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select timeline...</option>
                      <option value="1-2-months">1-2 months</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-plus-months">6+ months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Budget Range</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="5,000 - 10,000"
                      required
                      className="pl-7"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Description</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows="5"
                    required
                    className="resize-none"
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:to-primary text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Project Details'}
                    <Send className="w-5 h-5" />
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
