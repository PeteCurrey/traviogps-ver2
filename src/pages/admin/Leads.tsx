import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, MoreHorizontal, Mail, Phone, Check, X } from "lucide-react";
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
  new: "bg-blue-500/20 text-blue-500",
  contacted: "bg-yellow-500/20 text-yellow-500",
  qualified: "bg-green-500/20 text-green-500",
  converted: "bg-purple-500/20 text-purple-500",
  closed: "bg-muted text-muted-foreground",
};

export default function Leads() {
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
        description: "Failed to load leads",
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
        title: "Lead updated",
        description: `Status changed to ${status}`,
      });
      fetchLeads();
    } catch (error) {
      console.error("Error updating lead:", error);
      toast({
        title: "Error",
        description: "Failed to update lead",
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl text-foreground">Leads</h1>
        <p className="text-muted-foreground">{leads.length} leads total</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary border-border"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px] bg-secondary border-border">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[150px] bg-secondary border-border">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="enquiry">Enquiry</SelectItem>
            <SelectItem value="valuation">Valuation</SelectItem>
            <SelectItem value="viewing">Viewing</SelectItem>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Contact</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Type</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No leads found
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, idx) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-secondary/50 cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-foreground">
                          {lead.first_name} {lead.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">{lead.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-foreground capitalize hidden md:table-cell">
                      {lead.lead_type}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-sm hidden lg:table-cell">
                      {format(new Date(lead.created_at), "dd MMM yyyy")}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("text-xs px-2 py-1 rounded-full capitalize", statusColors[lead.status])}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <a href={`mailto:${lead.email}`}>
                              <Mail className="h-4 w-4 mr-2" />
                              Email
                            </a>
                          </DropdownMenuItem>
                          {lead.phone && (
                            <DropdownMenuItem asChild>
                              <a href={`tel:${lead.phone}`}>
                                <Phone className="h-4 w-4 mr-2" />
                                Call
                              </a>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "contacted")}>
                            <Check className="h-4 w-4 mr-2" />
                            Mark Contacted
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "qualified")}>
                            <Check className="h-4 w-4 mr-2" />
                            Mark Qualified
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "closed")}>
                            <X className="h-4 w-4 mr-2" />
                            Close Lead
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

      {/* Lead Detail Modal */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {selectedLead?.first_name} {selectedLead?.last_name}
            </DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${selectedLead.email}`} className="text-foreground hover:text-accent">
                    {selectedLead.email}
                  </a>
                </div>
                {selectedLead.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href={`tel:${selectedLead.phone}`} className="text-foreground hover:text-accent">
                      {selectedLead.phone}
                    </a>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="text-foreground capitalize">{selectedLead.lead_type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <span className={cn("text-xs px-2 py-1 rounded-full capitalize", statusColors[selectedLead.status])}>
                    {selectedLead.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="text-foreground">{format(new Date(selectedLead.created_at), "dd MMM yyyy HH:mm")}</p>
                </div>
                {selectedLead.contacted_at && (
                  <div>
                    <p className="text-sm text-muted-foreground">Contacted</p>
                    <p className="text-foreground">{format(new Date(selectedLead.contacted_at), "dd MMM yyyy HH:mm")}</p>
                  </div>
                )}
              </div>

              {selectedLead.message && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Message</p>
                  <p className="text-foreground bg-secondary p-3 rounded-sm">{selectedLead.message}</p>
                </div>
              )}

              {selectedLead.valuation_address && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Valuation Property</p>
                  <div className="bg-secondary p-3 rounded-sm space-y-1">
                    <p className="text-foreground">{selectedLead.valuation_address}</p>
                    {selectedLead.valuation_postcode && (
                      <p className="text-muted-foreground">{selectedLead.valuation_postcode}</p>
                    )}
                    {selectedLead.valuation_property_type && (
                      <p className="text-muted-foreground capitalize">{selectedLead.valuation_property_type}</p>
                    )}
                    {selectedLead.valuation_bedrooms && (
                      <p className="text-muted-foreground">{selectedLead.valuation_bedrooms} bedrooms</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button asChild className="flex-1">
                  <a href={`mailto:${selectedLead.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </a>
                </Button>
                {selectedLead.phone && (
                  <Button asChild variant="outline" className="flex-1">
                    <a href={`tel:${selectedLead.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
