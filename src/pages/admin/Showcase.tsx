import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, MoreHorizontal, Edit, Trash2, Upload, Eye, EyeOff, Video, Image as ImageIcon, Play, X } from "lucide-react";
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

interface ShowcaseProperty {
  id: string;
  title: string;
  tagline: string | null;
  description: string | null;
  location: string | null;
  price_formatted: string | null;
  hero_video_url: string | null;
  hero_image_url: string | null;
  gallery_images: string[];
  virtual_tour_url: string | null;
  virtual_tour_type: string;
  display_order: number;
  is_published: boolean;
  is_featured: boolean;
  slug: string;
  created_at: string;
}

const defaultShowcase: Partial<ShowcaseProperty> = {
  title: "",
  tagline: "",
  description: "",
  location: "",
  price_formatted: "",
  hero_video_url: "",
  hero_image_url: "",
  gallery_images: [],
  virtual_tour_url: "",
  virtual_tour_type: "iframe",
  is_published: false,
  is_featured: false,
  slug: "",
};

export default function Showcase() {
  const [showcases, setShowcases] = useState<ShowcaseProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingShowcase, setEditingShowcase] = useState<Partial<ShowcaseProperty> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchShowcases = async () => {
    try {
      const { data, error } = await supabase
        .from("showcase_properties")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setShowcases(data || []);
    } catch (error) {
      console.error("Error fetching showcases:", error);
      toast({
        title: "Error",
        description: "Failed to load showcase properties",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShowcases();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleImageUpload = async (file: File, type: 'hero' | 'gallery') => {
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('showcase-media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('showcase-media')
        .getPublicUrl(fileName);

      if (type === 'hero') {
        setEditingShowcase(prev => prev ? { ...prev, hero_image_url: publicUrl } : null);
      } else {
        setEditingShowcase(prev => prev ? { 
          ...prev, 
          gallery_images: [...(prev.gallery_images || []), publicUrl] 
        } : null);
      }
      
      toast({ title: "Image uploaded" });
    } catch (error) {
      console.error("Error uploading:", error);
      toast({ title: "Upload failed", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleVideoUpload = async (file: File) => {
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `videos/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('showcase-media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('showcase-media')
        .getPublicUrl(fileName);

      setEditingShowcase(prev => prev ? { ...prev, hero_video_url: publicUrl } : null);
      toast({ title: "Video uploaded" });
    } catch (error) {
      console.error("Error uploading video:", error);
      toast({ title: "Video upload failed", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!editingShowcase?.title) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }

    setIsSaving(true);

    try {
      const slug = editingShowcase.slug || generateSlug(editingShowcase.title);
      
      if (editingShowcase.id) {
        const { error } = await supabase
          .from("showcase_properties")
          .update({
            title: editingShowcase.title,
            tagline: editingShowcase.tagline || null,
            description: editingShowcase.description || null,
            location: editingShowcase.location || null,
            price_formatted: editingShowcase.price_formatted || null,
            hero_video_url: editingShowcase.hero_video_url || null,
            hero_image_url: editingShowcase.hero_image_url || null,
            gallery_images: editingShowcase.gallery_images || [],
            virtual_tour_url: editingShowcase.virtual_tour_url || null,
            virtual_tour_type: editingShowcase.virtual_tour_type || 'iframe',
            is_published: editingShowcase.is_published ?? false,
            is_featured: editingShowcase.is_featured ?? false,
            slug,
          })
          .eq("id", editingShowcase.id);

        if (error) throw error;
        toast({ title: "Showcase updated" });
      } else {
        const { error } = await supabase.from("showcase_properties").insert({
          title: editingShowcase.title,
          tagline: editingShowcase.tagline || null,
          description: editingShowcase.description || null,
          location: editingShowcase.location || null,
          price_formatted: editingShowcase.price_formatted || null,
          hero_video_url: editingShowcase.hero_video_url || null,
          hero_image_url: editingShowcase.hero_image_url || null,
          gallery_images: editingShowcase.gallery_images || [],
          virtual_tour_url: editingShowcase.virtual_tour_url || null,
          virtual_tour_type: editingShowcase.virtual_tour_type || 'iframe',
          is_published: editingShowcase.is_published ?? false,
          is_featured: editingShowcase.is_featured ?? false,
          slug,
          display_order: showcases.length,
        });

        if (error) throw error;
        toast({ title: "Showcase created" });
      }

      setIsDialogOpen(false);
      setEditingShowcase(null);
      fetchShowcases();
    } catch (error) {
      console.error("Error saving:", error);
      toast({ title: "Failed to save", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this showcase property?")) return;

    try {
      const { error } = await supabase.from("showcase_properties").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Showcase deleted" });
      fetchShowcases();
    } catch (error) {
      console.error("Error deleting:", error);
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  };

  const removeGalleryImage = (index: number) => {
    setEditingShowcase(prev => prev ? {
      ...prev,
      gallery_images: prev.gallery_images?.filter((_, i) => i !== index) || []
    } : null);
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
          <h1 className="font-serif text-2xl text-foreground">Showcase Properties</h1>
          <p className="text-muted-foreground">Immersive cinematic property experiences</p>
        </div>
        <Button
          onClick={() => {
            setEditingShowcase(defaultShowcase);
            setIsDialogOpen(true);
          }}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Showcase
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showcases.map((showcase, idx) => (
          <motion.div
            key={showcase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={cn(
              "bg-card border border-border rounded-sm overflow-hidden group",
              !showcase.is_published && "opacity-60"
            )}
          >
            <div className="aspect-video bg-secondary relative">
              {showcase.hero_video_url ? (
                <video 
                  src={showcase.hero_video_url} 
                  className="w-full h-full object-cover"
                  muted
                  loop
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                />
              ) : showcase.hero_image_url ? (
                <img src={showcase.hero_image_url} alt={showcase.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Video className="h-12 w-12" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs uppercase tracking-wider text-primary/70">{showcase.location}</span>
                {showcase.virtual_tour_url && (
                  <span className="flex items-center gap-1 text-xs text-accent">
                    <Play className="h-3 w-3" /> Virtual Tour
                  </span>
                )}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-lg text-foreground">{showcase.title}</h3>
                  {showcase.tagline && (
                    <p className="text-sm text-muted-foreground italic">{showcase.tagline}</p>
                  )}
                  {showcase.price_formatted && (
                    <p className="text-accent font-medium mt-1">{showcase.price_formatted}</p>
                  )}
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
                        setEditingShowcase(showcase);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => window.open(`/showcase/${showcase.slug}`, '_blank')}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(showcase.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2 mt-3">
                {showcase.is_published ? (
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">Published</span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">Draft</span>
                )}
                {showcase.is_featured && (
                  <span className="text-xs px-2 py-1 rounded-full bg-gold/20 text-gold">Featured</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showcases.length === 0 && (
        <div className="text-center py-12">
          <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-serif text-lg text-foreground mb-2">No showcases yet</h3>
          <p className="text-muted-foreground mb-4">Create immersive property experiences</p>
          <Button
            onClick={() => {
              setEditingShowcase(defaultShowcase);
              setIsDialogOpen(true);
            }}
            className="bg-accent hover:bg-accent/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create First Showcase
          </Button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {editingShowcase?.id ? "Edit Showcase" : "Create Showcase"}
            </DialogTitle>
          </DialogHeader>
          {editingShowcase && (
            <div className="space-y-6">
              {/* Hero Media */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Hero Media</label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Video */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Video (auto-plays)</p>
                    <div className="aspect-video bg-secondary rounded-sm overflow-hidden relative">
                      {editingShowcase.hero_video_url ? (
                        <div className="relative w-full h-full group">
                          <video src={editingShowcase.hero_video_url} className="w-full h-full object-cover" muted loop autoPlay />
                          <button
                            onClick={() => setEditingShowcase({ ...editingShowcase, hero_video_url: "" })}
                            className="absolute top-2 right-2 p-1 bg-destructive rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3 text-white" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                          <Video className="h-8 w-8 mb-2" />
                          <span className="text-xs">No video</span>
                        </div>
                      )}
                    </div>
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleVideoUpload(file);
                      }}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => videoInputRef.current?.click()}
                      disabled={isUploading}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Video
                    </Button>
                    <Input
                      value={editingShowcase.hero_video_url || ""}
                      onChange={(e) => setEditingShowcase({ ...editingShowcase, hero_video_url: e.target.value })}
                      placeholder="Or paste video URL..."
                      className="bg-secondary border-border text-xs"
                    />
                  </div>

                  {/* Image */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Fallback Image</p>
                    <div className="aspect-video bg-secondary rounded-sm overflow-hidden relative">
                      {editingShowcase.hero_image_url ? (
                        <div className="relative w-full h-full group">
                          <img src={editingShowcase.hero_image_url} alt="Hero" className="w-full h-full object-cover" />
                          <button
                            onClick={() => setEditingShowcase({ ...editingShowcase, hero_image_url: "" })}
                            className="absolute top-2 right-2 p-1 bg-destructive rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3 text-white" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                          <ImageIcon className="h-8 w-8 mb-2" />
                          <span className="text-xs">No image</span>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, 'hero');
                      }}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm text-muted-foreground mb-2 block">Title *</label>
                  <Input
                    value={editingShowcase.title || ""}
                    onChange={(e) => setEditingShowcase({ ...editingShowcase, title: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-muted-foreground mb-2 block">Tagline</label>
                  <Input
                    value={editingShowcase.tagline || ""}
                    onChange={(e) => setEditingShowcase({ ...editingShowcase, tagline: e.target.value })}
                    placeholder="A compelling one-liner..."
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Location</label>
                  <Input
                    value={editingShowcase.location || ""}
                    onChange={(e) => setEditingShowcase({ ...editingShowcase, location: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Price</label>
                  <Input
                    value={editingShowcase.price_formatted || ""}
                    onChange={(e) => setEditingShowcase({ ...editingShowcase, price_formatted: e.target.value })}
                    placeholder="£1,500,000"
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Description</label>
                <Textarea
                  value={editingShowcase.description || ""}
                  onChange={(e) => setEditingShowcase({ ...editingShowcase, description: e.target.value })}
                  className="bg-secondary border-border min-h-[100px]"
                  placeholder="Describe the property experience..."
                />
              </div>

              {/* Virtual Tour */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Virtual Tour URL</label>
                <Input
                  value={editingShowcase.virtual_tour_url || ""}
                  onChange={(e) => setEditingShowcase({ ...editingShowcase, virtual_tour_url: e.target.value })}
                  placeholder="Matterport, 360 tour, or video URL..."
                  className="bg-secondary border-border"
                />
                <p className="text-xs text-muted-foreground mt-1">Supports Matterport, iGuide, or any embeddable tour</p>
              </div>

              {/* Gallery */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Gallery Images</label>
                <div className="grid grid-cols-4 gap-2">
                  {editingShowcase.gallery_images?.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-sm overflow-hidden group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeGalleryImage(i)}
                        className="absolute top-1 right-1 p-1 bg-destructive rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) handleImageUpload(file, 'gallery');
                      };
                      input.click();
                    }}
                    className="aspect-square border-2 border-dashed border-border rounded-sm flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                  >
                    <Plus className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={editingShowcase.is_published ?? false}
                    onCheckedChange={(checked) => setEditingShowcase({ ...editingShowcase, is_published: checked })}
                  />
                  <label className="text-sm text-foreground">Published</label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={editingShowcase.is_featured ?? false}
                    onCheckedChange={(checked) => setEditingShowcase({ ...editingShowcase, is_featured: checked })}
                  />
                  <label className="text-sm text-foreground">Featured</label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving} className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                  {isSaving ? "Saving..." : "Save Showcase"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
