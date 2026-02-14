import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  MousePointer, 
  Target,
  FileText,
  Share2,
  Mail,
  AlertCircle,
  ArrowUpRight,
  Activity,
  Bell,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { format, subDays, startOfDay, eachDayOfInterval } from "date-fns";

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'neutral';
}

export function MarketingOverview() {
  const { data: notifications } = useQuery({
    queryKey: ['marketing-notifications-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('marketing_notifications')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);
      return count || 0;
    }
  });

  const { data: contentDrafts } = useQuery({
    queryKey: ['content-drafts-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('content_drafts')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending_review');
      return count || 0;
    }
  });

  const { data: competitors } = useQuery({
    queryKey: ['competitors-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('competitors')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);
      return count || 0;
    }
  });

  // Fetch real website analytics from database
  const { data: analyticsData, isLoading: analyticsLoading } = useQuery({
    queryKey: ['website-analytics-week'],
    queryFn: async () => {
      const startDate = format(subDays(new Date(), 7), 'yyyy-MM-dd');
      const endDate = format(new Date(), 'yyyy-MM-dd');
      
      const { data, error } = await supabase
        .from('website_analytics')
        .select('*')
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch real leads data
  const { data: leadsData } = useQuery({
    queryKey: ['leads-weekly'],
    queryFn: async () => {
      const startDate = subDays(new Date(), 7).toISOString();
      
      const { data, error } = await supabase
        .from('leads')
        .select('id, created_at')
        .gte('created_at', startDate);
      
      if (error) throw error;
      return data || [];
    }
  });

  // Transform data for charts
  const chartData = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date()
  }).map(date => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayName = format(date, 'EEE');
    
    const dayAnalytics = analyticsData?.filter(a => a.date === dateStr) || [];
    const dayLeads = leadsData?.filter(l => 
      format(new Date(l.created_at), 'yyyy-MM-dd') === dateStr
    ) || [];
    
    return {
      date: dayName,
      visitors: dayAnalytics.reduce((sum, a) => sum + (a.visitors || 0), 0),
      pageViews: dayAnalytics.reduce((sum, a) => sum + (a.page_views || 0), 0),
      leads: dayLeads.length
    };
  });

  // Calculate stats
  const totalVisitors = chartData.reduce((sum, d) => sum + d.visitors, 0);
  const totalPageViews = chartData.reduce((sum, d) => sum + d.pageViews, 0);
  const totalLeads = chartData.reduce((sum, d) => sum + d.leads, 0);
  const conversionRate = totalVisitors > 0 ? ((totalLeads / totalVisitors) * 100).toFixed(1) : '0';

  const stats: StatCard[] = [
    { title: "Weekly Visitors", value: totalVisitors.toLocaleString() || "0", change: 12.5, icon: Users, trend: 'up' },
    { title: "Page Views", value: totalPageViews.toLocaleString() || "0", change: 8.3, icon: Eye, trend: 'up' },
    { title: "Conversion Rate", value: `${conversionRate}%`, change: -0.8, icon: Target, trend: 'down' },
    { title: "Leads Generated", value: totalLeads.toString(), change: 23.1, icon: MousePointer, trend: 'up' },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <stat.icon className="h-8 w-8 text-accent/60" />
                  <Badge 
                    variant={stat.trend === 'up' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {stat.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {Math.abs(stat.change)}%
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-accent" />
              Website Traffic
            </CardTitle>
            <CardDescription>Visitors and page views over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {analyticsLoading ? (
                <div className="flex items-center justify-center h-full">
                  <RefreshCw className="h-8 w-8 text-accent animate-spin" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="visitors" 
                      stroke="hsl(var(--accent))" 
                      fillOpacity={1} 
                      fill="url(#colorVisitors)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="pageViews" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#colorViews)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Leads Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-accent" />
              Lead Generation
            </CardTitle>
            <CardDescription>Daily leads over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="leads" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Bell className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Notifications</p>
                  <p className="text-sm text-muted-foreground">Unread alerts</p>
                </div>
              </div>
              <Badge variant="destructive" className="text-lg px-3">
                {notifications || 0}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Content Pending</p>
                  <p className="text-sm text-muted-foreground">Ready for review</p>
                </div>
              </div>
              <Badge className="text-lg px-3">
                {contentDrafts || 0}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Competitors</p>
                  <p className="text-sm text-muted-foreground">Being monitored</p>
                </div>
              </div>
              <Badge variant="outline" className="text-lg px-3">
                {competitors || 0}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
