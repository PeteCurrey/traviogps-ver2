import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Tables } from "@/integrations/supabase/types";

type Property = Tables<"properties">;

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [listingTypeTab, setListingTypeTab] = useState<"sale" | "rent">("sale");
  const { toast } = useToast();

  const fetchProperties = async () => {
    try {
      let query = supabase
        .from("properties")
        .select("*")
        .eq("listing_type", listingTypeTab)
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter as Property["status"]);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast({
        title: "Error",
        description: "Failed to load properties",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [statusFilter, listingTypeTab]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      const { error } = await supabase.from("properties").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Property deleted",
        description: "The property has been removed.",
      });
      fetchProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive",
      });
    }
  };

  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const salesCount = properties.filter(p => p.listing_type === "sale").length;
  const lettingsCount = properties.filter(p => p.listing_type === "rent").length;

  const PropertyTable = ({ items }: { items: Property[] }) => (
    <div className="bg-card border border-border rounded-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Property</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Price</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden lg:table-cell">Beds</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Featured</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No properties found
                </td>
              </tr>
            ) : (
              items.map((property, idx) => (
                <motion.tr
                  key={property.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.02 }}
                  className="hover:bg-secondary/50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-sm bg-secondary overflow-hidden flex-shrink-0">
                        {property.images?.[0] && (
                          <img
                            src={property.images[0]}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate max-w-[200px]">
                          {property.title}
                        </p>
                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {property.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground">{property.price_formatted}</td>
                  <td className="px-4 py-3 text-foreground hidden lg:table-cell">{property.bedrooms}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {property.featured ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">Featured</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full capitalize",
                      property.status === "available" ? "bg-green-500/20 text-green-500" :
                      property.status === "under-offer" ? "bg-orange-500/20 text-orange-500" :
                      property.status === "sold" ? "bg-blue-500/20 text-blue-500" :
                      property.status === "let-agreed" ? "bg-purple-500/20 text-purple-500" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {property.status.replace("-", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/property/${property.slug}`} target="_blank">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/properties/${property.id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(property.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-foreground">Properties</h1>
          <p className="text-muted-foreground">{filteredProperties.length} properties shown</p>
        </div>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link to="/admin/properties/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Link>
        </Button>
      </div>

      {/* Tabs for Sales/Lettings */}
      <Tabs value={listingTypeTab} onValueChange={(v) => setListingTypeTab(v as "sale" | "rent")} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-secondary">
          <TabsTrigger value="sale" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            Sales ({listingTypeTab === "sale" ? filteredProperties.length : "..."})
          </TabsTrigger>
          <TabsTrigger value="rent" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            Lettings ({listingTypeTab === "rent" ? filteredProperties.length : "..."})
          </TabsTrigger>
        </TabsList>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] bg-secondary border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="under-offer">Under Offer</SelectItem>
              {listingTypeTab === "sale" ? (
                <SelectItem value="sold">Sold</SelectItem>
              ) : (
                <SelectItem value="let-agreed">Let Agreed</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="sale" className="mt-4">
          <PropertyTable items={filteredProperties} />
        </TabsContent>

        <TabsContent value="rent" className="mt-4">
          <PropertyTable items={filteredProperties} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
