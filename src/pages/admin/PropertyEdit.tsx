import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Upload, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

type Property = Tables<"properties">;

export default function PropertyEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = id === "new";

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [property, setProperty] = useState<Partial<Property>>({
    title: "",
    slug: "",
    price: 0,
    price_formatted: "",
    price_label: null,
    street: "",
    area: "",
    city: "",
    postcode: "",
    location: "",
    bedrooms: 0,
    bathrooms: 0,
    receptions: 0,
    sqft: null,
    property_type: "detached",
    listing_type: "sale",
    status: "available",
    features: [],
    description: "",
    short_description: "",
    images: [],
    epc_rating: null,
    council_tax_band: null,
    tenure: null,
    featured: false,
    virtual_tour_url: null,
    floor_plan: null,
    latitude: null,
    longitude: null,
    available_from: null,
  });

  useEffect(() => {
    if (!isNew && id) {
      fetchProperty();
    }
  }, [id, isNew]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) setProperty(data);
    } catch (error) {
      console.error("Error fetching property:", error);
      toast({
        title: "Error",
        description: "Failed to load property",
        variant: "destructive",
      });
      navigate("/admin/properties");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!property.title || !property.slug || !property.price) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const propertyData = {
        title: property.title,
        slug: property.slug,
        price: property.price,
        price_formatted: property.price_formatted || `£${property.price?.toLocaleString()}`,
        price_label: property.price_label,
        street: property.street || "",
        area: property.area || "",
        city: property.city || "",
        postcode: property.postcode || "",
        location: property.location || `${property.area}, ${property.city}`,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        receptions: property.receptions || 0,
        sqft: property.sqft,
        property_type: property.property_type,
        listing_type: property.listing_type,
        status: property.status,
        features: property.features || [],
        description: property.description,
        short_description: property.short_description,
        images: property.images || [],
        epc_rating: property.epc_rating,
        council_tax_band: property.council_tax_band,
        tenure: property.tenure,
        featured: property.featured || false,
        virtual_tour_url: property.virtual_tour_url,
        floor_plan: property.floor_plan,
        latitude: property.latitude,
        longitude: property.longitude,
        available_from: property.available_from,
      };

      if (isNew) {
        const { error } = await supabase.from("properties").insert(propertyData);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("properties")
          .update(propertyData)
          .eq("id", id);
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: isNew ? "Property created" : "Property updated",
      });
      navigate("/admin/properties");
    } catch (error) {
      console.error("Error saving property:", error);
      toast({
        title: "Error",
        description: "Failed to save property",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: string[] = [...(property.images || [])];

    for (const file of Array.from(files)) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `property-images/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("showcase-media")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        toast({
          title: "Upload Error",
          description: `Failed to upload ${file.name}`,
          variant: "destructive",
        });
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("showcase-media")
        .getPublicUrl(filePath);

      if (urlData?.publicUrl) {
        newImages.push(urlData.publicUrl);
      }
    }

    setProperty({ ...property, images: newImages });
    toast({
      title: "Images Uploaded",
      description: `${files.length} image(s) uploaded successfully`,
    });
  };

  const removeImage = (index: number) => {
    const newImages = [...(property.images || [])];
    newImages.splice(index, 1);
    setProperty({ ...property, images: newImages });
  };

  const updateField = (field: keyof Property, value: any) => {
    setProperty({ ...property, [field]: value });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/properties")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="font-serif text-2xl text-foreground">
              {isNew ? "Add Property" : "Edit Property"}
            </h1>
            <p className="text-muted-foreground">
              {isNew ? "Create a new property listing" : property.title}
            </p>
          </div>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-accent hover:bg-accent/90"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {isSaving ? "Saving..." : "Save Property"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-sm p-6 space-y-4"
          >
            <h2 className="font-medium text-foreground">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={property.title || ""}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="e.g., The Old Vicarage"
                  className="bg-secondary"
                />
              </div>
              
              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={property.slug || ""}
                  onChange={(e) => updateField("slug", e.target.value)}
                  placeholder="e.g., the-old-vicarage-baslow"
                  className="bg-secondary"
                />
              </div>
              
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  value={property.price || ""}
                  onChange={(e) => updateField("price", Number(e.target.value))}
                  placeholder="e.g., 750000"
                  className="bg-secondary"
                />
              </div>

              <div>
                <Label htmlFor="price_formatted">Price Display</Label>
                <Input
                  id="price_formatted"
                  value={property.price_formatted || ""}
                  onChange={(e) => updateField("price_formatted", e.target.value)}
                  placeholder="e.g., £750,000"
                  className="bg-secondary"
                />
              </div>

              <div>
                <Label htmlFor="price_label">Price Label</Label>
                <Input
                  id="price_label"
                  value={property.price_label || ""}
                  onChange={(e) => updateField("price_label", e.target.value)}
                  placeholder="e.g., pcm, POA"
                  className="bg-secondary"
                />
              </div>
            </div>
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-sm p-6 space-y-4"
          >
            <h2 className="font-medium text-foreground">Address</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  value={property.street || ""}
                  onChange={(e) => updateField("street", e.target.value)}
                  placeholder="e.g., Church Lane"
                  className="bg-secondary"
                />
              </div>
              
              <div>
                <Label htmlFor="area">Area</Label>
                <Input
                  id="area"
                  value={property.area || ""}
                  onChange={(e) => updateField("area", e.target.value)}
                  placeholder="e.g., Baslow"
                  className="bg-secondary"
                />
              </div>
              
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={property.city || ""}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="e.g., Peak District"
                  className="bg-secondary"
                />
              </div>

              <div>
                <Label htmlFor="postcode">Postcode</Label>
                <Input
                  id="postcode"
                  value={property.postcode || ""}
                  onChange={(e) => updateField("postcode", e.target.value)}
                  placeholder="e.g., DE45 1RY"
                  className="bg-secondary"
                />
              </div>

              <div>
                <Label htmlFor="location">Display Location</Label>
                <Input
                  id="location"
                  value={property.location || ""}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="e.g., Baslow, Peak District"
                  className="bg-secondary"
                />
              </div>
            </div>
          </motion.div>

          {/* Property Details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-sm p-6 space-y-4"
          >
            <h2 className="font-medium text-foreground">Property Details</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={property.bedrooms || 0}
                  onChange={(e) => updateField("bedrooms", Number(e.target.value))}
                  className="bg-secondary"
                />
              </div>
              
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={property.bathrooms || 0}
                  onChange={(e) => updateField("bathrooms", Number(e.target.value))}
                  className="bg-secondary"
                />
              </div>

              <div>
                <Label htmlFor="receptions">Receptions</Label>
                <Input
                  id="receptions"
                  type="number"
                  value={property.receptions || 0}
                  onChange={(e) => updateField("receptions", Number(e.target.value))}
                  className="bg-secondary"
                />
              </div>

              <div>
                <Label htmlFor="sqft">Sq Ft</Label>
                <Input
                  id="sqft"
                  type="number"
                  value={property.sqft || ""}
                  onChange={(e) => updateField("sqft", e.target.value ? Number(e.target.value) : null)}
                  className="bg-secondary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Property Type</Label>
                <Select
                  value={property.property_type || "detached"}
                  onValueChange={(v) => updateField("property_type", v)}
                >
                  <SelectTrigger className="bg-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="detached">Detached</SelectItem>
                    <SelectItem value="semi-detached">Semi-Detached</SelectItem>
                    <SelectItem value="terraced">Terraced</SelectItem>
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="bungalow">Bungalow</SelectItem>
                    <SelectItem value="cottage">Cottage</SelectItem>
                    <SelectItem value="barn-conversion">Barn Conversion</SelectItem>
                    <SelectItem value="farmhouse">Farmhouse</SelectItem>
                    <SelectItem value="new-build">New Build</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Listing Type</Label>
                <Select
                  value={property.listing_type || "sale"}
                  onValueChange={(v) => updateField("listing_type", v)}
                >
                  <SelectTrigger className="bg-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">To Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Status</Label>
                <Select
                  value={property.status || "available"}
                  onValueChange={(v) => updateField("status", v)}
                >
                  <SelectTrigger className="bg-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="under-offer">Under Offer</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="let-agreed">Let Agreed</SelectItem>
                    <SelectItem value="withdrawn">Withdrawn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-sm p-6 space-y-4"
          >
            <h2 className="font-medium text-foreground">Description</h2>
            
            <div>
              <Label htmlFor="short_description">Short Description</Label>
              <Textarea
                id="short_description"
                value={property.short_description || ""}
                onChange={(e) => updateField("short_description", e.target.value)}
                placeholder="Brief summary for listings..."
                className="bg-secondary h-20"
              />
            </div>

            <div>
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                value={property.description || ""}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Detailed property description..."
                className="bg-secondary h-40"
              />
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-sm p-6 space-y-4"
          >
            <h2 className="font-medium text-foreground">Images</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(property.images || []).map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Property ${index + 1}`}
                    className="w-full h-24 object-cover rounded-sm"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-border rounded-sm cursor-pointer hover:border-accent transition-colors">
                <Upload className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground mt-1">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Additional Details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-sm p-6 space-y-4"
          >
            <h2 className="font-medium text-foreground">Additional Details</h2>
            
            <div className="space-y-4">
              <div>
                <Label>EPC Rating</Label>
                <Select
                  value={property.epc_rating || ""}
                  onValueChange={(v) => updateField("epc_rating", v || null)}
                >
                  <SelectTrigger className="bg-secondary">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                    <SelectItem value="E">E</SelectItem>
                    <SelectItem value="F">F</SelectItem>
                    <SelectItem value="G">G</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="council_tax_band">Council Tax Band</Label>
                <Input
                  id="council_tax_band"
                  value={property.council_tax_band || ""}
                  onChange={(e) => updateField("council_tax_band", e.target.value || null)}
                  placeholder="e.g., D"
                  className="bg-secondary"
                />
              </div>

              <div>
                <Label>Tenure</Label>
                <Select
                  value={property.tenure || ""}
                  onValueChange={(v) => updateField("tenure", v || null)}
                >
                  <SelectTrigger className="bg-secondary">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freehold">Freehold</SelectItem>
                    <SelectItem value="leasehold">Leasehold</SelectItem>
                    <SelectItem value="share-of-freehold">Share of Freehold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="virtual_tour_url">Virtual Tour URL</Label>
                <Input
                  id="virtual_tour_url"
                  value={property.virtual_tour_url || ""}
                  onChange={(e) => updateField("virtual_tour_url", e.target.value || null)}
                  placeholder="https://..."
                  className="bg-secondary"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured Property</Label>
                <Switch
                  id="featured"
                  checked={property.featured || false}
                  onCheckedChange={(checked) => updateField("featured", checked)}
                />
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-sm p-6 space-y-4"
          >
            <h2 className="font-medium text-foreground">Features</h2>
            
            <div>
              <Label htmlFor="features">Features (one per line)</Label>
              <Textarea
                id="features"
                value={(property.features || []).join("\n")}
                onChange={(e) => updateField("features", e.target.value.split("\n").filter(Boolean))}
                placeholder="Period Features&#10;Large Garden&#10;Garage"
                className="bg-secondary h-32"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
