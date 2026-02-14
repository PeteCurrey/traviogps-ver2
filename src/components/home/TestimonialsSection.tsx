import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "RAM Tracking has transformed the way we manage our fleet. We've reduced fuel costs by 18% and improved job completion rates significantly.",
    author: "Mark Richards",
    location: "Operations Director, BuildRight Construction",
    rating: 5
  },
  {
    id: 2,
    quote: "The real-time tracking and driver behaviour monitoring has been a game-changer. Our insurance premiums dropped within the first year.",
    author: "Sarah Mitchell",
    location: "Fleet Manager, Express Logistics",
    rating: 5
  },
  {
    id: 3,
    quote: "Setting up was incredibly easy and the support team has been fantastic. We now complete 3 extra jobs per van per day thanks to better routing.",
    author: "James Cooper",
    location: "Managing Director, Cooper's Plumbing",
    rating: 5
  },
  {
    id: 4,
    quote: "The dash cam integration gives us complete peace of mind. We've successfully defended two false claims this year alone.",
    author: "Lisa Chambers",
    location: "Transport Manager, Swift Deliveries",
    rating: 5
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-card relative overflow-hidden">
      <motion.div 
        className="absolute top-0 right-0 w-1/2 h-full bg-secondary/30 -skew-x-12 translate-x-1/4"
        initial={{ x: "100%", opacity: 0 }}
        whileInView={{ x: "25%", opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      />
      
      <div className="container-premium relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Testimonials</p>
            <h2 className="font-bold text-display-3 text-foreground mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              What Our <span className="text-accent">Customers</span> Say
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              22,000+ businesses trust RAM Tracking to manage their fleets. Here's what some of them say.
            </p>

            <div className="flex items-center gap-4">
              <motion.button onClick={prev} className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:border-accent hover:text-accent transition-colors duration-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button onClick={next} className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:border-accent hover:text-accent transition-colors duration-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <ChevronRight className="h-5 w-5" />
              </motion.button>
              <span className="text-sm text-muted-foreground ml-4">{currentIndex + 1} / {testimonials.length}</span>
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="bg-background p-8 md:p-10 rounded-lg shadow-elevated"
              >
                <Quote className="h-10 w-10 text-accent/30 mb-6" />
                <blockquote className="font-bold text-xl md:text-2xl text-foreground leading-relaxed mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="font-bold text-lg text-accent">
                      {testimonials[currentIndex].author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonials[currentIndex].author}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[currentIndex].location}</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                    <span key={i} className="text-accent">★</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
