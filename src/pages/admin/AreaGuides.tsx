import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Tables } from "@/integrations/supabase/types";

type AreaGuide = Tables<"area_guides">;

const defaultGuide: Partial<AreaGuide> = {
  name: "",
  slug: "",
  headline: "",
  description: "",
  image: "",
  content: "",
  average_price: null,
  is_published: true,
  display_order: 0,
};

export default function AreaGuides() {
  const [guides, setGuides] = useState<AreaGuide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState<Partial<AreaGuide> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchGuides = async () => {
    try {
      const { data, error } = await supabase
        .from("area_guides")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setGuides(data || []);
    } catch (error) {
      console.error("Error fetching area guides:", error);
      toast({
        title: "Error",
        description: "Failed to load area guides",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };

  const handleSave = async () => {
    if (!editingGuide?.name || !editingGuide?.slug) {
      toast({
        title: "Error",
        description: "Name and slug are required",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      if (editingGuide.id) {
        // Update
        const { error } = await supabase
          .from("area_guides")
          .update({
            name: editingGuide.name,
            slug: editingGuide.slug,
            headline: editingGuide.headline,
            description: editingGuide.description,
            image: editingGuide.image,
            content: editingGuide.content,
            average_price: editingGuide.average_price,
            is_published: editingGuide.is_published,
            display_order: editingGuide.display_order,
          })
          .eq("id", editingGuide.id);

        if (error) throw error;
        toast({ title: "Area guide updated" });
      } else {
        // Create
        const { error } = await supabase.from("area_guides").insert({
          name: editingGuide.name,
          slug: editingGuide.slug,
          headline: editingGuide.headline || null,
          description: editingGuide.description || null,
          image: editingGuide.image || null,
          content: editingGuide.content || null,
          average_price: editingGuide.average_price,
          is_published: editingGuide.is_published ?? true,
          display_order: guides.length,
        });

        if (error) throw error;
        toast({ title: "Area guide created" });
      }

      setIsDialogOpen(false);
      setEditingGuide(null);
      fetchGuides();
    } catch (error) {
      console.error("Error saving area guide:", error);
      toast({
        title: "Error",
        description: "Failed to save area guide",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this area guide?")) return;

    try {
      const { error } = await supabase.from("area_guides").delete().eq("id", id);

      if (error) throw error;

      toast({ title: "Area guide deleted" });
      fetchGuides();
    } catch (error) {
      console.error("Error deleting area guide:", error);
      toast({
        title: "Error",
        description: "Failed to delete area guide",
        variant: "destructive",
      });
    }
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
        <div>
          <h1 className="font-serif text-2xl text-foreground">Area Guides</h1>
          <p className="text-muted-foreground">{guides.length} area guides</p>
        </div>
        <Button
          onClick={() => {
            setEditingGuide(defaultGuide);
            setIsDialogOpen(true);
          }}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Area Guide
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide, idx) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={cn(
              "bg-card border border-border rounded-sm overflow-hidden",
              !guide.is_published && "opacity-60"
            )}
          >
            <div className="aspect-video bg-secondary">
              {guide.image ? (
                <img src={guide.image} alt={guide.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl text-muted-foreground">
                  🏔
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-lg text-foreground">{guide.name}</h3>
                  <p className="text-sm text-muted-foreground">{guide.headline || guide.slug}</p>
                  {guide.average_price && (
                    <p className="text-sm text-accent mt-1">
                      Avg. £{Number(guide.average_price).toLocaleString()}
                    </p>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/areas/${guide.slug}`} target="_blank">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingGuide(guide);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(guide.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {!guide.is_published && (
                <span className="mt-2 inline-block text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  Draft
                </span>
              )}
            </div>
          </motion.div>
        ))}

        {guides.length === 0 && (
          <div className="col-span-full text-center py-12 bg-card border border-border rounded-sm">
            <p className="text-muted-foreground">No area guides yet</p>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {editingGuide?.id ? "Edit Area Guide" : "Add Area Guide"}
            </DialogTitle>
          </DialogHeader>
          {editingGuide && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Name *</label>
                  <Input
                    value={editingGuide.name || ""}
                    onChange={(e) => {
                      const name = e.target.value;
                      setEditingGuide({ 
                        ...editingGuide, 
                        name,
                        slug: editingGuide.id ? editingGuide.slug : generateSlug(name),
                      });
                    }}
                    className="bg-secondary border-border"
                    placeholder="Peak District"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Slug *</label>
                  <Input
                    value={editingGuide.slug || ""}
                    onChange={(e) => setEditingGuide({ ...editingGuide, slug: e.target.value })}
                    className="bg-secondary border-border"
                    placeholder="peak-district"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Headline</label>
                <Input
                  value={editingGuide.headline || ""}
                  onChange={(e) => setEditingGuide({ ...editingGuide, headline: e.target.value })}
                  className="bg-secondary border-border"
                  placeholder="Britain's Original National Park"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Description</label>
                <Textarea
                  value={editingGuide.description || ""}
                  onChange={(e) => setEditingGuide({ ...editingGuide, description: e.target.value })}
                  className="bg-secondary border-border"
                  placeholder="A brief description for listings..."
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Hero Image URL</label>
                <Input
                  value={editingGuide.image || ""}
                  onChange={(e) => setEditingGuide({ ...editingGuide, image: e.target.value })}
                  placeholder="https://..."
                  className="bg-secondary border-border"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Average Price (£)</label>
                <Input
                  type="number"
                  value={editingGuide.average_price || ""}
                  onChange={(e) => setEditingGuide({ ...editingGuide, average_price: e.target.value ? Number(e.target.value) : null })}
                  className="bg-secondary border-border"
                  placeholder="650000"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Content</label>
                <Textarea
                  value={editingGuide.content || ""}
                  onChange={(e) => setEditingGuide({ ...editingGuide, content: e.target.value })}
                  className="bg-secondary border-border min-h-[150px]"
                  placeholder="Detailed content about this area..."
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={editingGuide.is_published ?? true}
                  onCheckedChange={(checked) => setEditingGuide({ ...editingGuide, is_published: checked })}
                />
                <label className="text-sm text-foreground">Published</label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {isSaving ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
