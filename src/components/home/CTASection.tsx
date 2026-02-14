import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import fleetCtaBanner from "@/assets/fleet-cta-banner.webp";

export function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <motion.img
          src={fleetCtaBanner}
          alt="Fleet vehicles"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        />
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className="container-premium relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Get Started Today</p>
          <h2 className="font-bold text-display-3 md:text-display-2 text-foreground mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Ready to Take Control of <span className="text-accent">Your Fleet?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            Join 22,000+ businesses who trust Travio to manage their fleet. Get a quote today or book a free demo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button asChild size="lg" className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground px-8">
                <Link to="/get-quote">
                  Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button asChild variant="outline" size="lg" className="border-accent/30 text-foreground hover:bg-accent/10 px-8">
                <Link to="/book-demo">Book a Demo</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
