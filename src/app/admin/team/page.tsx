"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, MoreHorizontal, Edit, Trash2, Upload, Image as ImageIcon, X, Users, Mail, Phone, Linkedin } from "lucide-react";
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

export default function TeamAdminPage() {
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
        title: "Fetch Error",
        description: "Failed to load team members from database",
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
        title: "Format Conflict",
        description: "Please select a valid image file (PNG, JPG, WEBP)",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `team-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
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
        title: "Asset Uploaded",
        description: "Member photo is now cached and ready for save",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload Failed",
        description: "Storage bucket communication error. Try a direct URL.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!editingMember?.full_name || !editingMember?.job_title) {
      toast({
        title: "Validation Error",
        description: "Full name and job title are structural requirements",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const memberData = {
        full_name: editingMember.full_name,
        job_title: editingMember.job_title,
        email: editingMember.email || null,
        phone: editingMember.phone || null,
        bio: editingMember.bio || null,
        image: editingMember.image || null,
        linkedin_url: editingMember.linkedin_url || null,
        is_published: editingMember.is_published ?? true,
        display_order: editingMember.display_order ?? members.length,
      };

      if (editingMember.id) {
        const { error } = await supabase
          .from("team_members")
          .update(memberData)
          .eq("id", editingMember.id);

        if (error) throw error;
        toast({ title: "Profile Synchronized", description: "Team member changes are live" });
      } else {
        const { error } = await supabase.from("team_members").insert(memberData);

        if (error) throw error;
        toast({ title: "Profile Initialized", description: "New team member added to directory" });
      }

      setIsDialogOpen(false);
      setEditingMember(null);
      fetchMembers();
    } catch (error) {
      console.error("Error saving team member:", error);
      toast({
        title: "Persistence Error",
        description: "Failed to write profile data to database",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you certain you want to permanently remove this profile? This action cannot be reversed.")) return;

    try {
      const { error } = await supabase.from("team_members").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Profile Excised", description: "The team member has been removed from all systems" });
      fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
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
            <Users className="h-7 w-7 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Human Infrastructure</h1>
            <p className="text-muted-foreground font-medium">Manage the expert team powering the Travio network</p>
          </div>
        </div>
        <Button
          onClick={() => {
            setEditingMember(defaultMember);
            setIsDialogOpen(true);
          }}
          className="h-14 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg rounded-xl shadow-glow"
        >
          <Plus className="h-5 w-5 mr-3" />
          Onboard Member
        </Button>
      </div>

      {/* Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {members.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={cn(
              "group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-glow transition-all duration-500",
              !member.is_published && "opacity-60 grayscale-[0.5]"
            )}
          >
            <div className="aspect-[4/5] bg-secondary relative overflow-hidden">
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.full_name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-accent/30 bg-accent/5">
                  {member.full_name[0]}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div className="flex gap-4">
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="p-2 bg-background/50 backdrop-blur-md rounded-full text-foreground hover:bg-accent hover:text-white transition-all">
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                  {member.linkedin_url && (
                    <a href={member.linkedin_url} target="_blank" rel="noreferrer" className="p-2 bg-background/50 backdrop-blur-md rounded-full text-foreground hover:bg-accent hover:text-white transition-all">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-foreground truncate">{member.full_name}</h3>
                  <p className="text-sm font-bold text-accent uppercase tracking-wider">{member.job_title}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 p-2">
                    <DropdownMenuItem
                      className="rounded-lg py-3 cursor-pointer"
                      onClick={() => {
                        setEditingMember(member);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-3 text-accent" />
                      Modify Profile
                    </DropdownMenuItem>
                    <div className="h-px bg-border my-2" />
                    <DropdownMenuItem
                      onClick={() => handleDelete(member.id)}
                      className="rounded-lg py-3 cursor-pointer text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-3" />
                      Offboard Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {!member.is_published && (
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-wider border">
                  Draft Mode
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {members.length === 0 && (
          <div className="col-span-full bg-secondary/20 border border-dashed border-border rounded-2xl py-20 text-center">
            <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>No team records identified</h3>
            <p className="text-muted-foreground max-w-sm mx-auto mb-8 font-medium">Add your first expert profile to populate the global human directory.</p>
            <Button
              onClick={() => {
                setEditingMember(defaultMember);
                setIsDialogOpen(true);
              }}
              className="h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 rounded-xl"
            >
              <Plus className="h-4 w-4 mr-2" />
              Onboard First Member
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
                {editingMember?.id ? "Modify Professional Profile" : "Initialize Member Component"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest hidden sm:block">
                {editingMember?.is_published ? "Public Directory Node" : "Internal Staging"}
              </span>
              <Switch
                checked={editingMember?.is_published ?? true}
                onCheckedChange={(checked) => setEditingMember(prev => prev ? { ...prev, is_published: checked } : null)}
              />
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Asset Management */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Visual Identity (Member Photo)</label>
              <div className="flex flex-col sm:flex-row gap-6 p-6 bg-secondary/30 rounded-2xl border border-border/50">
                <div className="w-32 h-40 bg-background border border-border rounded-xl overflow-hidden relative group shadow-sm flex-shrink-0">
                  {editingMember?.image ? (
                    <>
                      <img 
                        src={editingMember.image} 
                        alt="Final Preview" 
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setEditingMember(prev => prev ? { ...prev, image: "" } : null)}
                        className="absolute top-2 right-2 p-1.5 bg-destructive rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-accent/20">
                      {editingMember?.full_name?.[0] || "?"}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 space-y-4">
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
                    className="w-full h-12 font-bold rounded-xl border-2 border-dashed border-border hover:border-accent group"
                  >
                    {isUploading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-accent border-t-transparent rounded-full" />
                        Uploading Asset...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Upload className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                        Upload Architectural Portrait
                      </div>
                    )}
                  </Button>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">Or supply remote direct link</p>
                    <Input
                      value={editingMember?.image || ""}
                      onChange={(e) => setEditingMember(prev => prev ? { ...prev, image: e.target.value } : null)}
                      placeholder="https://content.travio.com/id..."
                      className="bg-background border-border h-10 font-mono text-xs focus:ring-accent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Legal Nomenclature *</label>
                <Input
                  value={editingMember?.full_name || ""}
                  onChange={(e) => setEditingMember(prev => prev ? { ...prev, full_name: e.target.value } : null)}
                  className="bg-background border-border h-12 font-bold focus:ring-accent"
                  placeholder="e.g. Jonathan Ive"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Structural Role *</label>
                <Input
                  value={editingMember?.job_title || ""}
                  onChange={(e) => setEditingMember(prev => prev ? { ...prev, job_title: e.target.value } : null)}
                  className="bg-background border-border h-12 font-bold focus:ring-accent"
                  placeholder="e.g. Chief of Design"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Correspondence Email</label>
                <div className="relative">
                  <Input
                    type="email"
                    value={editingMember?.email || ""}
                    onChange={(e) => setEditingMember(prev => prev ? { ...prev, email: e.target.value } : null)}
                    className="bg-background border-border h-12 pl-12 focus:ring-accent font-medium"
                    placeholder="j.ive@travio.com"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Access Line</label>
                <div className="relative">
                  <Input
                    value={editingMember?.phone || ""}
                    onChange={(e) => setEditingMember(prev => prev ? { ...prev, phone: e.target.value } : null)}
                    className="bg-background border-border h-12 pl-12 focus:ring-accent font-medium"
                    placeholder="+44 (0) ..."
                  />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Network Connectivity (LinkedIn)</label>
              <div className="relative">
                <Input
                  value={editingMember?.linkedin_url || ""}
                  onChange={(e) => setEditingMember(prev => prev ? { ...prev, linkedin_url: e.target.value } : null)}
                  placeholder="https://linkedin.com/in/..."
                  className="bg-background border-border h-12 pl-12 focus:ring-accent font-medium"
                />
                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Professional Biography</label>
              <Textarea
                value={editingMember?.bio || ""}
                onChange={(e) => setEditingMember(prev => prev ? { ...prev, bio: e.target.value } : null)}
                className="bg-background border-border min-h-[160px] p-4 resize-none focus:ring-accent leading-relaxed font-medium"
                placeholder="Detail professional trajectory and sector specializations..."
              />
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
                    Synchronizing Profile...
                  </div>
                ) : (
                  "Finalize & Commit Profile"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
