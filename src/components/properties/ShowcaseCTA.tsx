import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShowcaseCTAProps {
  showcaseSlug: string;
  tagline?: string | null;
  heroImage?: string | null;
  variant?: "inline" | "hero" | "sidebar";
}

export function ShowcaseCTA({ 
  showcaseSlug, 
  tagline, 
  heroImage,
  variant = "inline" 
}: ShowcaseCTAProps) {
  if (variant === "sidebar") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gradient-to-br from-accent/20 via-card to-card border border-accent/30 rounded-sm p-6 mb-6 overflow-hidden relative"
      >
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-xs uppercase tracking-wider text-accent font-medium">
              Cinematic Experience
            </span>
          </div>
          
          <h3 className="font-serif text-xl text-foreground mb-2">
            Explore this property
          </h3>
          
          {tagline && (
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {tagline}
            </p>
          )}
          
          <Button asChild className="w-full btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link to={`/showcase/${showcaseSlug}`}>
              <Play className="mr-2 h-4 w-4" />
              View Cinematic Tour
            </Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  if (variant === "hero") {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative group cursor-pointer"
      >
        <Link to={`/showcase/${showcaseSlug}`}>
          <div className="relative aspect-video rounded-sm overflow-hidden">
            {heroImage ? (
              <img 
                src={heroImage} 
                alt="Cinematic Tour" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-card to-secondary" />
            )}
            
            <div className="absolute inset-0 bg-background/40 group-hover:bg-background/30 transition-colors" />
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-20 h-20 rounded-full bg-accent/90 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <Play className="h-8 w-8 text-accent-foreground ml-1" fill="currentColor" />
              </motion.div>
            </div>
            
            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-xs uppercase tracking-wider text-accent">
                  Cinematic Experience
                </span>
              </div>
              <p className="font-serif text-lg text-foreground">
                {tagline || "Take a cinematic tour of this property"}
              </p>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Inline variant (default)
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Link 
        to={`/showcase/${showcaseSlug}`}
        className="group flex items-center gap-4 p-4 bg-gradient-to-r from-accent/10 to-transparent border border-accent/20 rounded-sm hover:border-accent/40 transition-all"
      >
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
          <Play className="h-5 w-5 text-accent ml-0.5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs uppercase tracking-wider text-accent">
              Cinematic Experience Available
            </span>
          </div>
          <p className="text-sm text-foreground group-hover:text-accent transition-colors">
            {tagline || "Take an immersive cinematic tour of this property"}
          </p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
      </Link>
    </motion.div>
  );
}
