import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <section className="section-padding bg-card">
      <div className="container-premium">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <motion.img
                src="https://ggfx-dalesandpeaks.s3.eu-west-2.amazonaws.com/x.prod/528x535/1_8ba42c10c6.webp"
                alt="Dales and Peaks Estate Agents"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
            {/* Accent element */}
            <motion.div 
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-sm"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-sm uppercase tracking-[0.3em] text-accent mb-4"
            >
              About Dales & Peaks
            </motion.p>
            <h2 className="font-serif text-display-3 md:text-display-2 text-foreground mb-6 leading-tight">
              We understand that every home <span className="italic-accent">has its own story to tell.</span>
            </h2>
            <motion.div 
              className="space-y-4 text-muted-foreground leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p>
                Our homes are everything; we create memories within them. Bring family to them. 
                Make friends in the streets around them. As a family-owned business, we understand 
                the importance of homes, and the memories locked within their walls.
              </p>
              <p>
                A team of truly passionate professionals and expertise in not only showcasing your 
                home, but telling its story. This isn't about us, it's about you, it's about your 
                home and its about your home's story.
              </p>
              <p className="text-foreground font-medium">
                Gone are the days of mediocre, welcome to a new era of estate agency, where standards 
                are high, stress is low and results are market leading. 
                <span className="text-accent"> Your next move could be your forever move.</span>
              </p>
            </motion.div>
            <motion.div 
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link
                to="/about"
                className="group inline-flex items-center text-sm font-medium text-foreground link-underline"
              >
                About Us
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about/team"
                className="group inline-flex items-center text-sm font-medium text-foreground link-underline"
              >
                Our People
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
