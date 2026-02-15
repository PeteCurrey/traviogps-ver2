import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, MoreHorizontal, Edit, Trash2, Eye, EyeOff } from "lucide-react";
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
import { format } from "date-fns";

type BlogPost = Tables<"blog_posts">;

const defaultPost: Partial<BlogPost> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  featured_image: "",
  is_published: false,
  meta_title: "",
  meta_description: "",
};

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      toast({ title: "Error", description: "Failed to load blog posts", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSave = async () => {
    if (!editingPost?.title) {
      toast({ title: "Error", description: "Title is required", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    const slug = editingPost.slug || generateSlug(editingPost.title);

    try {
      if (editingPost.id) {
        const { error } = await supabase
          .from("blog_posts")
          .update({
            title: editingPost.title,
            slug,
            excerpt: editingPost.excerpt || null,
            content: editingPost.content || null,
            category: editingPost.category || null,
            featured_image: editingPost.featured_image || null,
            is_published: editingPost.is_published ?? false,
            meta_title: editingPost.meta_title || null,
            meta_description: editingPost.meta_description || null,
            published_at: editingPost.is_published ? new Date().toISOString() : null,
          })
          .eq("id", editingPost.id);

        if (error) throw error;
        toast({ title: "Blog post updated" });
      } else {
        const { error } = await supabase.from("blog_posts").insert({
          title: editingPost.title,
          slug,
          excerpt: editingPost.excerpt || null,
          content: editingPost.content || null,
          category: editingPost.category || null,
          featured_image: editingPost.featured_image || null,
          is_published: editingPost.is_published ?? false,
          meta_title: editingPost.meta_title || null,
          meta_description: editingPost.meta_description || null,
          published_at: editingPost.is_published ? new Date().toISOString() : null,
        });

        if (error) throw error;
        toast({ title: "Blog post created" });
      }

      setIsDialogOpen(false);
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast({ title: "Error", description: "Failed to save blog post", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Blog post deleted" });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast({ title: "Error", description: "Failed to delete blog post", variant: "destructive" });
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({
          is_published: !post.is_published,
          published_at: !post.is_published ? new Date().toISOString() : null,
        })
        .eq("id", post.id);

      if (error) throw error;
      toast({ title: post.is_published ? "Post unpublished" : "Post published" });
      fetchPosts();
    } catch (error) {
      console.error("Error toggling publish:", error);
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
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Blog Posts</h1>
          <p className="text-muted-foreground">{posts.length} posts total</p>
        </div>
        <Button
          onClick={() => {
            setEditingPost(defaultPost);
            setIsDialogOpen(true);
          }}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Posts Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No blog posts yet. Create your first post to get started.
                  </td>
                </tr>
              ) : (
                posts.map((post, idx) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="hover:bg-secondary/50"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground truncate max-w-[300px]">{post.title}</p>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground truncate max-w-[300px]">{post.excerpt}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground capitalize hidden md:table-cell">
                      {post.category || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">
                      {format(new Date(post.created_at), "dd MMM yyyy")}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        post.is_published
                          ? "bg-green-500/20 text-green-500"
                          : "bg-muted text-muted-foreground"
                      )}>
                        {post.is_published ? "Published" : "Draft"}
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
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingPost(post);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => togglePublish(post)}>
                            {post.is_published ? (
                              <>
                                <EyeOff className="h-4 w-4 mr-2" />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                Publish
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(post.id)}
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

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {editingPost?.id ? "Edit Blog Post" : "New Blog Post"}
            </DialogTitle>
          </DialogHeader>
          {editingPost && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Title *</label>
                <Input
                  value={editingPost.title || ""}
                  onChange={(e) => setEditingPost({
                    ...editingPost,
                    title: e.target.value,
                    slug: editingPost.id ? editingPost.slug : generateSlug(e.target.value),
                  })}
                  className="bg-secondary border-border"
                  placeholder="Your blog post title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Slug</label>
                  <Input
                    value={editingPost.slug || ""}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    className="bg-secondary border-border"
                    placeholder="url-friendly-slug"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Category</label>
                  <Input
                    value={editingPost.category || ""}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="bg-secondary border-border"
                    placeholder="e.g. Fleet Tips, Industry News"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Excerpt</label>
                <Textarea
                  value={editingPost.excerpt || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  className="bg-secondary border-border"
                  placeholder="A short summary for listings and search results..."
                  rows={2}
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Content</label>
                <Textarea
                  value={editingPost.content || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="bg-secondary border-border min-h-[200px]"
                  placeholder="Write your blog post content here (Markdown supported)..."
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Featured Image URL</label>
                <Input
                  value={editingPost.featured_image || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, featured_image: e.target.value })}
                  className="bg-secondary border-border"
                  placeholder="https://..."
                />
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground mb-3">SEO Settings</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Meta Title</label>
                    <Input
                      value={editingPost.meta_title || ""}
                      onChange={(e) => setEditingPost({ ...editingPost, meta_title: e.target.value })}
                      className="bg-secondary border-border"
                      placeholder="SEO page title (max 60 chars)"
                      maxLength={60}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Meta Description</label>
                    <Textarea
                      value={editingPost.meta_description || ""}
                      onChange={(e) => setEditingPost({ ...editingPost, meta_description: e.target.value })}
                      className="bg-secondary border-border"
                      placeholder="SEO description (max 160 chars)"
                      maxLength={160}
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={editingPost.is_published ?? false}
                  onCheckedChange={(checked) => setEditingPost({ ...editingPost, is_published: checked })}
                />
                <label className="text-sm text-foreground">Publish immediately</label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {isSaving ? "Saving..." : "Save Post"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
