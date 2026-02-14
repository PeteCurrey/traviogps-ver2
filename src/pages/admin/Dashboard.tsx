import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, MessageSquare, TrendingUp, Eye, ArrowRight, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface Stats {
  totalProperties: number;
  availableProperties: number;
  newLeads: number;
  totalLeads: number;
}

interface RecentLead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  lead_type: string;
  created_at: string;
}

interface RecentProperty {
  id: string;
  title: string;
  price_formatted: string;
  status: string;
  created_at: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProperties: 0,
    availableProperties: 0,
    newLeads: 0,
    totalLeads: 0,
  });
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [recentProperties, setRecentProperties] = useState<RecentProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch property counts
        const { count: totalProps } = await supabase
          .from("properties")
          .select("*", { count: "exact", head: true });

        const { count: availableProps } = await supabase
          .from("properties")
          .select("*", { count: "exact", head: true })
          .eq("status", "available");

        // Fetch lead counts
        const { count: totalLeadsCount } = await supabase
          .from("leads")
          .select("*", { count: "exact", head: true });

        const { count: newLeadsCount } = await supabase
          .from("leads")
          .select("*", { count: "exact", head: true })
          .eq("status", "new");

        setStats({
          totalProperties: totalProps || 0,
          availableProperties: availableProps || 0,
          totalLeads: totalLeadsCount || 0,
          newLeads: newLeadsCount || 0,
        });

        // Fetch recent leads
        const { data: leads } = await supabase
          .from("leads")
          .select("id, first_name, last_name, email, lead_type, created_at")
          .order("created_at", { ascending: false })
          .limit(5);

        setRecentLeads(leads || []);

        // Fetch recent properties
        const { data: properties } = await supabase
          .from("properties")
          .select("id, title, price_formatted, status, created_at")
          .order("created_at", { ascending: false })
          .limit(5);

        setRecentProperties(properties || []);
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
      label: "Total Properties",
      value: stats.totalProperties,
      icon: Home,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Available",
      value: stats.availableProperties,
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Total Leads",
      value: stats.totalLeads,
      icon: MessageSquare,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "New Leads",
      value: stats.newLeads,
      icon: Eye,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

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
        <h1 className="font-serif text-2xl text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here's an overview of your activity.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border border-border rounded-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", stat.bgColor)}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
            </div>
            <p className="font-serif text-3xl text-foreground mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-sm"
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-serif text-lg text-foreground">Recent Leads</h2>
            <Link
              to="/admin/leads"
              className="text-sm text-accent hover:text-accent/80 flex items-center gap-1"
            >
              View All
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="p-4">
            {recentLeads.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">
                No leads yet
              </p>
            ) : (
              <ul className="space-y-3">
                {recentLeads.map((lead) => (
                  <li key={lead.id} className="flex items-center justify-between p-3 bg-secondary rounded-sm">
                    <div>
                      <p className="text-foreground font-medium">
                        {lead.first_name} {lead.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent capitalize">
                      {lead.lead_type}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>

        {/* Recent Properties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-sm"
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-serif text-lg text-foreground">Recent Properties</h2>
            <Link
              to="/admin/properties"
              className="text-sm text-accent hover:text-accent/80 flex items-center gap-1"
            >
              View All
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="p-4">
            {recentProperties.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">
                No properties yet
              </p>
            ) : (
              <ul className="space-y-3">
                {recentProperties.map((property) => (
                  <li key={property.id} className="flex items-center justify-between p-3 bg-secondary rounded-sm">
                    <div>
                      <p className="text-foreground font-medium truncate max-w-[200px]">
                        {property.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{property.price_formatted}</p>
                    </div>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full capitalize",
                      property.status === "available" ? "bg-green-500/20 text-green-500" :
                      property.status === "under-offer" ? "bg-orange-500/20 text-orange-500" :
                      property.status === "sold" ? "bg-blue-500/20 text-blue-500" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {property.status.replace("-", " ")}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
