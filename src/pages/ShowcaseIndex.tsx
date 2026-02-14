import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, ArrowRight, MapPin } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface ShowcaseProperty {
  id: string;
  title: string;
  tagline: string | null;
  location: string | null;
  price_formatted: string | null;
  hero_video_url: string | null;
  hero_image_url: string | null;
  virtual_tour_url: string | null;
  slug: string;
  is_featured: boolean;
}

export default function ShowcaseIndex() {
  const [showcases, setShowcases] = useState<ShowcaseProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowcases = async () => {
      try {
        const { data, error } = await supabase
          .from("showcase_properties")
          .select("id, title, tagline, location, price_formatted, hero_video_url, hero_image_url, virtual_tour_url, slug, is_featured")
          .eq("is_published", true)
          .order("display_order", { ascending: true });

        if (error) throw error;
        setShowcases(data || []);
      } catch (error) {
        console.error("Error fetching showcases:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowcases();
  }, []);

  const featuredShowcase = showcases.find(s => s.is_featured);
  const otherShowcases = showcases.filter(s => !s.is_featured);

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-32 lg:pt-40 pb-16 bg-card">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
              Showcase Properties
            </p>
            <h1 className="font-serif text-display-3 md:text-display-2 text-foreground mb-4">
              Immersive <span className="italic-accent">experiences</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Explore our most exceptional properties through cinematic video tours, 
              virtual walkthroughs, and stunning photography.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Showcase */}
      {featuredShowcase && (
        <section className="relative">
          <Link
            to={`/showcase/${featuredShowcase.slug}`}
            className="block relative aspect-[21/9] overflow-hidden group"
            onMouseEnter={() => setHoveredId(featuredShowcase.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Background */}
            {featuredShowcase.hero_video_url ? (
              <video
                src={featuredShowcase.hero_video_url}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={featuredShowcase.hero_image_url || "/placeholder.svg"}
                alt={featuredShowcase.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs uppercase tracking-wider rounded-sm mb-4">
                  Featured
                </span>
                {featuredShowcase.location && (
                  <div className="flex items-center gap-2 text-primary/70 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{featuredShowcase.location}</span>
                  </div>
                )}
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-primary mb-3">
                  {featuredShowcase.title}
                </h2>
                {featuredShowcase.tagline && (
                  <p className="text-lg md:text-xl text-primary/70 italic mb-4">
                    {featuredShowcase.tagline}
                  </p>
                )}
                {featuredShowcase.price_formatted && (
                  <p className="text-2xl text-accent font-medium">
                    {featuredShowcase.price_formatted}
                  </p>
                )}
              </motion.div>

              {/* CTA */}
              <motion.div
                className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
                animate={{
                  scale: hoveredId === featuredShowcase.id ? 1.1 : 1,
                }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent flex items-center justify-center">
                  <Play className="h-6 w-6 md:h-8 md:w-8 text-accent-foreground ml-1" />
                </div>
              </motion.div>
            </div>
          </Link>
        </section>
      )}

      {/* Other Showcases Grid */}
      {otherShowcases.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-premium">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-serif text-display-3 text-foreground">
                More <span className="italic-accent">showcases</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherShowcases.map((showcase, idx) => (
                <motion.div
                  key={showcase.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/showcase/${showcase.slug}`}
                    className="block relative aspect-video overflow-hidden rounded-sm group"
                    onMouseEnter={() => setHoveredId(showcase.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Background */}
                    {showcase.hero_video_url ? (
                      <video
                        src={showcase.hero_video_url}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                      />
                    ) : (
                      <img
                        src={showcase.hero_image_url || "/placeholder.svg"}
                        alt={showcase.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      {showcase.location && (
                        <div className="flex items-center gap-2 text-primary/70 mb-2">
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="text-xs uppercase tracking-wider">{showcase.location}</span>
                        </div>
                      )}
                      <h3 className="font-serif text-2xl md:text-3xl text-primary mb-1">
                        {showcase.title}
                      </h3>
                      {showcase.price_formatted && (
                        <p className="text-accent font-medium">{showcase.price_formatted}</p>
                      )}
                    </div>

                    {/* Play icon */}
                    {showcase.virtual_tour_url && (
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-accent/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-4 w-4 text-accent-foreground ml-0.5" />
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {showcases.length === 0 && (
        <section className="section-padding bg-background">
          <div className="container-premium text-center">
            <Play className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h2 className="font-serif text-2xl text-foreground mb-4">No showcases yet</h2>
            <p className="text-muted-foreground mb-8">
              Immersive property experiences are coming soon.
            </p>
            <Button asChild>
              <Link to="/sales">
                Browse All Properties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
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
              Want to showcase your property?
            </h2>
            <p className="text-accent-foreground/70 mb-8 max-w-xl mx-auto">
              Our premium showcase service creates cinematic experiences that captivate buyers.
            </p>
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
              <Link to="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
