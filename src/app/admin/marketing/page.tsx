"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Search, 
  Users, 
  Mail, 
  Bell,
  TrendingUp,
  Zap,
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

export default function MarketingAdminPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-8">
      {/* Header Hub */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-5 mb-3">
          <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center shadow-sm">
            <Zap className="h-7 w-7 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Marketing Intelligence</h1>
            <p className="text-muted-foreground font-medium">
              AI-powered acquisition analytics, competitive monitoring, and narrative generation
            </p>
          </div>
        </div>
      </motion.div>

      {/* Control Surface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md py-4 -mx-4 px-4 border-b border-border shadow-sm overflow-x-auto no-scrollbar">
          <TabsList className="bg-secondary/30 p-1.5 h-auto flex gap-2 w-max min-w-full lg:min-w-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-glow transition-all font-bold text-sm"
              >
                <tab.icon className={cn("h-4 w-4", activeTab === tab.id ? "animate-pulse" : "")} />
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="min-h-[600px]">
          <TabsContent value="overview" className="mt-0 focus-visible:outline-none">
            <MarketingOverview />
          </TabsContent>

          <TabsContent value="seo" className="mt-0 focus-visible:outline-none">
            <SEODashboard />
          </TabsContent>

          <TabsContent value="competitors" className="mt-0 focus-visible:outline-none">
            <CompetitorDashboard />
          </TabsContent>

          <TabsContent value="content" className="mt-0 focus-visible:outline-none">
            <ContentGenerator />
          </TabsContent>

          <TabsContent value="trends" className="mt-0 focus-visible:outline-none">
            <MarketTrends />
          </TabsContent>

          <TabsContent value="email" className="mt-0 focus-visible:outline-none">
            <EmailCampaigns />
          </TabsContent>

          <TabsContent value="notifications" className="mt-0 focus-visible:outline-none">
            <NotificationCenter />
          </TabsContent>
        </div>
      </Tabs>
      
      {/* Infrastructure Note */}
      <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6 mt-12 flex items-center gap-4">
        <div className="p-3 bg-accent/20 rounded-full">
          <Lightbulb className="h-5 w-5 text-accent" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">Strategic Intelligence Node</p>
          <p className="text-xs text-muted-foreground">All marketing metrics are synthesized in real-time using distributed acquisition data from the Travio network.</p>
        </div>
      </div>
    </div>
  );
}

// Helper for conditional classes if not already available
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
