import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  Target,
  FileText,
  AlertTriangle,
  CheckCircle,
  Zap,
  RefreshCw,
  Plus,
  Save,
  Lightbulb
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function SEODashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [aiRecommendations, setAiRecommendations] = useState<any>(null);
  const queryClient = useQueryClient();

  // Fetch real SEO analytics from database
  const { data: seoData, isLoading } = useQuery({
    queryKey: ['seo-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_analytics')
        .select('*')
        .order('recorded_at', { ascending: false });
      if (error) throw error;
      return data || [];
    }
  });

  // Get unique keywords with latest data
  const keywordData = seoData?.reduce((acc: any[], item) => {
    const existing = acc.find(k => k.keyword === item.keyword);
    if (!existing && item.keyword) {
      acc.push({
        keyword: item.keyword,
        rank: item.current_rank,
        prevRank: item.previous_rank,
        volume: item.search_volume || 0,
        difficulty: item.difficulty_score || 50
      });
    }
    return acc;
  }, []) || [];

  // Add keyword mutation
  const addKeyword = useMutation({
    mutationFn: async (keyword: string) => {
      const { error } = await supabase
        .from('seo_analytics')
        .insert([{
          keyword,
          page_url: '/',
          current_rank: null,
          search_volume: null,
          difficulty_score: null,
          data_source: 'manual'
        }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seo-analytics'] });
      setNewKeyword("");
      toast.success("Keyword added for tracking");
    },
    onError: () => {
      toast.error("Failed to add keyword");
    }
  });

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-market-analyzer', {
        body: { 
          type: 'seo_recommendations',
          data: keywordData,
          context: 'Analyze SEO performance for Dales & Peaks estate agency website covering Peak District, Sheffield, Chesterfield, and Nottingham. Current tracked keywords and their rankings are provided.'
        }
      });

      if (error) throw error;
      
      if (data.analysis) {
        setAiRecommendations(data.analysis);
      }
      
      toast.success("SEO Analysis Complete", {
        description: "AI recommendations have been generated"
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Calculate stats
  const avgRank = keywordData.length > 0 
    ? (keywordData.reduce((sum, k) => sum + (k.rank || 100), 0) / keywordData.length).toFixed(1)
    : '—';
  
  const rankingKeywords = keywordData.filter(k => k.rank && k.rank <= 10).length;
  const seoScore = keywordData.length > 0 
    ? Math.round(70 + (rankingKeywords / keywordData.length) * 30) 
    : 0;

  return (
    <div className="space-y-6">
      {/* SEO Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">Overall SEO Score</p>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{seoScore}/100</div>
              <Progress value={seoScore} className="h-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">Keywords Tracked</p>
                <Search className="h-5 w-5 text-accent" />
              </div>
              <div className="text-3xl font-bold text-foreground">{keywordData.length}</div>
              <p className="text-sm text-muted-foreground">Active keywords</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">Avg. Position</p>
                <Target className="h-5 w-5 text-accent" />
              </div>
              <div className="text-3xl font-bold text-foreground">{avgRank}</div>
              <p className="text-sm text-green-500 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Improving
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">Top 10 Rankings</p>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-foreground">{rankingKeywords}</div>
              <p className="text-sm text-muted-foreground">of {keywordData.length} keywords</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Analysis Button */}
      <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/20 rounded-xl">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI SEO Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Get AI-powered recommendations to improve your search rankings
                </p>
              </div>
            </div>
            <Button onClick={handleRunAnalysis} disabled={isAnalyzing} className="bg-accent hover:bg-accent/90">
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      {aiRecommendations && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiRecommendations.summary && (
                <p className="text-foreground">{aiRecommendations.summary}</p>
              )}
              
              {aiRecommendations.priorityKeywords?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Priority Keywords:</h4>
                  <div className="flex flex-wrap gap-2">
                    {aiRecommendations.priorityKeywords.map((kw: string, i: number) => (
                      <Badge key={i} variant="secondary">{kw}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {aiRecommendations.quickWins?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Quick Wins:</h4>
                  <ul className="space-y-1">
                    {aiRecommendations.quickWins.map((win: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        {win}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {aiRecommendations.contentIdeas?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Content Ideas:</h4>
                  <ul className="space-y-1">
                    {aiRecommendations.contentIdeas.map((idea: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4 text-accent mt-0.5" />
                        {idea}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Keyword Rankings */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Keyword Rankings</CardTitle>
                  <CardDescription>Track your search engine positions</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Add keyword..." 
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newKeyword.trim()) {
                        addKeyword.mutate(newKeyword.trim());
                      }
                    }}
                    className="w-48"
                  />
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      if (newKeyword.trim()) {
                        addKeyword.mutate(newKeyword.trim());
                      }
                    }}
                    disabled={addKeyword.isPending}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="h-8 w-8 text-accent animate-spin" />
                </div>
              ) : keywordData.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">No Keywords Tracked</h3>
                  <p className="text-muted-foreground mb-4">
                    Add keywords to start tracking your search rankings
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead className="text-center">Rank</TableHead>
                      <TableHead className="text-center">Change</TableHead>
                      <TableHead className="text-center">Volume</TableHead>
                      <TableHead className="text-center">Difficulty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {keywordData.map((kw, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{kw.keyword}</TableCell>
                        <TableCell className="text-center">
                          {kw.rank ? (
                            <Badge variant="outline" className="font-mono">
                              #{kw.rank}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {kw.rank && kw.prevRank ? (
                            kw.rank < kw.prevRank ? (
                              <span className="text-green-500 flex items-center justify-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                +{kw.prevRank - kw.rank}
                              </span>
                            ) : kw.rank > kw.prevRank ? (
                              <span className="text-red-500 flex items-center justify-center gap-1">
                                <TrendingDown className="h-3 w-3" />
                                -{kw.rank - kw.prevRank}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground">
                          {kw.volume ? kw.volume.toLocaleString() : '—'}
                        </TableCell>
                        <TableCell className="text-center">
                          {kw.difficulty ? (
                            <div className="flex items-center justify-center gap-2">
                              <Progress 
                                value={kw.difficulty} 
                                className="w-16 h-2" 
                              />
                              <span className="text-xs text-muted-foreground">{kw.difficulty}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* SEO Tips */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Quick Tips</CardTitle>
            <CardDescription>SEO best practices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg border border-accent/30 bg-accent/5">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Add local keywords</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Target phrases like "estate agents [area name]" for local search visibility
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-border bg-secondary/50">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Create area guides</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Detailed local content helps rank for location-based searches
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-border bg-secondary/50">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Optimize property pages</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Include location, property type, and features in titles
                  </p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              View Full SEO Guide
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
