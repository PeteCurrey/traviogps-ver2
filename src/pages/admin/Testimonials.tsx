import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, MoreHorizontal, Edit, Trash2, Star } from "lucide-react";
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

type Testimonial = Tables<"testimonials">;

const defaultTestimonial: Partial<Testimonial> = {
  quote: "",
  author_name: "",
  author_location: "",
  author_image: "",
  rating: 5,
  is_featured: false,
  is_published: true,
  display_order: 0,
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast({
        title: "Error",
        description: "Failed to load testimonials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSave = async () => {
    if (!editingTestimonial?.quote || !editingTestimonial?.author_name) {
      toast({
        title: "Error",
        description: "Quote and author name are required",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      if (editingTestimonial.id) {
        // Update
        const { error } = await supabase
          .from("testimonials")
          .update({
            quote: editingTestimonial.quote,
            author_name: editingTestimonial.author_name,
            author_location: editingTestimonial.author_location,
            author_image: editingTestimonial.author_image,
            rating: editingTestimonial.rating,
            is_featured: editingTestimonial.is_featured,
            is_published: editingTestimonial.is_published,
            display_order: editingTestimonial.display_order,
          })
          .eq("id", editingTestimonial.id);

        if (error) throw error;
        toast({ title: "Testimonial updated" });
      } else {
        // Create
        const { error } = await supabase.from("testimonials").insert({
          quote: editingTestimonial.quote,
          author_name: editingTestimonial.author_name,
          author_location: editingTestimonial.author_location || null,
          author_image: editingTestimonial.author_image || null,
          rating: editingTestimonial.rating ?? 5,
          is_featured: editingTestimonial.is_featured ?? false,
          is_published: editingTestimonial.is_published ?? true,
          display_order: testimonials.length,
        });

        if (error) throw error;
        toast({ title: "Testimonial created" });
      }

      setIsDialogOpen(false);
      setEditingTestimonial(null);
      fetchTestimonials();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to save testimonial",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);

      if (error) throw error;

      toast({ title: "Testimonial deleted" });
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
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
          <h1 className="font-serif text-2xl text-foreground">Testimonials</h1>
          <p className="text-muted-foreground">{testimonials.length} testimonials</p>
        </div>
        <Button
          onClick={() => {
            setEditingTestimonial(defaultTestimonial);
            setIsDialogOpen(true);
          }}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={cn(
              "bg-card border border-border rounded-sm p-6",
              !testimonial.is_published && "opacity-60"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"
                      )}
                    />
                  ))}
                  {testimonial.is_featured && (
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                      Featured
                    </span>
                  )}
                  {!testimonial.is_published && (
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-foreground italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  {testimonial.author_image && (
                    <img
                      src={testimonial.author_image}
                      alt={testimonial.author_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-foreground">{testimonial.author_name}</p>
                    {testimonial.author_location && (
                      <p className="text-sm text-muted-foreground">{testimonial.author_location}</p>
                    )}
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setEditingTestimonial(testimonial);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(testimonial.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        ))}

        {testimonials.length === 0 && (
          <div className="text-center py-12 bg-card border border-border rounded-sm">
            <p className="text-muted-foreground">No testimonials yet</p>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {editingTestimonial?.id ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
          </DialogHeader>
          {editingTestimonial && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Quote *</label>
                <Textarea
                  value={editingTestimonial.quote || ""}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                  className="bg-secondary border-border min-h-[100px]"
                  placeholder="What did they say about you?"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Author Name *</label>
                  <Input
                    value={editingTestimonial.author_name || ""}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, author_name: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Location</label>
                  <Input
                    value={editingTestimonial.author_location || ""}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, author_location: e.target.value })}
                    className="bg-secondary border-border"
                    placeholder="e.g. Sheffield"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Author Image URL</label>
                <Input
                  value={editingTestimonial.author_image || ""}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, author_image: e.target.value })}
                  placeholder="https://..."
                  className="bg-secondary border-border"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setEditingTestimonial({ ...editingTestimonial, rating: num })}
                    >
                      <Star
                        className={cn(
                          "h-6 w-6 cursor-pointer transition-colors",
                          num <= (editingTestimonial.rating || 5) ? "text-yellow-500 fill-yellow-500" : "text-muted"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={editingTestimonial.is_published ?? true}
                    onCheckedChange={(checked) => setEditingTestimonial({ ...editingTestimonial, is_published: checked })}
                  />
                  <label className="text-sm text-foreground">Published</label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={editingTestimonial.is_featured ?? false}
                    onCheckedChange={(checked) => setEditingTestimonial({ ...editingTestimonial, is_featured: checked })}
                  />
                  <label className="text-sm text-foreground">Featured</label>
                </div>
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
