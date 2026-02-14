import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Dales and Peaks have sold our house very professionally. Always keeping you updated on everything. They go above and beyond to get you sorted.",
    author: "Joanne Johnson",
    location: "Chesterfield",
    rating: 5
  },
  {
    id: 2,
    quote: "From the initial valuation to completion, the team were exceptional. Their local knowledge and marketing was outstanding. Highly recommended.",
    author: "Michael & Sarah Thompson",
    location: "Sheffield",
    rating: 5
  },
  {
    id: 3,
    quote: "We found our dream home in the Peak District through Dales and Peaks. Their expertise in the area was invaluable and they made the process seamless.",
    author: "The Harrison Family",
    location: "Bakewell",
    rating: 5
  },
  {
    id: 4,
    quote: "Excellent service from start to finish. The photography and marketing of our property was superb and resulted in a quick sale at full asking price.",
    author: "David Chambers",
    location: "Nottingham",
    rating: 5
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Background accent */}
      <motion.div 
        className="absolute top-0 right-0 w-1/2 h-full bg-secondary/30 -skew-x-12 translate-x-1/4"
        initial={{ x: "100%", opacity: 0 }}
        whileInView={{ x: "25%", opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
      />
      
      <div className="container-premium relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-sm uppercase tracking-[0.3em] text-accent mb-4"
            >
              Testimonials
            </motion.p>
            <h2 className="font-serif text-display-3 text-foreground mb-6">
              What our <span className="italic-accent">clients</span> say
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              We're proud of the relationships we build with our clients. 
              Here's what some of them have to say about their experience with Dales & Peaks.
            </p>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:border-accent hover:text-accent transition-colors duration-300"
                aria-label="Previous testimonial"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button
                onClick={next}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:border-accent hover:text-accent transition-colors duration-300"
                aria-label="Next testimonial"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
              <span className="text-sm text-muted-foreground ml-4">
                {currentIndex + 1} / {testimonials.length}
              </span>
            </div>
          </motion.div>

          {/* Testimonial card */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-background p-8 md:p-10 rounded-sm shadow-elevated"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Quote className="h-10 w-10 text-accent/30 mb-6" />
                </motion.div>
                <blockquote className="font-serif text-xl md:text-2xl text-foreground leading-relaxed mb-6">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="font-serif text-lg text-foreground">
                      {testimonials[currentIndex].author.charAt(0)}
                    </span>
                  </motion.div>
                  <div>
                    <p className="font-medium text-foreground">
                      {testimonials[currentIndex].author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].location}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mt-4">
                  {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                    <motion.span 
                      key={i} 
                      className="text-accent"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                    >
                      ★
                    </motion.span>
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
