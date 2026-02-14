import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Home, 
  Building2,
  Check,
  Phone,
  Mail
} from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { GalleryLightbox } from "@/components/ui/gallery-lightbox";
import { useDevelopment } from "@/hooks/useDevelopments";
import { DevelopmentEnquiryForm } from "@/components/developments/DevelopmentEnquiryForm";

export default function DevelopmentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: development, isLoading, error } = useDevelopment(slug);

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="pt-32 pb-20">
          <div className="container-premium">
            <Skeleton className="h-[50vh] w-full rounded-lg mb-8" />
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-12 w-96 mb-4" />
            <Skeleton className="h-24 w-full max-w-2xl" />
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (error || !development) {
    return <Navigate to="/new-homes" replace />;
  }

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end">
        <div className="absolute inset-0">
          <img
            src={development.hero_image || development.image || "/placeholder.svg"}
            alt={development.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="container-premium relative z-10 pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/new-homes" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to New Homes
            </Link>
            
            <Badge 
              className={`mb-4 ${
                development.status === "Now Selling" 
                  ? "bg-accent text-accent-foreground" 
                  : development.status === "Coming Soon"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {development.status}
            </Badge>
            
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-2">
              {development.developer}
            </p>
            
            <h1 className="font-serif text-display-2 md:text-display-1 text-foreground mb-4">
              {development.name}
            </h1>
            
            {development.tagline && (
              <p className="text-xl text-muted-foreground mb-6 max-w-2xl">
                {development.tagline}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                {development.location}
              </div>
              {development.units && (
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-accent" />
                  {development.units}
                </div>
              )}
              {development.completion_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  {development.completion_date}
                </div>
              )}
            </div>
            
            {development.price_from && (
              <div className="mt-8">
                <p className="text-sm text-muted-foreground mb-1">Prices from</p>
                <p className="font-serif text-display-3 text-foreground">{development.price_from}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">About The Development</p>
              <h2 className="font-serif text-display-3 text-foreground mb-6">
                A new standard of <span className="italic-accent">living</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {development.overview || development.description}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <GalleryLightbox
                images={development.gallery_images}
                alt={development.name}
                className="grid-cols-2"
                thumbnailClassName="h-48"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      {development.highlights.length > 0 && (
        <section className="section-padding bg-card">
          <div className="container-premium">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Key Features</p>
              <h2 className="font-serif text-display-3 text-foreground">
                What makes this development <span className="italic-accent">special</span>
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {development.highlights.map((highlight, idx) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <Building2 className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3">{highlight.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{highlight.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Property Types Section */}
      {development.property_types.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-premium">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Available Homes</p>
              <h2 className="font-serif text-display-3 text-foreground">
                Choose your <span className="italic-accent">perfect</span> home
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {development.property_types.map((type, idx) => (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-card border-border/50 hover:border-accent/30 transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-serif text-2xl text-foreground">{type.name}</h3>
                          <p className="text-muted-foreground">{type.bedrooms}</p>
                        </div>
                        <Badge variant="outline" className="text-accent border-accent">
                          {type.available} available
                        </Badge>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price from</span>
                          <span className="font-serif text-foreground">{type.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Floor area</span>
                          <span className="text-foreground">{type.sqft} sq ft</span>
                        </div>
                      </div>
                      
                      <Button asChild className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link to="/contact">
                          Request Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Amenities Section */}
      <section className="section-padding bg-card">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16">
            {development.amenities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Specification</p>
                <h2 className="font-serif text-display-3 text-foreground mb-6">
                  Premium <span className="italic-accent">features</span> included
                </h2>
                <p className="text-muted-foreground mb-8">
                  Every home at {development.name} comes with an impressive specification as standard, 
                  reflecting our commitment to quality and attention to detail.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {development.amenities.map((amenity, idx) => (
                    <motion.div
                      key={amenity}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3.5 w-3.5 text-accent" />
                      </div>
                      <span className="text-foreground text-sm">{amenity}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Location</p>
              <h2 className="font-serif text-display-3 text-foreground mb-6">
                The perfect <span className="italic-accent">setting</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {development.location_description || `${development.name} is located in ${development.location}, offering an ideal setting for your new home.`}
              </p>
              
              <div className="mt-8 p-6 bg-background rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span className="font-serif text-lg text-foreground">{development.location}</span>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <a 
                    href={`https://www.google.com/maps/search/${encodeURIComponent(development.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Map
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section className="section-padding bg-background" id="enquiry">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Get In Touch</p>
              <h2 className="font-serif text-display-3 text-foreground mb-6">
                Interested in <span className="italic-accent">{development.name}</span>?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Register your interest today to receive the full brochure, price list, and priority viewing invitations. 
                Our dedicated new homes team is here to guide you through every step of the buying process.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-card rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Call our new homes team</p>
                    <a href="tel:01onal234567" className="font-serif text-lg text-foreground hover:text-accent transition-colors">
                      01onal 234 567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-card rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email us directly</p>
                    <a href="mailto:newhomes@dalesandpeaks.co.uk" className="font-serif text-lg text-foreground hover:text-accent transition-colors">
                      newhomes@dalesandpeaks.co.uk
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <DevelopmentEnquiryForm 
                developmentName={development.name}
                developmentSlug={development.slug}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-accent">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-serif text-display-3 text-accent-foreground mb-4">
              Ready to find your new home?
            </h2>
            <p className="text-accent-foreground/70 mb-8 max-w-xl mx-auto">
              Browse our full collection of new build developments across the Peak District and surrounding areas.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
                <Link to="/new-homes">
                  View All Developments
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10">
                <a href="#enquiry">
                  <Mail className="mr-2 h-5 w-5" />
                  Register Interest
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
