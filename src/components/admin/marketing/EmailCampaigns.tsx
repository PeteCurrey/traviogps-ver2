import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Plus, 
  Send, 
  Edit2, 
  Trash2,
  Eye,
  Users,
  MousePointer,
  BarChart3,
  Clock,
  CheckCircle,
  RefreshCw,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";

export function EmailCampaigns() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    subject: "",
    preview_text: "",
    content: "",
    audience_segment: "all"
  });
  const queryClient = useQueryClient();

  // Fetch real campaigns from database
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['email-campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    }
  });

  // Add campaign mutation
  const addCampaign = useMutation({
    mutationFn: async (campaign: typeof newCampaign) => {
      const { error } = await supabase
        .from('email_campaigns')
        .insert([{
          ...campaign,
          status: 'draft'
        }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      setIsAddOpen(false);
      setNewCampaign({
        name: "",
        subject: "",
        preview_text: "",
        content: "",
        audience_segment: "all"
      });
      toast.success("Campaign created");
    },
    onError: () => {
      toast.error("Failed to create campaign");
    }
  });

  // Delete campaign mutation
  const deleteCampaign = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('email_campaigns')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      toast.success("Campaign deleted");
    },
    onError: () => {
      toast.error("Failed to delete campaign");
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'default';
      case 'scheduled': return 'secondary';
      case 'draft': return 'outline';
      default: return 'outline';
    }
  };

  // Calculate stats from real data
  const totalCampaigns = campaigns?.length || 0;
  const publishedCampaigns = campaigns?.filter(c => c.status === 'published').length || 0;
  const totalSent = campaigns?.reduce((sum, c) => sum + (c.sent_count || 0), 0) || 0;
  const totalOpens = campaigns?.reduce((sum, c) => sum + (c.open_count || 0), 0) || 0;
  const avgOpenRate = totalSent > 0 ? ((totalOpens / totalSent) * 100).toFixed(1) : '0';
  const totalClicks = campaigns?.reduce((sum, c) => sum + (c.click_count || 0), 0) || 0;
  const avgClickRate = totalSent > 0 ? ((totalClicks / totalSent) * 100).toFixed(1) : '0';

  const stats = [
    { label: "Campaigns", value: totalCampaigns.toString(), icon: Mail },
    { label: "Avg. Open Rate", value: `${avgOpenRate}%`, icon: Eye },
    { label: "Avg. Click Rate", value: `${avgClickRate}%`, icon: MousePointer },
    { label: "Emails Sent", value: totalSent.toLocaleString(), icon: Send },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/20 rounded-lg">
                    <stat.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Campaigns Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Email Campaigns</CardTitle>
              <CardDescription>Manage your email marketing campaigns</CardDescription>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button className="bg-accent hover:bg-accent/90">
                  <Plus className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create Email Campaign</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Campaign Name</Label>
                    <Input 
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                      placeholder="e.g., Spring Newsletter 2026"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subject Line</Label>
                    <Input 
                      value={newCampaign.subject}
                      onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                      placeholder="e.g., New Spring Listings in the Peak District"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Preview Text</Label>
                    <Input 
                      value={newCampaign.preview_text}
                      onChange={(e) => setNewCampaign({ ...newCampaign, preview_text: e.target.value })}
                      placeholder="Short preview shown in inbox..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Audience</Label>
                    <Select 
                      value={newCampaign.audience_segment} 
                      onValueChange={(v) => setNewCampaign({ ...newCampaign, audience_segment: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subscribers</SelectItem>
                        <SelectItem value="buyers">Potential Buyers</SelectItem>
                        <SelectItem value="sellers">Property Sellers</SelectItem>
                        <SelectItem value="landlords">Landlords</SelectItem>
                        <SelectItem value="tenants">Tenants</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea 
                      value={newCampaign.content}
                      onChange={(e) => setNewCampaign({ ...newCampaign, content: e.target.value })}
                      placeholder="Email content..."
                      rows={6}
                    />
                  </div>
                  <Button 
                    onClick={() => addCampaign.mutate(newCampaign)}
                    disabled={!newCampaign.name || !newCampaign.subject || addCampaign.isPending}
                    className="w-full"
                  >
                    {addCampaign.isPending ? "Creating..." : "Create Campaign"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-8 w-8 text-accent animate-spin" />
            </div>
          ) : campaigns?.length === 0 ? (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No Campaigns Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first email campaign to engage your audience
              </p>
              <Button onClick={() => setIsAddOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Recipients</TableHead>
                  <TableHead className="text-center">Opens</TableHead>
                  <TableHead className="text-center">Clicks</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns?.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground">{campaign.subject}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(campaign.status)}>
                        {campaign.status === 'published' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {campaign.status === 'scheduled' && <Clock className="h-3 w-3 mr-1" />}
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {(campaign.recipient_count || 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {campaign.open_count && campaign.recipient_count ? (
                        <span>
                          {campaign.open_count.toLocaleString()}
                          <span className="text-xs text-muted-foreground ml-1">
                            ({Math.round((campaign.open_count / campaign.recipient_count) * 100)}%)
                          </span>
                        </span>
                      ) : "—"}
                    </TableCell>
                    <TableCell className="text-center">
                      {campaign.click_count && campaign.recipient_count ? (
                        <span>
                          {campaign.click_count.toLocaleString()}
                          <span className="text-xs text-muted-foreground ml-1">
                            ({Math.round((campaign.click_count / campaign.recipient_count) * 100)}%)
                          </span>
                        </span>
                      ) : "—"}
                    </TableCell>
                    <TableCell>
                      {campaign.sent_at 
                        ? format(new Date(campaign.sent_at), "MMM d, yyyy")
                        : campaign.scheduled_for
                        ? format(new Date(campaign.scheduled_for), "MMM d, yyyy")
                        : format(new Date(campaign.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500"
                          onClick={() => {
                            if (confirm("Delete this campaign?")) {
                              deleteCampaign.mutate(campaign.id);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
