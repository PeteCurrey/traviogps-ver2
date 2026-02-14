import { useState } from "react";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageUpload, MultiImageUpload } from "@/components/admin/ImageUpload";
import {
  useDevelopments,
  useCreateDevelopment,
  useUpdateDevelopment,
  useDeleteDevelopment,
  type Development,
  type DevelopmentInsert,
} from "@/hooks/useDevelopments";

const defaultDevelopment: DevelopmentInsert = {
  slug: "",
  name: "",
  tagline: "",
  location: "",
  developer: "",
  units: "",
  price_from: "",
  status: "Coming Soon",
  description: "",
  image: "",
  features: [],
  hero_image: "",
  gallery_images: [],
  overview: "",
  highlights: [],
  property_types: [],
  amenities: [],
  location_description: "",
  completion_date: "",
  is_published: false,
  is_featured: false,
  display_order: 0,
};

export default function Developments() {
  const { data: developments, isLoading } = useDevelopments(false);
  const createMutation = useCreateDevelopment();
  const updateMutation = useUpdateDevelopment();
  const deleteMutation = useDeleteDevelopment();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDevelopment, setEditingDevelopment] = useState<Development | null>(null);
  const [formData, setFormData] = useState<DevelopmentInsert>(defaultDevelopment);

  const handleOpenDialog = (development?: Development) => {
    if (development) {
      setEditingDevelopment(development);
      setFormData({
        slug: development.slug,
        name: development.name,
        tagline: development.tagline || "",
        location: development.location,
        developer: development.developer,
        units: development.units || "",
        price_from: development.price_from || "",
        status: development.status || "Coming Soon",
        description: development.description || "",
        image: development.image || "",
        features: development.features,
        hero_image: development.hero_image || "",
        gallery_images: development.gallery_images,
        overview: development.overview || "",
        highlights: development.highlights,
        property_types: development.property_types,
        amenities: development.amenities,
        location_description: development.location_description || "",
        completion_date: development.completion_date || "",
        is_published: development.is_published,
        is_featured: development.is_featured,
        display_order: development.display_order,
      });
    } else {
      setEditingDevelopment(null);
      setFormData(defaultDevelopment);
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-generate slug if empty
    const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const dataToSubmit = { ...formData, slug };

    if (editingDevelopment) {
      await updateMutation.mutateAsync({ id: editingDevelopment.id, ...dataToSubmit });
    } else {
      await createMutation.mutateAsync(dataToSubmit);
    }
    setIsDialogOpen(false);
  };

  const handleTogglePublished = async (development: Development) => {
    await updateMutation.mutateAsync({
      id: development.id,
      is_published: !development.is_published,
    });
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">New Developments</h1>
          <p className="text-muted-foreground">Manage new build developments and partnerships</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Development
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingDevelopment ? "Edit Development" : "Add New Development"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (auto-generated if empty)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="the-development-name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={formData.tagline || ""}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Premium living in the Peak District"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    placeholder="Bakewell, Peak District"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="developer">Developer *</Label>
                  <Input
                    id="developer"
                    value={formData.developer}
                    onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                    required
                    placeholder="Heritage Homes"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="units">Units</Label>
                  <Input
                    id="units"
                    value={formData.units || ""}
                    onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                    placeholder="12 luxury homes"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price_from">Price From</Label>
                  <Input
                    id="price_from"
                    value={formData.price_from || ""}
                    onChange={(e) => setFormData({ ...formData, price_from: e.target.value })}
                    placeholder="£595,000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Input
                    id="status"
                    value={formData.status || ""}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    placeholder="Now Selling"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  placeholder="Brief description for listing cards..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="overview">Full Overview</Label>
                <Textarea
                  id="overview"
                  value={formData.overview || ""}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  rows={4}
                  placeholder="Detailed description for the development page..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Card Image</Label>
                  <ImageUpload
                    value={formData.image || ""}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    bucket="development-images"
                    folder="cards"
                    aspectRatio="video"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hero Image</Label>
                  <ImageUpload
                    value={formData.hero_image || ""}
                    onChange={(url) => setFormData({ ...formData, hero_image: url })}
                    bucket="development-images"
                    folder="heroes"
                    aspectRatio="wide"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Gallery Images</Label>
                <MultiImageUpload
                  value={formData.gallery_images}
                  onChange={(urls) => setFormData({ ...formData, gallery_images: urls })}
                  bucket="development-images"
                  folder="gallery"
                  maxImages={12}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Input
                  id="features"
                  value={formData.features.join(", ")}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value.split(",").map((f) => f.trim()).filter(Boolean) })}
                  placeholder="4-5 Bedrooms, Private Gardens, Double Garages"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                <Input
                  id="amenities"
                  value={formData.amenities.join(", ")}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value.split(",").map((a) => a.trim()).filter(Boolean) })}
                  placeholder="Underfloor heating, EV charging, Smart home system"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="completion_date">Completion Date</Label>
                <Input
                  id="completion_date"
                  value={formData.completion_date || ""}
                  onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                  placeholder="Phase 1 complete, Phase 2 Spring 2026"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location_description">Location Description</Label>
                <Textarea
                  id="location_description"
                  value={formData.location_description || ""}
                  onChange={(e) => setFormData({ ...formData, location_description: e.target.value })}
                  rows={3}
                  placeholder="Description of the area and local amenities..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                  <Label htmlFor="is_published">Published</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingDevelopment ? "Update" : "Create"} Development
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Developments</CardTitle>
        </CardHeader>
        <CardContent>
          {developments && developments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Development</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Developer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {developments.map((dev) => (
                  <TableRow key={dev.id}>
                    <TableCell className="text-muted-foreground">{dev.display_order}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {dev.image && (
                          <img
                            src={dev.image}
                            alt={dev.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium">{dev.name}</p>
                          <p className="text-sm text-muted-foreground">{dev.price_from}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{dev.location}</TableCell>
                    <TableCell>{dev.developer}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{dev.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {dev.is_featured && (
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={dev.is_published}
                        onCheckedChange={() => handleTogglePublished(dev)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(dev)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Development</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{dev.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(dev.id)}
                                className="bg-destructive text-destructive-foreground"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No developments yet. Add your first development to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
