import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Search, 
  Users, 
  FileText, 
  Mail, 
  Bell,
  TrendingUp,
  Zap,
  Target,
  Lightbulb
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketingOverview } from "@/components/admin/marketing/MarketingOverview";
import { SEODashboard } from "@/components/admin/marketing/SEODashboard";
import { CompetitorDashboard } from "@/components/admin/marketing/CompetitorDashboard";
import { ContentGenerator } from "@/components/admin/marketing/ContentGenerator";
import { EmailCampaigns } from "@/components/admin/marketing/EmailCampaigns";
import { NotificationCenter } from "@/components/admin/marketing/NotificationCenter";
import { MarketTrends } from "@/components/admin/marketing/MarketTrends";

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "seo", label: "SEO", icon: Search },
  { id: "competitors", label: "Competitors", icon: Users },
  { id: "content", label: "AI Content", icon: Lightbulb },
  { id: "trends", label: "Market Trends", icon: TrendingUp },
  { id: "email", label: "Email", icon: Mail },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-accent/20 rounded-lg">
            <Zap className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Marketing Hub</h1>
            <p className="text-muted-foreground">
              AI-powered marketing analytics, content generation, and competitor monitoring
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card border border-border p-1 h-auto flex-wrap gap-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <MarketingOverview />
        </TabsContent>

        <TabsContent value="seo" className="mt-6">
          <SEODashboard />
        </TabsContent>

        <TabsContent value="competitors" className="mt-6">
          <CompetitorDashboard />
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <ContentGenerator />
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <MarketTrends />
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <EmailCampaigns />
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <NotificationCenter />
        </TabsContent>
      </Tabs>
    </div>
  );
}
