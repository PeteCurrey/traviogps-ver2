import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Home, Heart } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Import real images from the website
import heroBanner from "@/assets/hero-banner.webp";
import aboutImage1 from "@/assets/about-image-1.webp";
import aboutImage2 from "@/assets/about-image-2.webp";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "2,500+", label: "Properties Sold" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "4", label: "Office Locations" },
];

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "We love what we do. Every property has a story, and we're passionate about telling it.",
  },
  {
    icon: Users,
    title: "Personal Service",
    description: "You're not just a number. We provide tailored service that puts your needs first.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from marketing to negotiations.",
  },
  {
    icon: Home,
    title: "Local Expertise",
    description: "Deep knowledge of the Peak District, Sheffield, Chesterfield and Nottingham markets.",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function About() {
  // Fetch team members from database
  const { data: teamMembers = [] } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Premium property in the Peak District"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">About Us</p>
            <h1 className="font-serif text-display-3 md:text-display-2 lg:text-display-1 text-foreground mb-6">
              A new era of <span className="italic-accent">estate agency</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Where standards are high, stress is low, and results are market-leading. 
              We understand that every home has its own story to tell.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-accent">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="font-serif text-display-3 text-accent-foreground mb-2">{stat.value}</p>
                <p className="text-accent-foreground/70 text-sm uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Our Story</p>
              <h2 className="font-serif text-display-3 text-foreground mb-6">
                Family values, <span className="italic-accent">exceptional</span> service
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Our homes are everything; we create memories within them. Bring family to them. 
                  Make friends in the streets around them. As a family-owned business, we understand 
                  the importance of homes, and the memories locked within their walls.
                </p>
                <p>
                  We know how to bring out a property's best features, and how to find buyers 
                  destined to fill the property with the next story. This isn't about us, it's 
                  about you, it's about your home and it's about your home's story.
                </p>
                <p>
                  Gone are the days of mediocre, welcome to a new era of estate agency, 
                  where standards are high, stress is low and results are market leading. 
                  <strong> Your next move could be your forever move.</strong>
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-sm overflow-hidden">
                <img
                  src={aboutImage1}
                  alt="Dales & Peaks office"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-accent/10 rounded-sm -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Your Perfect Move */}
      <section className="section-padding bg-card">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="aspect-[4/5] rounded-sm overflow-hidden">
                <img
                  src={aboutImage2}
                  alt="Beautiful property in the Peak District"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Your Journey</p>
              <h2 className="font-serif text-display-3 text-foreground mb-6">
                Your <span className="italic-accent">Perfect</span> Move
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A home isn't just four walls and we understand there is so much more in the 
                  decision of buying a home than just the house. The location matters, where 
                  your kids can go to school, where you can walk your dogs, the local coffee 
                  shops, the village community.
                </p>
                <p>
                  Discover vibrant local suburbs, tranquil countryside retreats or idyllic 
                  semi-rural villages based on your preference. Explore detailed neighbourhood 
                  profiles, complete with information on schools, parks, shops, restaurants 
                  and other essential amenities.
                </p>
              </div>
              <Button asChild className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/areas">
                  Explore Our Areas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Our Values</p>
            <h2 className="font-serif text-display-3 text-foreground">
              What we <span className="italic-accent">stand</span> for
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="text-center p-8"
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <value.icon className="h-7 w-7 text-accent" />
                </motion.div>
                <h3 className="font-serif text-xl text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team - Dynamic from Database */}
      {teamMembers.length > 0 && (
        <section className="section-padding bg-card">
          <div className="container-premium">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Meet The Team</p>
              <h2 className="font-serif text-display-3 text-foreground">
                The <span className="italic-accent">people</span> behind Dales & Peaks
              </h2>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-4 bg-secondary">
                    {member.image ? (
                      <motion.img
                        src={member.image}
                        alt={member.full_name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl text-muted-foreground">
                        {member.full_name[0]}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground group-hover:text-accent transition-colors">
                    {member.full_name}
                  </h3>
                  <p className="text-accent text-sm mb-2">{member.job_title}</p>
                  {member.bio && (
                    <p className="text-muted-foreground text-sm line-clamp-2">{member.bio}</p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
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
              Ready to work with us?
            </h2>
            <p className="text-accent-foreground/70 mb-8 max-w-xl mx-auto">
              Whether you're selling, buying, or letting, we'd love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
                <Link to="/valuation">
                  Get a Valuation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
