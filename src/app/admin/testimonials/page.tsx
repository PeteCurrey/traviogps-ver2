"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, MoreHorizontal, Edit, Trash2, Star, Quote, MessageSquare, Check, X } from "lucide-react";
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

export default function TestimonialsAdminPage() {
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
        title: "Fetch Error",
        description: "Failed to load testimonials from database",
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
        title: "Validation Error",
        description: "Testimonial quote and author name are required",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const testimonialData = {
        quote: editingTestimonial.quote,
        author_name: editingTestimonial.author_name,
        author_location: editingTestimonial.author_location || null,
        author_image: editingTestimonial.author_image || null,
        rating: editingTestimonial.rating ?? 5,
        is_featured: editingTestimonial.is_featured ?? false,
        is_published: editingTestimonial.is_published ?? true,
        display_order: editingTestimonial.display_order ?? testimonials.length,
      };

      if (editingTestimonial.id) {
        const { error } = await supabase
          .from("testimonials")
          .update(testimonialData)
          .eq("id", editingTestimonial.id);

        if (error) throw error;
        toast({ title: "Feedback Synchronized", description: "Changes are now live in production" });
      } else {
        const { error } = await supabase.from("testimonials").insert(testimonialData);

        if (error) throw error;
        toast({ title: "Record Created", description: "New testimonial added to database" });
      }

      setIsDialogOpen(false);
      setEditingTestimonial(null);
      fetchTestimonials();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      toast({
        title: "Persistence Error",
        description: "Failed to write record to database",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you certain you want to permanently remove this feedback? This action cannot be reversed.")) return;

    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Record Excised", description: "The testimonial has been removed from all systems" });
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast({
        title: "Deletion Failed",
        description: "The record remains in the database",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header Segment */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center shadow-sm">
            <MessageSquare className="h-7 w-7 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Social Validation</h1>
            <p className="text-muted-foreground font-medium">Manage customer feedback and featured industry partnerships</p>
          </div>
        </div>
        <Button
          onClick={() => {
            setEditingTestimonial(defaultTestimonial);
            setIsDialogOpen(true);
          }}
          className="h-14 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg rounded-xl shadow-glow"
        >
          <Plus className="h-5 w-5 mr-3" />
          Register Feedback
        </Button>
      </div>

      {/* Narrative List */}
      <div className="grid grid-cols-1 gap-6">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className={cn(
              "group relative bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-glow transition-all duration-300",
              !testimonial.is_published && "opacity-60 grayscale-[0.5]"
            )}
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4 transition-colors",
                          i < testimonial.rating ? "text-yellow-500 fill-yellow-500 shadow-glow" : "text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {testimonial.is_featured && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-accent text-accent-foreground shadow-sm">
                        Featured Highlight
                      </span>
                    )}
                    {!testimonial.is_published && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-muted text-muted-foreground border">
                        Draft Status
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="relative mb-8">
                  <Quote className="absolute -left-4 -top-4 h-12 w-12 text-accent/5 -z-10" />
                  <p className="text-xl font-medium text-foreground leading-relaxed italic" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary border-2 border-accent/20">
                    {testimonial.author_image ? (
                      <img
                        src={testimonial.author_image}
                        alt={testimonial.author_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-accent">
                        {testimonial.author_name[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg">{testimonial.author_name}</p>
                    {testimonial.author_location && (
                      <p className="text-sm font-bold text-accent uppercase tracking-widest">{testimonial.author_location}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 p-2">
                  <DropdownMenuItem
                    className="rounded-lg py-3 cursor-pointer"
                    onClick={() => {
                      setEditingTestimonial(testimonial);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-3 text-accent" />
                    Modify Entry
                  </DropdownMenuItem>
                  <div className="h-px bg-border my-2" />
                  <DropdownMenuItem
                    onClick={() => handleDelete(testimonial.id)}
                    className="rounded-lg py-3 cursor-pointer text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-3" />
                    Excise Record
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        ))}

        {testimonials.length === 0 && (
          <div className="bg-secondary/20 border border-dashed border-border rounded-2xl py-24 text-center">
            <Quote className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Void of validation</h3>
            <p className="text-muted-foreground max-w-sm mx-auto mb-8 font-medium">Add your first industry endorsement to populate the global social proof platform.</p>
            <Button
              onClick={() => {
                setEditingTestimonial(defaultTestimonial);
                setIsDialogOpen(true);
              }}
              className="h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 rounded-xl"
            >
              <Plus className="h-4 w-4 mr-2" />
              Initialize Feedback
            </Button>
          </div>
        )}
      </div>

      {/* Editor Surface */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl shadow-2xl">
          <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border p-6 flex items-center justify-between">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {editingTestimonial?.id ? "Modify Feedback Record" : "Initialize Social Validation"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={editingTestimonial?.is_published ?? true}
                  onCheckedChange={(checked) => setEditingTestimonial(prev => prev ? { ...prev, is_published: checked } : null)}
                />
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest hidden sm:block">Publish</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={editingTestimonial?.is_featured ?? false}
                  onCheckedChange={(checked) => setEditingTestimonial(prev => prev ? { ...prev, is_featured: checked } : null)}
                />
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest hidden sm:block">Feature</label>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Verbatim Quote *</label>
              <Textarea
                value={editingTestimonial?.quote || ""}
                onChange={(e) => setEditingTestimonial(prev => prev ? { ...prev, quote: e.target.value } : null)}
                className="bg-background border-border min-h-[160px] p-6 resize-none focus:ring-accent leading-relaxed italic text-lg font-medium"
                placeholder="Transcribe the professional endorsement exactly..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Author Nomenclature *</label>
                <Input
                  value={editingTestimonial?.author_name || ""}
                  onChange={(e) => setEditingTestimonial(prev => prev ? { ...prev, author_name: e.target.value } : null)}
                  className="bg-background border-border h-12 font-bold focus:ring-accent"
                  placeholder="e.g. Richard Branson"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Geographical Cluster</label>
                <Input
                  value={editingTestimonial?.author_location || ""}
                  onChange={(e) => setEditingTestimonial(prev => prev ? { ...prev, author_location: e.target.value } : null)}
                  className="bg-background border-border h-12 font-bold focus:ring-accent"
                  placeholder="e.g. London HQ"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Author Visual Asset (URL)</label>
              <Input
                value={editingTestimonial?.author_image || ""}
                onChange={(e) => setEditingTestimonial(prev => prev ? { ...prev, author_image: e.target.value } : null)}
                placeholder="https://content.travio.com/id..."
                className="bg-background border-border h-12 focus:ring-accent font-mono text-xs"
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Trust Metric (Star Rating)</label>
              <div className="flex gap-4 p-4 bg-secondary/30 rounded-2xl border border-border/50 justify-center">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setEditingTestimonial(prev => prev ? { ...prev, rating: num } : null)}
                    className="group"
                  >
                    <Star
                      className={cn(
                        "h-10 w-10 cursor-pointer transition-all duration-300 transform group-hover:scale-125",
                        num <= (editingTestimonial?.rating || 5) ? "text-yellow-500 fill-yellow-500 shadow-glow" : "text-muted"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-8 border-t border-border shadow-[0_-20px_20px_-10px_rgba(0,0,0,0.05)]">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="h-14 flex-1 font-bold text-lg rounded-xl border-2">
                Discard Changes
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="h-14 flex-[2] bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg rounded-xl shadow-glow"
              >
                {isSaving ? "Synchronizing Record..." : "Confirm & Commit Feedback"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
