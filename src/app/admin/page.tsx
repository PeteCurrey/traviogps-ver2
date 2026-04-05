"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

export default function AdminDashboardPage() {
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
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back. Here's an overview of your fleet tracking platform performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-glow transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bgColor)}>
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
            </div>
            <p className="text-4xl font-bold text-foreground mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</p>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Enquiries Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Recent Enquiries</h2>
          <Button asChild variant="ghost" size="sm" className="text-accent font-semibold">
            <Link href="/admin/leads" className="flex items-center gap-2">
              View All Enquiries
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="overflow-x-auto">
          {recentLeads.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground">No enquiries yet</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                They'll appear here when visitors submit the contact, quote, or demo forms.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Contact Details</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Submission Source</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Date Received</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-secondary/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground group-hover:text-accent transition-colors">
                          {lead.first_name} {lead.last_name}
                        </span>
                        <span className="text-sm text-muted-foreground">{lead.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-sm text-muted-foreground capitalize">
                        {lead.source?.replace("-", " ") || lead.lead_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {format(new Date(lead.created_at), "dd MMM yyyy")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize",
                        statusColors[lead.status] || "bg-muted text-muted-foreground"
                      )}>
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
