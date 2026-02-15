import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, Route, Clock, MapPin, Smartphone, Bell, BarChart3, Shield } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import deliveryHero from "@/assets/solution-delivery-hero.webp";

const features = [
  { icon: Route, title: "Multi-Drop Routing", description: "Automatically sequence stops for the fastest route across dozens of daily deliveries." },
  { icon: Clock, title: "Live Customer ETAs", description: "Send automated ETA notifications so customers know exactly when to expect their delivery." },
  { icon: Package, title: "Proof of Delivery", description: "Capture photos, signatures, and notes at every stop for complete delivery confirmation." },
  { icon: Smartphone, title: "Driver App", description: "Turn-by-turn navigation, stop lists, and delivery instructions — all on the driver's phone." },
  { icon: MapPin, title: "Real-Time Tracking", description: "See every delivery van on a live map. Reassign stops on the fly when plans change." },
  { icon: Bell, title: "Failed Delivery Alerts", description: "Instant notifications when a delivery can't be completed, with reason codes and photos." },
  { icon: BarChart3, title: "Delivery Analytics", description: "Track success rates, average delivery times, and driver performance across your fleet." },
  { icon: Shield, title: "Safe Driving Scores", description: "Monitor harsh braking, speeding, and acceleration to keep your drivers and public safe." },
];

const benefits = [
  { stat: "25%", label: "More deliveries per day" },
  { stat: "99.2%", label: "Delivery success rate" },
  { stat: "40%", label: "Fewer customer complaints" },
  { stat: "Real-time", label: "Customer ETA updates" },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How does multi-drop route optimisation work?", "acceptedAnswer": { "@type": "Answer", "text": "Upload your daily delivery list and Travio automatically sequences the stops into the fastest route, factoring in traffic, time windows, and vehicle capacity." } },
    { "@type": "Question", "name": "Can customers track their delivery in real time?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — customers receive an automated SMS or email with a live tracking link showing the driver's location and estimated arrival time, updated in real time." } },
    { "@type": "Question", "name": "What counts as proof of delivery?", "acceptedAnswer": { "@type": "Answer", "text": "Drivers capture a digital signature, photo of the parcel at the door, and timestamped GPS location. All evidence is stored against the delivery record for dispute resolution." } },
    { "@type": "Question", "name": "Does the driver app work offline?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The driver app caches the route and delivery details so drivers can continue working in areas with poor signal. Data syncs automatically when connectivity is restored." } },
    { "@type": "Question", "name": "Can I integrate Travio with my existing systems?", "acceptedAnswer": { "@type": "Answer", "text": "Travio integrates with popular order management and e-commerce platforms via API. We also offer CSV import for quick daily upload of delivery manifests." } },
  ]
};

const Delivery = () => {
  return (
    <PageWrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="relative pt-32 lg:pt-44 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="container-premium relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Delivery & Last Mile</p>
              <h1 className="font-bold text-display-2 md:text-display-1 text-foreground mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Deliver More, <span className="text-accent">Faster</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl">
                Optimise multi-drop routes, send live ETAs to customers, and capture proof of every delivery with Travio.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/get-quote">Get a Quote</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/book-demo">Book a Demo</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src={deliveryHero} alt="Fleet of delivery vans driving through a modern city" className="w-full h-auto object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-border/50 bg-card/50">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <motion.div
                key={b.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-bold text-accent mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{b.stat}</p>
                <p className="text-sm text-muted-foreground">{b.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Delivery Features</p>
            <h2 className="font-bold text-display-3 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Built for <span className="text-accent">Last-Mile Excellence</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <feature.icon className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">FAQ</p>
              <h2 className="font-bold text-display-3 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Common <span className="text-accent">Questions</span>
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="q1" className="border border-border/50 rounded-xl px-6 bg-card">
                <AccordionTrigger className="text-foreground font-semibold text-left" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>How does multi-drop route optimisation work?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">Upload your daily delivery list and Travio automatically sequences the stops into the fastest route, factoring in traffic, time windows, and vehicle capacity.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2" className="border border-border/50 rounded-xl px-6 bg-card">
                <AccordionTrigger className="text-foreground font-semibold text-left" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Can customers track their delivery in real time?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">Yes — customers receive an automated SMS or email with a live tracking link showing the driver's location and estimated arrival time, updated in real time.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3" className="border border-border/50 rounded-xl px-6 bg-card">
                <AccordionTrigger className="text-foreground font-semibold text-left" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What counts as proof of delivery?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">Drivers capture a digital signature, photo of the parcel at the door, and timestamped GPS location. All evidence is stored against the delivery record for dispute resolution.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4" className="border border-border/50 rounded-xl px-6 bg-card">
                <AccordionTrigger className="text-foreground font-semibold text-left" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Does the driver app work offline?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">Yes. The driver app caches the route and delivery details so drivers can continue working in areas with poor signal. Data syncs automatically when connectivity is restored.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5" className="border border-border/50 rounded-xl px-6 bg-card">
                <AccordionTrigger className="text-foreground font-semibold text-left" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Can I integrate Travio with my existing systems?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">Travio integrates with popular order management and e-commerce platforms via API. We also offer CSV import for quick daily upload of delivery manifests.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section className="section-padding bg-accent/5">
        <div className="container-premium text-center">
          <h2 className="font-bold text-display-3 text-foreground mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Supercharge Your Delivery Operations
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            See how Travio helps delivery companies improve efficiency and customer satisfaction.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/get-quote">Get a Quote</Link>
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

export default Delivery;
