import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Shield, Users, Wrench, PiggyBank, FileText, Home } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Tenant Find Only",
    price: "One month's rent",
    description: "We find you a quality tenant and handle all the paperwork.",
    features: [
      "Professional marketing",
      "Tenant screening",
      "Reference checks",
      "Right to Rent checks",
      "Tenancy agreement",
      "Inventory (optional extra)",
    ],
    popular: false,
  },
  {
    title: "Rent Collection",
    price: "8% + VAT",
    description: "Everything in Tenant Find, plus ongoing rent collection.",
    features: [
      "All Tenant Find services",
      "Monthly rent collection",
      "Payment to landlord",
      "Rent arrears management",
      "Quarterly statements",
      "Deposit protection",
    ],
    popular: false,
  },
  {
    title: "Full Management",
    price: "12% + VAT",
    description: "Complete hands-off management of your property.",
    features: [
      "All Rent Collection services",
      "Property inspections",
      "Maintenance coordination",
      "24/7 emergency line",
      "Tenancy renewals",
      "Checkout & deposit disputes",
    ],
    popular: true,
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Rigorous Tenant Screening",
    description: "Comprehensive referencing including credit, employment, and previous landlord checks.",
  },
  {
    icon: Users,
    title: "Local Expertise",
    description: "Deep knowledge of the local rental market to price your property competitively.",
  },
  {
    icon: Wrench,
    title: "Trusted Contractors",
    description: "A network of reliable, vetted tradespeople for all maintenance needs.",
  },
  {
    icon: PiggyBank,
    title: "Maximise Returns",
    description: "Strategic advice to enhance your property's appeal and rental value.",
  },
  {
    icon: FileText,
    title: "Full Compliance",
    description: "We ensure you meet all legal obligations including gas safety, EICRs, and EPCs.",
  },
  {
    icon: Home,
    title: "Property Care",
    description: "Regular inspections and proactive maintenance to protect your investment.",
  },
];

export default function Landlords() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
            alt="Rental property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/75" />
        </div>
        <div className="container-premium relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Landlord Services</p>
            <h1 className="font-serif text-display-2 md:text-display-1 text-foreground mb-6">
              Let your property with <span className="italic-accent">confidence</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              From finding quality tenants to full property management, 
              we take the stress out of being a landlord.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/valuation">
                  Free Rental Valuation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30 text-foreground">
                <Link to="/contact">Speak to Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Our Services</p>
            <h2 className="font-serif text-display-3 text-foreground">
              Choose the service that <span className="italic-accent">suits</span> you
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={cn(
                  "relative p-8 rounded-sm border",
                  service.popular 
                    ? "bg-accent/5 border-accent" 
                    : "bg-card border-border"
                )}
              >
                {service.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-xs uppercase tracking-wider rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="font-serif text-2xl text-foreground mb-2">{service.title}</h3>
                <p className="text-accent text-lg font-medium mb-4">{service.price}</p>
                <p className="text-muted-foreground text-sm mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  asChild 
                  className={cn(
                    "w-full",
                    service.popular 
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground" 
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  )}
                >
                  <Link to="/contact">Get Started</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-card">
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
              Peace of mind for <span className="italic-accent">landlords</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1 }}
                >
                  <benefit.icon className="h-7 w-7 text-accent" />
                </motion.div>
                <h3 className="font-serif text-xl text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-accent">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "350+", label: "Properties Managed" },
              { value: "99%", label: "Rent Collection Rate" },
              { value: "14 days", label: "Average Let Time" },
              { value: "4.9★", label: "Landlord Rating" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="font-serif text-display-3 text-accent-foreground mb-2">{stat.value}</p>
                <p className="text-sm text-accent-foreground/70 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-premium text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-display-3 text-foreground mb-6">
              Ready to let your property?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Get a free rental valuation and discover how we can help you 
              maximise your returns with minimum hassle.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/valuation">
                  Free Rental Valuation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Speak to an Expert</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
