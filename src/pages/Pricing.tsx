import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Lite",
    price: "12.99",
    description: "Essential tracking for small fleets",
    features: [
      "Real-time GPS tracking",
      "Trip history & mileage reports",
      "Geofence alerts",
      "Mobile app access",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Core",
    price: "19.99",
    description: "Complete fleet visibility and management",
    features: [
      "Everything in Lite",
      "Driver behavior scoring",
      "Fuel monitoring",
      "Vehicle health alerts",
      "Digital vehicle checks",
      "Priority phone support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Plus",
    price: "29.99",
    description: "Advanced tools for growing fleets",
    features: [
      "Everything in Core",
      "Connected dash cams",
      "Live video streaming",
      "Job management & dispatch",
      "Driver app with navigation",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Get Started",
    popular: false,
  },
];

const PricingPage = () => {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative pt-32 lg:pt-44 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="container-premium relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Pricing</p>
            <h1 className="font-bold text-display-2 md:text-display-1 text-foreground mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Simple, Transparent <span className="text-accent">Pricing</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              No hidden fees. No long contracts. Just powerful fleet tracking from £12.99/month per vehicle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                  plan.popular
                    ? "bg-accent/5 border-accent/50 shadow-glow scale-[1.02]"
                    : "bg-card border-border/50 hover:border-accent/30"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="font-bold text-xl text-foreground mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>£{plan.price}</span>
                  <span className="text-muted-foreground text-sm">/month per vehicle</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className={`w-full ${plan.popular ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}`} variant={plan.popular ? "default" : "outline"}>
                  <Link to="/get-quote">{plan.cta}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ-style CTA */}
      <section className="section-padding bg-card/50">
        <div className="container-premium text-center">
          <h2 className="font-bold text-display-3 text-foreground mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Not Sure Which Plan?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Speak to our team for a tailored recommendation based on your fleet size and requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/get-quote">Get a Custom Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/book-demo">Book a Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default PricingPage;
