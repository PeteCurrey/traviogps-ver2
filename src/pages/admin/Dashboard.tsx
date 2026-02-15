import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, TrendingUp, Eye, ArrowRight, Clock, FileText, Users, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Stats {
  totalEnquiries: number;
  newEnquiries: number;
  totalBlogPosts: number;
  totalTestimonials: number;
}

interface RecentLead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  lead_type: string;
  source: string | null;
  created_at: string;
  status: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalEnquiries: 0,
    newEnquiries: 0,
    totalBlogPosts: 0,
    totalTestimonials: 0,
  });
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { count: totalLeads },
          { count: newLeads },
          { count: totalPosts },
          { count: totalTestimonials },
          { data: leads },
        ] = await Promise.all([
          supabase.from("leads").select("*", { count: "exact", head: true }),
          supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
          supabase.from("blog_posts").select("*", { count: "exact", head: true }),
          supabase.from("testimonials").select("*", { count: "exact", head: true }),
          supabase.from("leads").select("id, first_name, last_name, email, lead_type, source, created_at, status").order("created_at", { ascending: false }).limit(8),
        ]);

        setStats({
          totalEnquiries: totalLeads || 0,
          newEnquiries: newLeads || 0,
          totalBlogPosts: totalPosts || 0,
          totalTestimonials: totalTestimonials || 0,
        });
        setRecentLeads(leads || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      label: "Total Enquiries",
      value: stats.totalEnquiries,
      icon: MessageSquare,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "New (Unread)",
      value: stats.newEnquiries,
      icon: Eye,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      label: "Blog Posts",
      value: stats.totalBlogPosts,
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Testimonials",
      value: stats.totalTestimonials,
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
  ];

  const statusColors: Record<string, string> = {
    new: "bg-blue-500/20 text-blue-500",
    contacted: "bg-yellow-500/20 text-yellow-500",
    qualified: "bg-green-500/20 text-green-500",
    converted: "bg-purple-500/20 text-purple-500",
    closed: "bg-muted text-muted-foreground",
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here's an overview of your Travio website.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", stat.bgColor)}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Enquiries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-xl"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Recent Enquiries</h2>
          <Link
            to="/admin/leads"
            className="text-sm text-accent hover:text-accent/80 flex items-center gap-1"
          >
            View All
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          {recentLeads.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">
              No enquiries yet. They'll appear here when visitors submit the contact, quote, or demo forms.
            </p>
          ) : (
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Contact</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Source</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-secondary/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{lead.first_name} {lead.last_name}</p>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground capitalize hidden md:table-cell">
                      {lead.source?.replace("-", " ") || lead.lead_type}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">
                      {format(new Date(lead.created_at), "dd MMM yyyy")}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("text-xs px-2 py-1 rounded-full capitalize", statusColors[lead.status] || "bg-muted text-muted-foreground")}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  );
}
