import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";

const areas = [
  {
    name: "Peak District",
    slug: "peak-district",
    description: "Discover stunning countryside homes in one of Britain's most beautiful national parks",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    properties: 48,
    averagePrice: "£650,000",
  },
  {
    name: "Sheffield",
    slug: "sheffield",
    description: "From vibrant city centre living to leafy suburbs and the edge of the countryside",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop",
    properties: 72,
    averagePrice: "£285,000",
  },
  {
    name: "Chesterfield",
    slug: "chesterfield",
    description: "Historic market town charm with excellent transport links and community spirit",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    properties: 56,
    averagePrice: "£245,000",
  },
  {
    name: "Nottingham",
    slug: "nottingham",
    description: "Diverse city living from Victorian terraces to contemporary developments",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    properties: 64,
    averagePrice: "£275,000",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Areas() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-card">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Explore Our Areas</p>
            <h1 className="font-serif text-display-3 md:text-display-2 text-foreground mb-4">
              Find <span className="italic-accent">your</span> perfect location
            </h1>
            <p className="text-lg text-muted-foreground">
              From the dramatic peaks of the Peak District to the vibrant streets of Sheffield, 
              discover the unique character of each area we serve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {areas.map((area, idx) => (
              <motion.div key={area.slug} variants={itemVariants}>
                <Link
                  to={`/areas/${area.slug}`}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 lg:p-0 rounded-sm lg:rounded-none"
                >
                  <div className={`relative aspect-[16/10] overflow-hidden rounded-sm ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <motion.img
                      src={area.image}
                      alt={area.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className={`lg:p-12 ${idx % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}>
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <span>{area.properties} properties</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span>Avg. {area.averagePrice}</span>
                    </div>
                    <h2 className="font-serif text-display-3 text-foreground mb-4 group-hover:text-accent transition-colors">
                      {area.name}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-6 max-w-md">
                      {area.description}
                    </p>
                    <motion.span
                      className="inline-flex items-center text-accent font-medium"
                      whileHover={{ x: 10 }}
                    >
                      Explore {area.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.span>
                  </div>
                </Link>
                {idx < areas.length - 1 && (
                  <div className="border-b border-border my-8 lg:my-12" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
