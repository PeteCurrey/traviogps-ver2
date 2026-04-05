"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, MoreHorizontal, Mail, Phone, Check, X, Clock, MapPin, Briefcase } from "lucide-react";
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

type Lead = Tables<"leads">;

const statusColors: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  contacted: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  qualified: "bg-green-500/10 text-green-500 border-green-500/20",
  converted: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  closed: "bg-muted text-muted-foreground border-border",
};

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const { toast } = useToast();

  const fetchLeads = async () => {
    try {
      let query = supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter as Lead["status"]);
      }
      if (typeFilter !== "all") {
        query = query.eq("lead_type", typeFilter as Lead["lead_type"]);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast({
        title: "Error",
        description: "Failed to load leads from database",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, typeFilter]);

  const updateLeadStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ 
          status: status as Lead["status"],
          contacted_at: status === "contacted" ? new Date().toISOString() : undefined,
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Lead status changed to ${status}`,
      });
      fetchLeads();
    } catch (error) {
      console.error("Error updating lead:", error);
      toast({
        title: "Update failed",
        description: "Failed to update lead status",
        variant: "destructive",
      });
    }
  };

  const filteredLeads = leads.filter((lead) =>
    `${lead.first_name} ${lead.last_name} ${lead.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Platform Leads</h1>
          <p className="text-muted-foreground font-medium">Manage and track all incoming acquisition requests</p>
        </div>
        <div className="bg-accent/10 px-4 py-2 rounded-xl border border-accent/20">
          <span className="text-accent font-bold">{leads.length}</span>
          <span className="text-accent/70 text-sm ml-2 uppercase tracking-wider font-semibold">Total Records</span>
        </div>
      </div>

      {/* Filters Hub */}
      <div className="bg-card border border-border rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-background border-border h-12 focus:ring-accent"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px] bg-background border-border h-12 font-semibold">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Global Status</SelectItem>
                <SelectItem value="new">New Entry</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="closed">Closed Archive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px] bg-background border-border h-12 font-semibold">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                <SelectItem value="enquiry">Direct Enquiry</SelectItem>
                <SelectItem value="valuation">Valuation Request</SelectItem>
                <SelectItem value="viewing">Live Demo</SelectItem>
                <SelectItem value="general">General Support</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-12 px-6 font-bold" onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setTypeFilter("all");
            }}>
              Reset Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Leads Registry */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Contact Detail</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Acquisition Channel</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Creation Time</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Internal Status</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">No records matched</h3>
                    <p className="text-muted-foreground max-w-xs mx-auto">Try adjusting your search query or filter parameters.</p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, idx) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="hover:bg-secondary/30 cursor-pointer group transition-colors"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground group-hover:text-accent transition-colors">
                          {lead.first_name} {lead.last_name}
                        </span>
                        <span className="text-muted-foreground font-medium">{lead.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm capitalize hidden md:table-cell font-medium">
                      {lead.lead_type}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-sm hidden lg:table-cell font-medium">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {format(new Date(lead.created_at), "dd MMM yyyy")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                        statusColors[lead.status || "new"]
                      )}>
                        {lead.status || "new"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 p-2">
                          <DropdownMenuItem asChild className="rounded-lg py-3 cursor-pointer">
                            <a href={`mailto:${lead.email}`}>
                              <Mail className="h-4 w-4 mr-3 text-accent" />
                              Send Verification Email
                            </a>
                          </DropdownMenuItem>
                          {lead.phone && (
                            <DropdownMenuItem asChild className="rounded-lg py-3 cursor-pointer">
                              <a href={`tel:${lead.phone}`}>
                                <Phone className="h-4 w-4 mr-3 text-accent" />
                                Direct Voice Call
                              </a>
                            </DropdownMenuItem>
                          )}
                          <div className="h-px bg-border my-2" />
                          <DropdownMenuItem className="rounded-lg py-3 cursor-pointer" onClick={() => updateLeadStatus(lead.id, "contacted")}>
                            <Check className="h-4 w-4 mr-3 text-yellow-500" />
                            Mark as Contacted
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg py-3 cursor-pointer" onClick={() => updateLeadStatus(lead.id, "qualified")}>
                            <Check className="h-4 w-4 mr-3 text-green-500" />
                            Mark as Qualified
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg py-3 cursor-pointer text-destructive focus:text-destructive" onClick={() => updateLeadStatus(lead.id, "closed")}>
                            <X className="h-4 w-4 mr-3" />
                            Archive Information
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

      {/* Detail Overlay */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="bg-card border-border max-w-2xl p-0 overflow-hidden rounded-2xl shadow-2xl">
          <DialogHeader className="p-8 pb-0">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-accent">{selectedLead?.first_name?.[0].toUpperCase()}</span>
              </div>
              <div>
                <DialogTitle className="font-bold text-2xl text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {selectedLead?.first_name} {selectedLead?.last_name}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border",
                    statusColors[selectedLead?.status || "new"]
                  )}>
                    {selectedLead?.status || "new"}
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>
          
          <div className="p-8 pt-6 space-y-8">
            <div className="grid grid-cols-2 gap-8 p-6 bg-secondary/30 rounded-2xl border border-border/50">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Email Communication</p>
                <a href={`mailto:${selectedLead?.email}`} className="text-foreground font-semibold hover:text-accent transition-colors block">
                  {selectedLead?.email}
                </a>
              </div>
              {selectedLead?.phone && (
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Direct Access</p>
                  <a href={`tel:${selectedLead?.phone}`} className="text-foreground font-semibold hover:text-accent transition-colors block">
                    {selectedLead?.phone}
                  </a>
                </div>
              )}
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Creation Node</p>
                <p className="text-foreground font-semibold">{selectedLead ? format(new Date(selectedLead.created_at), "dd MMM yyyy HH:mm") : ""}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Intent Segment</p>
                <p className="text-foreground font-semibold capitalize flex items-center gap-2">
                  <Briefcase className="h-3 w-3 text-accent" />
                  {selectedLead?.lead_type}
                </p>
              </div>
            </div>

            {selectedLead?.message && (
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Core Communication</p>
                <div className="bg-card border border-border p-5 rounded-2xl shadow-sm text-foreground leading-relaxed italic">
                  "{selectedLead.message}"
                </div>
              </div>
            )}

            {selectedLead?.valuation_address && (
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Asset Configuration</p>
                <div className="bg-accent/5 border border-accent/10 p-5 rounded-2xl space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <div className="space-y-1">
                      <p className="text-foreground font-bold">{selectedLead.valuation_address}</p>
                      <p className="text-muted-foreground font-medium">{selectedLead.valuation_postcode}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {selectedLead.valuation_property_type && (
                      <span className="bg-card px-3 py-1 rounded-lg text-xs font-bold text-accent border border-accent/10">
                        {selectedLead.valuation_property_type.toUpperCase()}
                      </span>
                    )}
                    {selectedLead.valuation_bedrooms && (
                      <span className="bg-card px-3 py-1 rounded-lg text-xs font-bold text-accent border border-accent/10">
                        {selectedLead.valuation_bedrooms} BEDROOMS
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4 border-t border-border/50">
              <Button asChild className="flex-1 h-14 font-bold bg-accent hover:bg-accent/90 text-accent-foreground text-lg rounded-xl">
                <a href={`mailto:${selectedLead?.email}`}>
                  <Mail className="h-5 w-5 mr-3" />
                  Initiate Correspondence
                </a>
              </Button>
              {selectedLead?.phone && (
                <Button asChild variant="outline" className="flex-1 h-14 font-bold rounded-xl border-2">
                  <a href={`tel:${selectedLead?.phone}`}>
                    <Phone className="h-5 w-5 mr-3" />
                    Direct Dial
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
