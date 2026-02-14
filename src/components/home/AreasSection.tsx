import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const areas = [
  {
    name: "Peak District",
    description: "Discover stunning countryside homes in one of Britain's most beautiful national parks",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    href: "/areas/peak-district",
    properties: 48
  },
  {
    name: "Sheffield",
    description: "From vibrant city centre living to leafy suburbs and the edge of the countryside",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop",
    href: "/areas/sheffield",
    properties: 72
  },
  {
    name: "Chesterfield",
    description: "Historic market town charm with excellent transport links and community spirit",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    href: "/areas/chesterfield",
    properties: 56
  },
  {
    name: "Nottingham",
    description: "Diverse city living from Victorian terraces to contemporary developments",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    href: "/areas/nottingham",
    properties: 64
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function AreasSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Image with Dark Green Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
          alt="Peak District landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[hsl(var(--accent))]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40" />
      </div>

      <div className="container-premium relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.3em] text-primary/80 mb-3"
          >
            Explore Our Areas
          </motion.p>
          <h2 className="font-serif text-display-3 md:text-display-2 text-primary mb-4">
            Find <span className="italic-accent">your</span> perfect location
          </h2>
          <p className="text-primary/70 max-w-2xl mx-auto text-lg">
            A home isn't just four walls. The location matters - where your kids can go to school, 
            where you can walk your dogs, the local coffee shops, the village community.
          </p>
        </motion.div>

        {/* Areas Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {areas.map((area, index) => (
            <motion.div
              key={area.name}
              variants={itemVariants}
            >
              <Link
                to={area.href}
                className="group block relative aspect-[16/9] overflow-hidden rounded-sm"
              >
                <motion.img
                  src={area.image}
                  alt={area.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Hover glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-accent/10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <motion.span 
                    className="text-xs uppercase tracking-[0.2em] text-accent mb-2"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {area.properties} Properties
                  </motion.span>
                  <h3 className="font-serif text-2xl md:text-3xl text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                    {area.name}
                  </h3>
                  <p className="text-sm text-foreground/70 max-w-md mb-4 group-hover:text-foreground/90 transition-colors duration-300">
                    {area.description}
                  </p>
                  <motion.span 
                    className="inline-flex items-center text-sm font-medium text-accent"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    Explore area
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </motion.span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
