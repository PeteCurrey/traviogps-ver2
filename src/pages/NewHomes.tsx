import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Shield, Leaf, Sparkles, MapPin, Star } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useDevelopments, type Development } from "@/hooks/useDevelopments";

const benefits = [
  {
    icon: Sparkles,
    title: "Brand New Finish",
    description: "Move into a home that's never been lived in, with everything pristine and ready for you.",
  },
  {
    icon: Shield,
    title: "Warranty Included",
    description: "New homes come with comprehensive warranties for peace of mind.",
  },
  {
    icon: Leaf,
    title: "Energy Efficient",
    description: "Modern building standards mean lower energy bills and a smaller carbon footprint.",
  },
  {
    icon: Building2,
    title: "Modern Design",
    description: "Contemporary layouts designed for modern living with the latest specifications.",
  },
];

export default function NewHomes() {
  const { data: developments, isLoading } = useDevelopments(true);
  
  // Separate featured and regular developments
  const featuredDevelopments = developments?.filter(d => d.is_featured) || [];
  const regularDevelopments = developments?.filter(d => !d.is_featured) || [];

  const renderDevelopmentCard = (dev: Development, idx: number, isFeatured: boolean = false) => (
    <motion.div
      key={dev.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link to={`/new-homes/${dev.slug}`} className="block h-full">
        <Card className={`overflow-hidden group h-full bg-card border-border/50 hover:border-accent/30 transition-all duration-300 ${isFeatured ? 'ring-2 ring-accent/20' : ''}`}>
          <div className={`relative ${isFeatured ? 'h-80' : 'h-64'} overflow-hidden`}>
            <img
              src={dev.image || "/placeholder.svg"}
              alt={dev.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 flex gap-2">
              {isFeatured && (
                <Badge className="bg-amber-500 text-white">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Featured
                </Badge>
              )}
              <Badge 
                className={`${
                  dev.status === "Now Selling" 
                    ? "bg-accent text-accent-foreground" 
                    : dev.status === "Coming Soon"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {dev.status}
              </Badge>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-xs text-muted-foreground/80 mb-1">{dev.developer}</p>
              <h3 className={`font-serif ${isFeatured ? 'text-2xl' : 'text-xl'} text-foreground`}>{dev.name}</h3>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
              <MapPin className="h-4 w-4 text-accent" />
              {dev.location}
            </div>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {dev.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {dev.features.slice(0, 3).map((feature) => (
                <span 
                  key={feature}
                  className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                >
                  {feature}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div>
                <p className="text-xs text-muted-foreground">{dev.units}</p>
                <p className={`font-serif ${isFeatured ? 'text-xl' : 'text-lg'} text-foreground`}>From {dev.price_from}</p>
              </div>
              <span className="inline-flex items-center text-sm text-accent group-hover:translate-x-1 transition-transform">
                View Development
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-32 lg:pt-40 pb-20 bg-card">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
              New Build Properties
            </p>
            <h1 className="font-serif text-display-3 md:text-display-2 text-foreground mb-4">
              Discover <span className="italic-accent">new</span> homes
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Explore our selection of new build properties across the Peak District, 
              Sheffield, Chesterfield, and Nottingham. Be the first to call it home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* New Developments Section */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Featured Developments</p>
            <h2 className="font-serif text-display-3 text-foreground mb-4">
              New developments we're <span className="italic-accent">working with</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've partnered with the region's finest developers to bring you exclusive access 
              to premium new build homes across the Peak District and surrounding areas.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {/* Featured Developments */}
              {featuredDevelopments.length > 0 && (
                <div className="mb-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredDevelopments.map((dev, idx) => renderDevelopmentCard(dev, idx, true))}
                  </div>
                </div>
              )}

              {/* Regular Developments */}
              {regularDevelopments.length > 0 && (
                <>
                  {featuredDevelopments.length > 0 && (
                    <div className="border-t border-border/50 pt-12 mt-4">
                      <h3 className="font-serif text-2xl text-foreground mb-8">More Developments</h3>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {regularDevelopments.map((dev, idx) => renderDevelopmentCard(dev, idx))}
                  </div>
                </>
              )}

              {featuredDevelopments.length === 0 && regularDevelopments.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No developments available at the moment.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-card">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Why New Homes</p>
            <h2 className="font-serif text-display-3 text-foreground">
              Benefits of <span className="italic-accent">buying</span> new
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center p-8"
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1 }}
                >
                  <benefit.icon className="h-7 w-7 text-accent" />
                </motion.div>
                <h3 className="font-serif text-xl text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-display-3 text-foreground mb-6">
              More developments <span className="italic-accent">coming soon</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              We're continuously expanding our partnerships with leading developers. 
              Register your interest to be the first to know about new developments in your preferred areas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/contact">
                  Register Interest
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/sales">View All Properties</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

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
              Looking for something specific?
            </h2>
            <p className="text-accent-foreground/70 mb-8 max-w-xl mx-auto">
              Let us know your requirements and we'll help you find the perfect new home.
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
