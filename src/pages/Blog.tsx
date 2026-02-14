import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Blog() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="News & Insights"
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
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">News & Insights</p>
            <h1 className="font-serif text-display-3 md:text-display-2 lg:text-display-1 text-foreground mb-6">
              Property <span className="italic-accent">insights</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Stay informed with the latest property news, market updates, and expert advice 
              from the Dales & Peaks team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="animate-pulse">
                  <div className="aspect-[16/10] bg-secondary rounded-sm mb-4" />
                  <div className="h-6 bg-secondary rounded w-3/4 mb-2" />
                  <div className="h-4 bg-secondary rounded w-1/2 mb-4" />
                  <div className="h-4 bg-secondary rounded w-full" />
                  <div className="h-4 bg-secondary rounded w-full mt-2" />
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {posts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Link to={`/blog/${post.slug}`} className="group block">
                    <Card className="h-full bg-card border-border overflow-hidden">
                      {post.featured_image && (
                        <div className="aspect-[16/10] overflow-hidden">
                          <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          {post.published_at && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.published_at)}
                            </span>
                          )}
                          {post.category && (
                            <span className="flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              {post.category}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-accent transition-colors">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}
                        <span className="inline-flex items-center mt-4 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
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
                <span className="text-4xl">📝</span>
              </div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                Coming soon
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                We're working on some great content for you. Check back soon for property news, 
                market insights, and helpful guides.
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

      {/* Newsletter CTA */}
      <section className="py-24 bg-card">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Stay Updated</p>
            <h2 className="font-serif text-display-3 text-foreground mb-6">
              Never miss an <span className="italic-accent">update</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter for the latest property news, market insights, 
              and exclusive content delivered straight to your inbox.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/contact">
                Subscribe Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
