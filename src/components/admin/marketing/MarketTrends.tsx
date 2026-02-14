import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  Zap,
  RefreshCw,
  ArrowUpRight,
  Home,
  DollarSign,
  Users,
  BarChart3,
  MapPin,
  Lightbulb,
  Plus,
  Save
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

export function MarketTrends() {
  const [selectedArea, setSelectedArea] = useState("all");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTrend, setNewTrend] = useState({
    title: "",
    description: "",
    trend_type: "price_change",
    area: "",
    impact_level: "medium"
  });
  const queryClient = useQueryClient();

  // Fetch real market trends from database
  const { data: trends, isLoading } = useQuery({
    queryKey: ['market-trends', selectedArea],
    queryFn: async () => {
      let query = supabase
        .from('market_trends')
        .select('*')
        .order('recorded_at', { ascending: false })
        .limit(20);
      
      if (selectedArea !== 'all') {
        query = query.eq('area', selectedArea);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch properties for stats
  const { data: properties } = useQuery({
    queryKey: ['properties-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('price, area, status, listing_type')
        .eq('status', 'available');
      if (error) throw error;
      return data || [];
    }
  });

  // Add trend mutation
  const addTrend = useMutation({
    mutationFn: async (trend: typeof newTrend) => {
      const { error } = await supabase
        .from('market_trends')
        .insert([{
          ...trend,
          source: 'manual',
          is_actionable: true
        }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['market-trends'] });
      setIsAddOpen(false);
      setNewTrend({
        title: "",
        description: "",
        trend_type: "price_change",
        area: "",
        impact_level: "medium"
      });
      toast.success("Market trend recorded");
    },
    onError: () => {
      toast.error("Failed to add trend");
    }
  });

  // Calculate stats from real properties
  const avgPrice = properties?.length 
    ? Math.round(properties.reduce((sum, p) => sum + (p.price || 0), 0) / properties.length)
    : 0;
  
  const activeListings = properties?.length || 0;
  
  const areaBreakdown = properties?.reduce((acc: Record<string, { count: number, totalPrice: number }>, p) => {
    if (!acc[p.area]) {
      acc[p.area] = { count: 0, totalPrice: 0 };
    }
    acc[p.area].count++;
    acc[p.area].totalPrice += p.price || 0;
    return acc;
  }, {}) || {};

  const areaData = Object.entries(areaBreakdown).map(([area, data]) => ({
    area,
    avgPrice: Math.round(data.totalPrice / data.count),
    count: data.count,
    demand: data.count > 5 ? "High" : data.count > 2 ? "Medium" : "Low"
  })).slice(0, 5);

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-market-analyzer', {
        body: { 
          type: 'market_trend',
          data: { 
            areaData, 
            avgPrice,
            activeListings,
            recentTrends: trends?.slice(0, 5)
          },
          context: `Analyze current property market trends for Peak District, Sheffield, Chesterfield, and Nottingham. 
                    Average property price: £${avgPrice.toLocaleString()}. 
                    Active listings: ${activeListings}.
                    Consider seasonal patterns, economic factors, and local developments.`
        }
      });

      if (error) throw error;
      setAiInsights(data.analysis);
      toast.success("Market Analysis Complete", {
        description: "AI insights have been generated"
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-accent/20 rounded-xl">
            <TrendingUp className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Market Trends</h2>
            <p className="text-muted-foreground">Monitor property market trends and get AI insights</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedArea} onValueChange={setSelectedArea}>
            <SelectTrigger className="w-[180px]">
              <MapPin className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Areas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              <SelectItem value="Peak District">Peak District</SelectItem>
              <SelectItem value="Sheffield">Sheffield</SelectItem>
              <SelectItem value="Chesterfield">Chesterfield</SelectItem>
              <SelectItem value="Nottingham">Nottingham</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Trend
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record Market Trend</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input 
                    value={newTrend.title}
                    onChange={(e) => setNewTrend({ ...newTrend, title: e.target.value })}
                    placeholder="e.g., Price increase in Peak District"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    value={newTrend.description}
                    onChange={(e) => setNewTrend({ ...newTrend, description: e.target.value })}
                    placeholder="Describe the market trend..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select 
                      value={newTrend.trend_type} 
                      onValueChange={(v) => setNewTrend({ ...newTrend, trend_type: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price_change">Price Change</SelectItem>
                        <SelectItem value="demand_shift">Demand Shift</SelectItem>
                        <SelectItem value="supply_change">Supply Change</SelectItem>
                        <SelectItem value="economic">Economic Factor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Impact Level</Label>
                    <Select 
                      value={newTrend.impact_level} 
                      onValueChange={(v) => setNewTrend({ ...newTrend, impact_level: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Area</Label>
                  <Input 
                    value={newTrend.area}
                    onChange={(e) => setNewTrend({ ...newTrend, area: e.target.value })}
                    placeholder="e.g., Sheffield"
                  />
                </div>
                <Button 
                  onClick={() => addTrend.mutate(newTrend)}
                  disabled={!newTrend.title || addTrend.isPending}
                  className="w-full"
                >
                  {addTrend.isPending ? "Saving..." : "Save Trend"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            onClick={handleRunAnalysis} 
            disabled={isAnalyzing}
            className="bg-accent hover:bg-accent/90"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                AI Analysis
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Home className="h-8 w-8 text-accent/60" />
                <Badge className="bg-green-500/20 text-green-500 border-0">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">
                £{avgPrice > 0 ? avgPrice.toLocaleString() : '—'}
              </p>
              <p className="text-sm text-muted-foreground">Avg. Property Price</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <BarChart3 className="h-8 w-8 text-accent/60" />
                <Badge variant="outline">Live</Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{activeListings}</p>
              <p className="text-sm text-muted-foreground">Active Listings</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-accent/60" />
                <Badge variant="secondary">Tracked</Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{trends?.length || 0}</p>
              <p className="text-sm text-muted-foreground">Market Trends</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <MapPin className="h-8 w-8 text-accent/60" />
                <Badge variant="outline">Areas</Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{Object.keys(areaBreakdown).length}</p>
              <p className="text-sm text-muted-foreground">Coverage Areas</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Area Breakdown */}
      {areaData.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Area Breakdown</CardTitle>
            <CardDescription>Property market performance by location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {areaData.map((area, index) => (
                <motion.div
                  key={area.area}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-accent/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    <Badge 
                      variant={area.demand === "High" ? "default" : area.demand === "Medium" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {area.demand}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-foreground">{area.area}</h4>
                  <p className="text-lg font-bold text-accent">
                    £{(area.avgPrice / 1000).toFixed(0)}k
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {area.count} listing{area.count !== 1 ? 's' : ''}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Trends */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Market Trends</CardTitle>
          <CardDescription>Latest recorded market observations</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-8 w-8 text-accent animate-spin" />
            </div>
          ) : trends?.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No Trends Recorded</h3>
              <p className="text-muted-foreground mb-4">
                Start recording market trends to track changes over time
              </p>
              <Button onClick={() => setIsAddOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Trend
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {trends.map((trend, index) => (
                <motion.div
                  key={trend.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-lg bg-secondary/50 border border-border"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{trend.title}</h4>
                        <Badge 
                          variant={
                            trend.impact_level === 'high' ? 'destructive' : 
                            trend.impact_level === 'medium' ? 'default' : 'outline'
                          }
                        >
                          {trend.impact_level}
                        </Badge>
                      </div>
                      {trend.description && (
                        <p className="text-sm text-muted-foreground">{trend.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(trend.recorded_at), "MMM d, yyyy")}
                        </span>
                        {trend.area && (
                          <span className="text-xs text-accent flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {trend.area}
                          </span>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {trend.trend_type.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Insights */}
      {aiInsights && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                AI Market Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.summary && (
                <p className="text-foreground">{aiInsights.summary}</p>
              )}
              {aiInsights.keyInsights && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Key Insights:</h4>
                  <ul className="space-y-1">
                    {aiInsights.keyInsights.map((insight: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ArrowUpRight className="h-4 w-4 text-accent mt-0.5" />
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {aiInsights.recommendations && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Recommendations:</h4>
                  <ul className="space-y-1">
                    {aiInsights.recommendations.map((rec: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Zap className="h-4 w-4 text-accent mt-0.5" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {aiInsights.actionItems && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Action Items:</h4>
                  <ul className="space-y-1">
                    {aiInsights.actionItems.map((action: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <AlertCircle className="h-4 w-4 text-accent mt-0.5" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
