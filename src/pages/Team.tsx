import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, Linkedin } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

import heroBanner from "@/assets/hero-banner.webp";

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

export default function Team() {
  const { data: teamMembers = [], isLoading } = useQuery({
    queryKey: ['team-members-public'],
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
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Meet the Dales & Peaks team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Link 
              to="/about" 
              className="text-sm uppercase tracking-[0.3em] text-accent mb-4 inline-block hover:text-accent/80 transition-colors"
            >
              ← About Us
            </Link>
            <h1 className="font-serif text-display-3 md:text-display-2 lg:text-display-1 text-foreground mb-6">
              Meet the <span className="italic-accent">team</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              We're a family-owned business with a passionate team of property experts. 
              Get to know the people behind Dales & Peaks who work tirelessly to help you 
              find your perfect home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, idx) => (
                <div key={idx} className="animate-pulse">
                  <div className="aspect-[3/4] bg-secondary rounded-sm mb-4" />
                  <div className="h-6 bg-secondary rounded w-3/4 mb-2" />
                  <div className="h-4 bg-secondary rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : teamMembers.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
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
                      <div className="w-full h-full flex items-center justify-center text-6xl font-serif text-muted-foreground">
                        {member.full_name[0]}
                      </div>
                    )}
                    {/* Overlay with contact info on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <div className="space-y-2">
                        {member.email && (
                          <a 
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
                          >
                            <Mail className="h-4 w-4" />
                            {member.email}
                          </a>
                        )}
                        {member.phone && (
                          <a 
                            href={`tel:${member.phone}`}
                            className="flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
                          >
                            <Phone className="h-4 w-4" />
                            {member.phone}
                          </a>
                        )}
                        {member.linkedin_url && (
                          <a 
                            href={member.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
                          >
                            <Linkedin className="h-4 w-4" />
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <h3 className="font-serif text-xl text-foreground group-hover:text-accent transition-colors">
                    {member.full_name}
                  </h3>
                  <p className="text-accent text-sm mb-2">{member.job_title}</p>
                  {member.bio && (
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">👥</span>
              </div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                Meet our team soon
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                We're currently updating our team profiles. Check back soon to meet the 
                amazing people behind Dales & Peaks.
              </p>
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Our Values Section */}
      <section className="section-padding bg-card">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">What Drives Us</p>
            <h2 className="font-serif text-display-3 text-foreground mb-6">
              Our <span className="italic-accent">commitment</span> to you
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every member of our team shares the same values and dedication to providing 
              exceptional service. Here's what you can expect when working with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Local Expertise",
                description: "Our team lives and works in the areas we cover. We know every street, every school, and every hidden gem.",
                icon: "🏔️"
              },
              {
                title: "Personal Service",
                description: "You'll work with the same team member throughout your journey. No call centres, no passing you around.",
                icon: "🤝"
              },
              {
                title: "Honest Advice",
                description: "We tell it like it is. If something isn't right for you, we'll say so. Your trust matters more than a quick sale.",
                icon: "💎"
              }
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-background rounded-sm"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-serif text-xl text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="section-padding bg-accent">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-serif text-display-3 text-accent-foreground mb-6">
              Want to join our team?
            </h2>
            <p className="text-accent-foreground/70 mb-8 max-w-xl mx-auto">
              We're always looking for passionate people to join the Dales & Peaks family. 
              If you share our values and love property, we'd love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10">
                <Link to="/about">Learn About Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
