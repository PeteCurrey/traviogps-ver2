import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Home, TrendingUp, ArrowRight, ChevronRight } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { useProperties } from "@/hooks/useProperties";

const areaData: Record<string, {
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  averagePrice: string;
  highlights: string[];
  amenities: string[];
}> = {
  "peak-district": {
    name: "Peak District",
    tagline: "Britain's Original National Park",
    description: "Discover stunning countryside homes in one of Britain's most beautiful national parks",
    longDescription: "The Peak District offers an unparalleled quality of life, with dramatic landscapes, charming villages, and a strong sense of community. From converted barns to grand country houses, properties here offer the perfect escape from city life while remaining well-connected to Sheffield, Manchester, and beyond.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    ],
    averagePrice: "£650,000",
    highlights: [
      "UNESCO Global Geopark",
      "Excellent walking and cycling",
      "Vibrant market towns",
      "Strong rental demand",
      "Outstanding natural beauty",
    ],
    amenities: [
      "Chatsworth House",
      "Bakewell Market",
      "Ladybower Reservoir",
      "Stanage Edge",
      "Buxton Opera House",
    ],
  },
  "sheffield": {
    name: "Sheffield",
    tagline: "The Outdoor City",
    description: "From vibrant city centre living to leafy suburbs and the edge of the countryside",
    longDescription: "Sheffield combines urban energy with unrivalled access to green spaces. From the trendy bars of Kelham Island to the leafy avenues of Ecclesall, Sheffield offers diverse property options. The city's two universities bring vibrancy, while world-class healthcare and a thriving tech scene attract professionals.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    ],
    averagePrice: "£285,000",
    highlights: [
      "UK's greenest city",
      "Thriving food scene",
      "Two universities",
      "Strong rental market",
      "Excellent transport links",
    ],
    amenities: [
      "Meadowhall",
      "Botanical Gardens",
      "Crucible Theatre",
      "Peak District access",
      "Sheffield Hallam",
    ],
  },
  "chesterfield": {
    name: "Chesterfield",
    tagline: "Historic Market Town Charm",
    description: "Historic market town charm with excellent transport links and community spirit",
    longDescription: "Chesterfield offers the perfect blend of historic character and modern convenience. The famous Crooked Spire, bustling market, and pedestrianised town centre create a vibrant hub, while surrounding villages offer rural tranquility. Excellent motorway and rail connections make it popular with commuters.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    ],
    averagePrice: "£245,000",
    highlights: [
      "Famous market",
      "Strong community",
      "Great schools",
      "M1 access",
      "Rail to London",
    ],
    amenities: [
      "Crooked Spire",
      "Chesterfield Market",
      "Queen's Park",
      "Vicar Lane Shopping",
      "Pomegranate Theatre",
    ],
  },
  "nottingham": {
    name: "Nottingham",
    tagline: "A City of Stories",
    description: "Diverse city living from Victorian terraces to contemporary developments",
    longDescription: "Nottingham is a city rich in history and culture, from Robin Hood legends to the world-famous Goose Fair. The property market offers everything from converted lace mill apartments in the Lace Market to grand Victorian villas in The Park. Two universities and a thriving creative sector keep the city young and dynamic.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    ],
    averagePrice: "£275,000",
    highlights: [
      "Rich heritage",
      "Vibrant nightlife",
      "Creative hub",
      "Excellent tram network",
      "Growing tech sector",
    ],
    amenities: [
      "Nottingham Castle",
      "Old Market Square",
      "Wollaton Hall",
      "Theatre Royal",
      "Victoria Centre",
    ],
  },
};

export default function AreaGuide() {
  const { slug } = useParams<{ slug: string }>();
  const area = areaData[slug || ""] || areaData["peak-district"];
  const { properties } = useProperties();
  
  const areaProperties = properties
    .filter(p => p.location.toLowerCase().includes(area.name.toLowerCase().split(" ")[0]))
    .slice(0, 4);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
        <motion.img
          src={area.image}
          alt={area.name}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-premium pb-16 lg:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Area Guide</p>
              <h1 className="font-serif text-display-2 md:text-display-1 text-foreground mb-4">
                {area.name}
              </h1>
              <p className="text-xl text-primary/80 max-w-2xl">{area.tagline}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-accent">
        <div className="container-premium">
          <div className="grid grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Home className="h-6 w-6 mx-auto mb-2 text-accent-foreground" />
              <p className="font-serif text-2xl text-accent-foreground">{areaProperties.length || 48}</p>
              <p className="text-sm text-accent-foreground/70">Properties Available</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-accent-foreground" />
              <p className="font-serif text-2xl text-accent-foreground">{area.averagePrice}</p>
              <p className="text-sm text-accent-foreground/70">Average Price</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <MapPin className="h-6 w-6 mx-auto mb-2 text-accent-foreground" />
              <p className="font-serif text-2xl text-accent-foreground">{area.highlights.length}</p>
              <p className="text-sm text-accent-foreground/70">Key Highlights</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-display-3 text-foreground mb-6">
                Living in <span className="italic-accent">{area.name}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                {area.longDescription}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {area.highlights.map((highlight, idx) => (
                  <motion.div
                    key={highlight}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-foreground">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {area.gallery.map((img, idx) => (
                <motion.div
                  key={idx}
                  className={idx === 0 ? "col-span-2" : ""}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="aspect-[16/9] rounded-sm overflow-hidden">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Local Amenities */}
      <section className="section-padding bg-card">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-display-3 text-foreground">
              Local <span className="italic-accent">Attractions</span>
            </h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {area.amenities.map((amenity, idx) => (
              <motion.span
                key={amenity}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="px-6 py-3 bg-secondary rounded-full text-foreground"
              >
                {amenity}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Properties */}
      {areaProperties.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-premium">
            <div className="flex items-end justify-between mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-display-3 text-foreground">
                  Properties in <span className="italic-accent">{area.name}</span>
                </h2>
              </motion.div>
              <Button asChild variant="outline" className="hidden md:flex">
                <Link to="/sales">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {areaProperties.map((property, idx) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/property/${property.slug}`} className="group block">
                    <div className="aspect-[4/3] rounded-sm overflow-hidden mb-4">
                      <motion.img
                        src={property.images?.[0] || '/placeholder.svg'}
                        alt={property.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    <h3 className="font-serif text-lg text-foreground group-hover:text-accent transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-1">{property.location}</p>
                    <p className="font-medium text-foreground">{property.priceFormatted}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-accent">
        <div className="container-premium text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-display-3 text-accent-foreground mb-6">
              Looking to move to {area.name}?
            </h2>
            <p className="text-accent-foreground/70 mb-8 max-w-xl mx-auto">
              Our local experts know {area.name} inside out. Let us help you find your perfect property.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
                <Link to="/sales">
                  View Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10">
                <Link to="/contact">Speak to an Expert</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
