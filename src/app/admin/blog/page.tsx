"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, MoreHorizontal, Edit, Trash2, Eye, EyeOff, FileText, Globe, Search, ArrowRight } from "lucide-react";
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

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
      toast({ title: "Fetch failed", description: "Could not retrieve blog entries", variant: "destructive" });
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
      toast({ title: "Validation Error", description: "Post title is a required field", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    const slug = editingPost.slug || generateSlug(editingPost.title);

    try {
      const postData = {
        title: editingPost.title,
        slug,
        excerpt: editingPost.excerpt || null,
        content: editingPost.content || null,
        category: editingPost.category || null,
        featured_image: editingPost.featured_image || null,
        is_published: editingPost.is_published ?? false,
        meta_title: editingPost.meta_title || null,
        meta_description: editingPost.meta_description || null,
        published_at: editingPost.is_published ? new Date().toISOString() : (editingPost.published_at || null),
      };

      if (editingPost.id) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", editingPost.id);

        if (error) throw error;
        toast({ title: "Post Synchronized", description: "Changes have been saved to production" });
      } else {
        const { error } = await supabase.from("blog_posts").insert(postData);

        if (error) throw error;
        toast({ title: "Entry Created", description: "New blog post is now available in database" });
      }

      setIsDialogOpen(false);
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast({ title: "Persistence Error", description: "Failed to write changes to database", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you certain you want to permanently remove this post? This action cannot be reversed.")) return;

    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Record Excised", description: "The blog post has been removed from all systems" });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast({ title: "Deletion Failed", description: "The record remains in the database", variant: "destructive" });
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({
          is_published: !post.is_published,
          published_at: !post.is_published ? new Date().toISOString() : post.published_at,
        })
        .eq("id", post.id);

      if (error) throw error;
      toast({ 
        title: post.is_published ? "Status: Draft" : "Status: Published",
        description: post.is_published ? "Entry removed from public view" : "Entry is now live and public"
      });
      fetchPosts();
    } catch (error) {
      console.error("Error toggling publish:", error);
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (post.category?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Hub */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center shadow-sm">
            <FileText className="h-7 w-7 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Editorial Management</h1>
            <p className="text-muted-foreground font-medium">Curate and publish industry-leading insights across your network</p>
          </div>
        </div>
        <Button
          onClick={() => {
            setEditingPost(defaultPost);
            setIsDialogOpen(true);
          }}
          className="h-14 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg rounded-xl shadow-glow"
        >
          <Plus className="h-5 w-5 mr-3" />
          Compose Entry
        </Button>
      </div>

      {/* Filter Surface */}
      <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search entries by title or internal category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-background border-border h-12 focus:ring-accent font-medium"
          />
        </div>
      </div>

      {/* Narrative Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Publication Detail</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Thematic Category</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Creation Node</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Visibility</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">No narratives found</h3>
                    <p className="text-muted-foreground max-w-xs mx-auto">Create your first entry to populate this editorial dashboard.</p>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post, idx) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="hover:bg-secondary/30 group transition-colors"
                  >
                    <td className="px-6 py-4 min-w-[300px]">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground group-hover:text-accent transition-colors truncate">
                          {post.title}
                        </span>
                        {post.slug && (
                          <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            /{post.slug}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground capitalize hidden md:table-cell font-bold">
                      {post.category ? (
                        <span className="px-3 py-1 bg-accent/5 border border-accent/10 rounded-lg text-accent text-[10px]">
                          {post.category.toUpperCase()}
                        </span>
                      ) : "Uncategorized"}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-sm hidden lg:table-cell font-medium">
                      {format(new Date(post.created_at), "dd MMM yyyy")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                        post.is_published
                          ? "bg-green-500/10 text-green-500 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]"
                          : "bg-muted text-muted-foreground border-border"
                      )}>
                        {post.is_published ? "Published" : "Draft Status"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 p-2">
                          <DropdownMenuItem
                            className="rounded-lg py-3 cursor-pointer"
                            onClick={() => {
                              setEditingPost(post);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-3 text-accent" />
                            Modify Logic
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg py-3 cursor-pointer" onClick={() => togglePublish(post)}>
                            {post.is_published ? (
                              <>
                                <EyeOff className="h-4 w-4 mr-3 text-yellow-500" />
                                Revert to Draft
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 mr-3 text-green-500" />
                                Deploy Content
                              </>
                            )}
                          </DropdownMenuItem>
                          <div className="h-px bg-border my-2" />
                          <DropdownMenuItem
                            onClick={() => handleDelete(post.id)}
                            className="rounded-lg py-3 cursor-pointer text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-3" />
                            Delete Permanent
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

      {/* Editor Surface */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border max-w-4xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl shadow-2xl">
          <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border p-6 flex items-center justify-between">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {editingPost?.id ? "Modify Core Narrative" : "Initialize New Entry"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest hidden sm:block">
                {editingPost?.is_published ? "Global Broadcast Enabled" : "Draft Encrypted"}
              </span>
              <Switch
                checked={editingPost?.is_published ?? false}
                onCheckedChange={(checked) => setEditingPost(prev => prev ? { ...prev, is_published: checked } : null)}
              />
            </div>
          </div>
          
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Structural Headline *</label>
                  <Input
                    value={editingPost?.title || ""}
                    onChange={(e) => setEditingPost(prev => prev ? {
                      ...prev,
                      title: e.target.value,
                      slug: prev.id ? prev.slug : generateSlug(e.target.value),
                    } : null)}
                    className="bg-background border-border h-14 text-lg font-bold focus:ring-accent"
                    placeholder="Enter post nomenclature..."
                  />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">URL Identifier (Slug)</label>
                    <Input
                      value={editingPost?.slug || ""}
                      onChange={(e) => setEditingPost(prev => prev ? { ...prev, slug: e.target.value } : null)}
                      className="bg-background border-border h-12 font-mono text-sm focus:ring-accent"
                      placeholder="thematic-url-segment"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Internal Taxonomy</label>
                    <Input
                      value={editingPost?.category || ""}
                      onChange={(e) => setEditingPost(prev => prev ? { ...prev, category: e.target.value } : null)}
                      className="bg-background border-border h-12 font-bold focus:ring-accent"
                      placeholder="e.g. INFRASTRUCTURE, SAFETY"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Narrative Abstract (Excerpt)</label>
                  <Textarea
                    value={editingPost?.excerpt || ""}
                    onChange={(e) => setEditingPost(prev => prev ? { ...prev, excerpt: e.target.value } : null)}
                    className="bg-background border-border min-h-[140px] resize-none focus:ring-accent leading-relaxed"
                    placeholder="Provide a strategic overview for index listings..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Primary Content Layer (Markdown Enabled)</label>
              <Textarea
                value={editingPost?.content || ""}
                onChange={(e) => setEditingPost(prev => prev ? { ...prev, content: e.target.value } : null)}
                className="bg-background border-border min-h-[400px] font-mono p-6 resize-y focus:ring-accent leading-relaxed text-sm"
                placeholder="# Introduction..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Featured Visual Asset (URL)</label>
              <div className="relative">
                <Input
                  value={editingPost?.featured_image || ""}
                  onChange={(e) => setEditingPost(prev => prev ? { ...prev, featured_image: e.target.value } : null)}
                  className="bg-background border-border h-12 pl-12 focus:ring-accent"
                  placeholder="https://content.travio.com/assets/..."
                />
                <Plus className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="bg-secondary/30 border border-border/50 p-8 rounded-2xl space-y-6">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Globe className="h-4 w-4 text-accent" />
                SEO Search Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Meta Strategic Title</label>
                  <Input
                    value={editingPost?.meta_title || ""}
                    onChange={(e) => setEditingPost(prev => prev ? { ...prev, meta_title: e.target.value } : null)}
                    className="bg-background border-border h-12 font-medium focus:ring-accent"
                    placeholder="Target keywords (max 60 chars)"
                    maxLength={60}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Meta Strategic Description</label>
                  <Textarea
                    value={editingPost?.meta_description || ""}
                    onChange={(e) => setEditingPost(prev => prev ? { ...prev, meta_description: e.target.value } : null)}
                    className="bg-background border-border h-24 resize-none focus:ring-accent text-sm"
                    placeholder="Acquisition narrative (max 160 chars)"
                    maxLength={160}
                  />
                </div>
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
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-5 w-5 border-2 border-accent-foreground border-t-transparent rounded-full" />
                    Synchronizing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="h-5 w-5" />
                    Finalize & Synchronize
                  </div>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Save(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
      <path d="M7 3v4a1 1 0 0 0 1 1h7" />
    </svg>
  );
}
