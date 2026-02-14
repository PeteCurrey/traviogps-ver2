export interface Property {
  id: string;
  title: string;
  slug: string;
  price: number;
  priceFormatted: string;
  priceLabel?: string; // "To Let", "POA", etc.
  address: {
    street: string;
    area: string;
    city: string;
    postcode: string;
  };
  location: string; // Combined display string
  coordinates?: {
    lat: number;
    lng: number;
  };
  bedrooms: number;
  bathrooms: number;
  receptions: number;
  sqft?: number;
  propertyType: PropertyType;
  listingType: ListingType;
  status: PropertyStatus;
  features: string[];
  description: string;
  shortDescription: string;
  images: string[];
  floorPlan?: string;
  virtualTourUrl?: string;
  epcRating?: EPCRating;
  councilTaxBand?: string;
  tenure?: Tenure;
  availableFrom?: string;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
}

export type PropertyType = 
  | "detached"
  | "semi-detached"
  | "terraced"
  | "flat"
  | "bungalow"
  | "cottage"
  | "barn-conversion"
  | "farmhouse"
  | "new-build"
  | "land"
  | "commercial";

export type ListingType = "sale" | "rent";

export type PropertyStatus = 
  | "available"
  | "under-offer"
  | "sold"
  | "let-agreed"
  | "withdrawn";

export type EPCRating = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export type Tenure = "freehold" | "leasehold" | "share-of-freehold";

export interface PropertyFilters {
  listingType: ListingType;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  propertyTypes?: PropertyType[];
  locations?: string[];
  status?: PropertyStatus[];
  searchQuery?: string;
}

export type SortOption = 
  | "price-asc"
  | "price-desc"
  | "date-newest"
  | "date-oldest"
  | "bedrooms-asc"
  | "bedrooms-desc";

export const propertyTypeLabels: Record<PropertyType, string> = {
  "detached": "Detached",
  "semi-detached": "Semi-Detached",
  "terraced": "Terraced",
  "flat": "Flat / Apartment",
  "bungalow": "Bungalow",
  "cottage": "Cottage",
  "barn-conversion": "Barn Conversion",
  "farmhouse": "Farmhouse",
  "new-build": "New Build",
  "land": "Land",
  "commercial": "Commercial",
};

export const statusLabels: Record<PropertyStatus, string> = {
  "available": "Available",
  "under-offer": "Under Offer",
  "sold": "Sold",
  "let-agreed": "Let Agreed",
  "withdrawn": "Withdrawn",
};

export const locationOptions = [
  "Peak District",
  "Sheffield",
  "Chesterfield",
  "Nottingham",
  "Bakewell",
  "Matlock",
  "Buxton",
  "Dronfield",
  "Hathersage",
];

export const salePriceRanges = [
  { min: 0, max: 250000, label: "Up to £250,000" },
  { min: 250000, max: 500000, label: "£250,000 - £500,000" },
  { min: 500000, max: 750000, label: "£500,000 - £750,000" },
  { min: 750000, max: 1000000, label: "£750,000 - £1,000,000" },
  { min: 1000000, max: 1500000, label: "£1,000,000 - £1,500,000" },
  { min: 1500000, max: undefined, label: "£1,500,000+" },
];

export const rentPriceRanges = [
  { min: 0, max: 750, label: "Up to £750 pcm" },
  { min: 750, max: 1000, label: "£750 - £1,000 pcm" },
  { min: 1000, max: 1500, label: "£1,000 - £1,500 pcm" },
  { min: 1500, max: 2000, label: "£1,500 - £2,000 pcm" },
  { min: 2000, max: 3000, label: "£2,000 - £3,000 pcm" },
  { min: 3000, max: undefined, label: "£3,000+ pcm" },
];

export const bedroomOptions = [
  { value: 1, label: "1+" },
  { value: 2, label: "2+" },
  { value: 3, label: "3+" },
  { value: 4, label: "4+" },
  { value: 5, label: "5+" },
];
