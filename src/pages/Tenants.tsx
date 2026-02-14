import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, FileText, Home, Shield, Phone, Search, Key } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Search,
    title: "Browse Properties",
    description: "Explore our portfolio of quality rental properties across the region.",
  },
  {
    icon: Phone,
    title: "Book a Viewing",
    description: "Contact us to arrange a viewing at a time that suits you.",
  },
  {
    icon: FileText,
    title: "Apply Online",
    description: "Complete our simple online application and referencing process.",
  },
  {
    icon: Key,
    title: "Move In",
    description: "Once approved, collect your keys and start making it your home.",
  },
];

const faqs = [
  {
    question: "What documents do I need to rent?",
    answer: "You'll typically need proof of identity (passport/driving licence), proof of address, proof of income (payslips or employment contract), and bank statements. We'll guide you through the specific requirements.",
  },
  {
    question: "How much deposit is required?",
    answer: "Most properties require a deposit equivalent to 5 weeks' rent. This is protected in a government-approved scheme and returned at the end of your tenancy, subject to any deductions.",
  },
  {
    question: "Can I have pets?",
    answer: "Many of our landlords do consider pets. Properties marked as 'Pets Considered' are a good starting point, but we can always ask on your behalf for other properties.",
  },
  {
    question: "How long are the tenancies?",
    answer: "Most of our tenancies start with a minimum 12-month term, though this can vary. After the initial period, tenancies typically continue on a rolling monthly basis.",
  },
  {
    question: "What fees do tenants pay?",
    answer: "Thanks to the Tenant Fees Act, the only permitted payments are rent, a security deposit (max 5 weeks), a holding deposit (max 1 week), and any changes you request to your tenancy.",
  },
];

export default function Tenants() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-card">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">For Tenants</p>
            <h1 className="font-serif text-display-3 md:text-display-2 text-foreground mb-4">
              Find <span className="italic-accent">your</span> perfect rental
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're looking for a city apartment or a countryside cottage, 
              we'll help you find a place to call home.
            </p>
            <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/lettings">
                Browse Properties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">How It Works</p>
            <h2 className="font-serif text-display-3 text-foreground">
              Your journey to a new <span className="italic-accent">home</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 relative"
                  whileHover={{ scale: 1.1 }}
                >
                  <step.icon className="h-7 w-7 text-accent" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                </motion.div>
                <h3 className="font-serif text-xl text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Rent With Us */}
      <section className="section-padding bg-card">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Why Choose Us</p>
              <h2 className="font-serif text-display-3 text-foreground mb-6">
                Renting made <span className="italic-accent">simple</span>
              </h2>
              <div className="space-y-4">
                {[
                  "Quality properties, properly maintained",
                  "Responsive, friendly service",
                  "Clear, transparent processes",
                  "24/7 emergency support for managed properties",
                  "No hidden fees or surprises",
                  "Local team who know the area",
                ].map((item, idx) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <Check className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8">
                <Button asChild className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/lettings">
                    View All Rentals
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/5] rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop"
                  alt="Modern apartment"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">FAQs</p>
            <h2 className="font-serif text-display-3 text-foreground">
              Common <span className="italic-accent">questions</span>
            </h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, idx) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-card border border-border rounded-sm"
              >
                <h3 className="font-serif text-lg text-foreground mb-3">{faq.question}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent">
        <div className="container-premium text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-display-3 text-accent-foreground mb-6">
              Ready to find your new home?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
                <Link to="/lettings">
                  Browse Rentals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
