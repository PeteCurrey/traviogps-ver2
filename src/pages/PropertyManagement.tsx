import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Shield, Clock, Wrench, FileText, Users, Phone } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import heroBanner from "@/assets/hero-banner.webp";

const services = [
  {
    icon: Users,
    title: "Tenant Finding",
    description: "Comprehensive marketing, viewings, referencing, and tenancy agreements to find quality tenants quickly.",
  },
  {
    icon: FileText,
    title: "Rent Collection",
    description: "Reliable monthly rent collection with detailed statements and prompt payment to your account.",
  },
  {
    icon: Wrench,
    title: "Maintenance Management",
    description: "24/7 maintenance coordination with trusted contractors, ensuring swift resolution of any issues.",
  },
  {
    icon: Shield,
    title: "Legal Compliance",
    description: "Stay compliant with all landlord regulations including gas safety, EICRs, EPCs, and deposit protection.",
  },
  {
    icon: Clock,
    title: "Regular Inspections",
    description: "Periodic property inspections with detailed reports and photos to protect your investment.",
  },
  {
    icon: CheckCircle,
    title: "End of Tenancy",
    description: "Professional inventory checks, deposit negotiations, and seamless tenant transitions.",
  },
];

const packages = [
  {
    name: "Let Only",
    price: "One month's rent",
    features: [
      "Marketing across major portals",
      "Professional photography",
      "Accompanied viewings",
      "Tenant referencing",
      "Tenancy agreement preparation",
      "Deposit registration",
    ],
  },
  {
    name: "Rent Collection",
    price: "8% + VAT",
    features: [
      "Everything in Let Only",
      "Monthly rent collection",
      "Arrears management",
      "Monthly statements",
      "Tenancy renewals",
      "Landlord portal access",
    ],
    popular: true,
  },
  {
    name: "Full Management",
    price: "12% + VAT",
    features: [
      "Everything in Rent Collection",
      "24/7 maintenance handling",
      "Regular property inspections",
      "Contractor management",
      "Legal compliance updates",
      "End of tenancy management",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function PropertyManagement() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Property Management Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Link 
              to="/landlords" 
              className="text-sm uppercase tracking-[0.3em] text-accent mb-4 inline-block hover:text-accent/80 transition-colors"
            >
              ← Landlord Services
            </Link>
            <h1 className="font-serif text-display-3 md:text-display-2 lg:text-display-1 text-foreground mb-6">
              Property <span className="italic-accent">management</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Let us handle everything. From finding quality tenants to maintaining your property, 
              our comprehensive management service gives you complete peace of mind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">What We Offer</p>
            <h2 className="font-serif text-display-3 text-foreground mb-6">
              Comprehensive <span className="italic-accent">services</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our property management covers every aspect of letting your property, 
              so you can sit back and enjoy the returns.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={itemVariants}>
                <Card className="h-full bg-card border-border">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-sm bg-accent/10 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-serif text-xl text-foreground mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="section-padding bg-card">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Our Packages</p>
            <h2 className="font-serif text-display-3 text-foreground mb-6">
              Choose your <span className="italic-accent">level</span> of service
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, idx) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`relative rounded-sm border ${pkg.popular ? 'border-accent bg-background' : 'border-border bg-background'} p-8`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-xs uppercase tracking-wider rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-serif text-2xl text-foreground mb-2">{pkg.name}</h3>
                <p className="text-accent text-lg font-medium mb-6">{pkg.price}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  asChild 
                  className={pkg.popular ? 'w-full bg-accent hover:bg-accent/90 text-accent-foreground' : 'w-full'}
                  variant={pkg.popular ? 'default' : 'outline'}
                >
                  <Link to="/contact">Get Started</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-accent">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-serif text-display-3 text-accent-foreground mb-6">
              Ready to let us manage your property?
            </h2>
            <p className="text-accent-foreground/70 mb-8 max-w-xl mx-auto">
              Get in touch for a free consultation and find out how we can help maximise your rental income.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
                <Link to="/contact">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Us
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10">
                <Link to="/landlords">
                  View All Landlord Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
