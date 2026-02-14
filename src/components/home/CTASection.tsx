import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.img
          src="https://ggfx-dalesandpeaks.s3.eu-west-2.amazonaws.com/x.prod/528x535/33_52561862bc.webp"
          alt="Your perfect move"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
        />
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <div className="container-premium relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.3em] text-accent mb-4"
          >
            Your Perfect Move
          </motion.p>
          <motion.h2 
            className="font-serif text-display-3 md:text-display-2 text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to find <span className="italic-accent">your</span> next home?
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Whether you're buying, selling, or letting, our team is here to guide you 
            through every step of your property journey.
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button 
                asChild
                size="lg"
                className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground px-8"
              >
                <Link to="/valuation">
                  Book a Valuation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-primary/30 text-foreground hover:bg-primary/10 px-8"
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
