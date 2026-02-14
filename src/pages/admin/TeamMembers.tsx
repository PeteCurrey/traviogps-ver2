import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, MoreHorizontal, Edit, Trash2, Upload, Image as ImageIcon, X } from "lucide-react";
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

type TeamMember = Tables<"team_members">;

const defaultMember: Partial<TeamMember> = {
  full_name: "",
  job_title: "",
  email: "",
  phone: "",
  bio: "",
  image: "",
  linkedin_url: "",
  is_published: true,
  display_order: 0,
};

export default function TeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error("Error fetching team members:", error);
      toast({
        title: "Error",
        description: "Failed to load team members",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('team-photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('team-photos')
        .getPublicUrl(filePath);

      setEditingMember(prev => prev ? { ...prev, image: publicUrl } : null);
      
      toast({
        title: "Image uploaded",
        description: "Photo uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!editingMember?.full_name || !editingMember?.job_title) {
      toast({
        title: "Error",
        description: "Name and job title are required",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      if (editingMember.id) {
        // Update
        const { error } = await supabase
          .from("team_members")
          .update({
            full_name: editingMember.full_name,
            job_title: editingMember.job_title,
            email: editingMember.email,
            phone: editingMember.phone,
            bio: editingMember.bio,
            image: editingMember.image,
            linkedin_url: editingMember.linkedin_url,
            is_published: editingMember.is_published,
            display_order: editingMember.display_order,
          })
          .eq("id", editingMember.id);

        if (error) throw error;
        toast({ title: "Team member updated" });
      } else {
        // Create
        const { error } = await supabase.from("team_members").insert({
          full_name: editingMember.full_name,
          job_title: editingMember.job_title,
          email: editingMember.email || null,
          phone: editingMember.phone || null,
          bio: editingMember.bio || null,
          image: editingMember.image || null,
          linkedin_url: editingMember.linkedin_url || null,
          is_published: editingMember.is_published ?? true,
          display_order: members.length,
        });

        if (error) throw error;
        toast({ title: "Team member created" });
      }

      setIsDialogOpen(false);
      setEditingMember(null);
      fetchMembers();
    } catch (error) {
      console.error("Error saving team member:", error);
      toast({
        title: "Error",
        description: "Failed to save team member",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      const { error } = await supabase.from("team_members").delete().eq("id", id);

      if (error) throw error;

      toast({ title: "Team member deleted" });
      fetchMembers();
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast({
        title: "Error",
        description: "Failed to delete team member",
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
          <h1 className="font-serif text-2xl text-foreground">Team Members</h1>
          <p className="text-muted-foreground">{members.length} team members</p>
        </div>
        <Button
          onClick={() => {
            setEditingMember(defaultMember);
            setIsDialogOpen(true);
          }}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={cn(
              "bg-card border border-border rounded-sm overflow-hidden",
              !member.is_published && "opacity-60"
            )}
          >
            <div className="aspect-[3/4] bg-secondary">
              {member.image ? (
                <img src={member.image} alt={member.full_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl text-muted-foreground">
                  {member.full_name[0]}
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{member.full_name}</h3>
                  <p className="text-sm text-accent">{member.job_title}</p>
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
                        setEditingMember(member);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(member.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {member.bio && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{member.bio}</p>
              )}
              {!member.is_published && (
                <span className="mt-2 inline-block text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  Draft
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {members.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-serif text-lg text-foreground mb-2">No team members yet</h3>
          <p className="text-muted-foreground mb-4">Add your first team member to display on the About page</p>
          <Button
            onClick={() => {
              setEditingMember(defaultMember);
              setIsDialogOpen(true);
            }}
            className="bg-accent hover:bg-accent/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add First Member
          </Button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {editingMember?.id ? "Edit Team Member" : "Add Team Member"}
            </DialogTitle>
          </DialogHeader>
          {editingMember && (
            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Photo</label>
                <div className="flex gap-4 items-start">
                  <div className="w-24 h-32 rounded-sm bg-secondary overflow-hidden flex-shrink-0">
                    {editingMember.image ? (
                      <div className="relative w-full h-full group">
                        <img 
                          src={editingMember.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => setEditingMember({ ...editingMember, image: "" })}
                          className="absolute top-1 right-1 p-1 bg-destructive rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl text-muted-foreground">
                        {editingMember.full_name?.[0] || "?"}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="w-full"
                    >
                      {isUploading ? (
                        <span className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                          Uploading...
                        </span>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Photo
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground">Or paste an image URL below</p>
                    <Input
                      value={editingMember.image || ""}
                      onChange={(e) => setEditingMember({ ...editingMember, image: e.target.value })}
                      placeholder="https://..."
                      className="bg-secondary border-border text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Full Name *</label>
                  <Input
                    value={editingMember.full_name || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, full_name: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Job Title *</label>
                  <Input
                    value={editingMember.job_title || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, job_title: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={editingMember.email || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
                  <Input
                    value={editingMember.phone || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">LinkedIn URL</label>
                <Input
                  value={editingMember.linkedin_url || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="bg-secondary border-border"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Bio</label>
                <Textarea
                  value={editingMember.bio || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="bg-secondary border-border min-h-[100px]"
                  placeholder="A brief description of this team member..."
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={editingMember.is_published ?? true}
                    onCheckedChange={(checked) => setEditingMember({ ...editingMember, is_published: checked })}
                  />
                  <label className="text-sm text-foreground">Published</label>
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
