import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Camera, Megaphone, Users, Briefcase, TrendingUp, Shield } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";

const sellingSteps = [
  {
    number: "01",
    title: "Valuation",
    description: "We'll visit your home, understand your goals, and provide an accurate market appraisal.",
  },
  {
    number: "02",
    title: "Marketing",
    description: "Professional photography, drone footage, and compelling copy to showcase your property.",
  },
  {
    number: "03",
    title: "Viewings",
    description: "We handle all viewings, providing detailed feedback and qualifying genuine buyers.",
  },
  {
    number: "04",
    title: "Negotiation",
    description: "Expert negotiation to achieve the best possible price and terms for you.",
  },
  {
    number: "05",
    title: "Completion",
    description: "We manage the sales progression, liaising with all parties to ensure a smooth transaction.",
  },
];

const features = [
  {
    icon: Camera,
    title: "Premium Photography",
    description: "Professional photos, drone footage, and virtual tours that showcase your home at its best.",
  },
  {
    icon: Megaphone,
    title: "Strategic Marketing",
    description: "Targeted campaigns across premium portals, social media, and our extensive buyer database.",
  },
  {
    icon: Users,
    title: "Accompanied Viewings",
    description: "Every viewing personally conducted by an experienced negotiator who knows your property.",
  },
  {
    icon: Briefcase,
    title: "Expert Negotiation",
    description: "Skilled negotiation to secure the best price and terms, protecting your interests at every stage.",
  },
  {
    icon: TrendingUp,
    title: "Market Insight",
    description: "Deep local knowledge and market analysis to position your property for maximum impact.",
  },
  {
    icon: Shield,
    title: "Sales Progression",
    description: "Dedicated support from offer to completion, managing every aspect of the sale.",
  },
];

const testimonials = [
  {
    quote: "Dales and Peaks sold our home above asking price within two weeks. Their marketing was exceptional.",
    author: "The Williams Family",
    location: "Bakewell",
  },
  {
    quote: "From valuation to completion, the team were professional, responsive and a pleasure to work with.",
    author: "David & Sarah Thompson",
    location: "Sheffield",
  },
];

export default function Sell() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop"
            alt="Premium property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <div className="container-premium relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Selling Your Home</p>
            <h1 className="font-serif text-display-2 md:text-display-1 text-foreground mb-6">
              Your home deserves an <span className="italic-accent">exceptional</span> story
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              We don't just list properties. We craft compelling narratives that connect 
              with the right buyers and achieve outstanding results.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/valuation">
                  Book a Valuation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30 text-foreground">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Sell With Us */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Why Choose Us</p>
            <h2 className="font-serif text-display-3 text-foreground">
              A <span className="italic-accent">different</span> kind of estate agent
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-8 bg-card border border-border rounded-sm group hover:border-accent/30 transition-colors"
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="h-6 w-6 text-accent" />
                </motion.div>
                <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-card">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">The Process</p>
              <h2 className="font-serif text-display-3 text-foreground mb-6">
                Your journey to <span className="italic-accent">sold</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Selling your home should be exciting, not stressful. We guide you through 
                every step with clear communication and expert support.
              </p>
              <Button asChild className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/valuation">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <div className="space-y-6">
              {sellingSteps.map((step, idx) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex gap-6 p-6 bg-background rounded-sm group hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-serif text-3xl text-accent">{step.number}</span>
                  <div>
                    <h3 className="font-serif text-lg text-foreground mb-1 group-hover:text-accent transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-display-3 text-foreground">
              What our <span className="italic-accent">sellers</span> say
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-8 bg-card border border-border rounded-sm"
              >
                <p className="font-serif text-lg text-foreground italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-accent">
        <div className="container-premium text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-display-3 text-accent-foreground mb-6">
              Ready to sell your home?
            </h2>
            <p className="text-accent-foreground/70 mb-8 max-w-xl mx-auto">
              Get started with a free, no-obligation valuation from our local experts.
            </p>
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
              <Link to="/valuation">
                Book Your Valuation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
