"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, User, Building, Bell, Shield, Globe, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "User Identity", icon: User },
  { id: "company", label: "Organization", icon: Building },
  { id: "notifications", label: "Internal Comms", icon: Bell },
  { id: "security", label: "Systems & Security", icon: Shield },
];

export default function SettingsAdminPage() {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API persistence
    await new Promise((resolve) => setTimeout(resolve, 1200));
    toast({
      title: "Configurations Persisted",
      description: "Platform parameters have been synchronized with the master database.",
    });
    setIsSaving(false);
  };

  return (
    <div className="space-y-10">
      {/* Header Hub */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center shadow-sm">
            <ShieldCheck className="h-7 w-7 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Platform Node Settings</h1>
            <p className="text-muted-foreground font-medium">Architect the structural and operational parameters of your Travio workspace</p>
          </div>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="h-14 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg rounded-xl shadow-glow min-w-[220px]"
        >
          {isSaving ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-accent-foreground border-t-transparent rounded-full" />
              Synchronizing...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Save className="h-5 w-5" />
              Persist Changes
            </div>
          )}
        </Button>
      </div>

      {/* Control Surface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Navigation Rail */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold transition-all duration-300 border",
                activeTab === tab.id
                  ? "bg-accent text-accent-foreground border-accent shadow-glow translate-x-2"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-accent/30"
              )}
            >
              <tab.icon className={cn("h-5 w-5", activeTab === tab.id ? "animate-pulse" : "")} />
              {tab.label}
            </button>
          ))}
          
          <div className="p-6 mt-8 bg-secondary/30 rounded-2xl border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-accent" />
              <p className="text-xs font-bold text-foreground uppercase tracking-wider">System Status</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[11px] font-medium text-muted-foreground">All operational nodes active</p>
            </div>
          </div>
        </div>

        {/* Dynamic Workspace */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-border rounded-2xl p-10 shadow-sm min-h-[500px]"
            >
              {activeTab === "profile" && (
                <div className="max-w-xl space-y-10">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>User Specification</h2>
                    <p className="text-muted-foreground font-medium">Manage your personal identification and access tier within the node.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Master Identifier (Email)</label>
                      <Input
                        value={user?.email || ""}
                        disabled
                        className="bg-secondary border-border h-12 font-mono text-sm cursor-not-allowed opacity-70"
                      />
                      <p className="text-[10px] text-muted-foreground italic">
                        Master identifier is immutable for security protocol. Contact administrator to rotate node ownership.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Nomenclature A (First)</label>
                        <Input className="bg-background border-border h-12 font-bold focus:ring-accent" placeholder="Enter given name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Nomenclature B (Last)</label>
                        <Input className="bg-background border-border h-12 font-bold focus:ring-accent" placeholder="Enter familial name" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Privilege Assessment</label>
                      <div className="flex items-center gap-3 p-4 bg-accent/5 border border-accent/10 rounded-xl">
                        <Shield className="h-5 w-5 text-accent" />
                        <div>
                          <p className="text-sm font-bold text-foreground uppercase tracking-wider">{isAdmin ? "Architect (Admin)" : "Operative (Staff)"}</p>
                          <p className="text-[11px] text-muted-foreground">Full structural access to platform parameters enabled.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "company" && (
                <div className="max-w-xl space-y-10">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Organization Topology</h2>
                    <p className="text-muted-foreground font-medium">Calibrate the nomenclature and geographical identifiers of your organization.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Organization Nomenclature</label>
                      <Input
                        defaultValue="Travio UK Fleet"
                        className="bg-background border-border h-12 font-bold focus:ring-accent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Central Voice Line</label>
                        <Input
                          defaultValue="+44 (0) 800 123 4567"
                          className="bg-background border-border h-12 font-bold focus:ring-accent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Central Comms Node</label>
                        <Input
                          defaultValue="hello@travio.co.uk"
                          className="bg-background border-border h-12 font-bold focus:ring-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Geographical Headquarters</label>
                      <Textarea
                        defaultValue="Travio Strategic HQ, Electric Works, Sheffield, UK"
                        className="bg-background border-border min-h-[100px] font-medium resize-none focus:ring-accent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="max-w-xl space-y-10">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Comms Protocols</h2>
                    <p className="text-muted-foreground font-medium">Configure internal alert logic for high-value acquisition activities.</p>
                  </div>
                  
                  <div className="space-y-8">
                    {[
                      { 
                        title: "Acquisition Alerts", 
                        desc: "Broadcast instant notification on new structural enquiries.",
                        active: true 
                      },
                      { 
                        title: "Demo Logic Broadcast", 
                        desc: "Alert operative team when live demo sequences are requested.",
                        active: true 
                      },
                      { 
                        title: "Weekly Strategic Digest", 
                        desc: "Aggregate platform performance data into weekly analytical digests.",
                        active: false 
                      },
                      { 
                        title: "Valuation Intent Triggers", 
                        desc: "Automated alert for high-value fleet valuation requests.",
                        active: true 
                      }
                    ].map((pref, i) => (
                      <div key={i} className="flex items-center justify-between group p-4 hover:bg-secondary/20 rounded-xl transition-all">
                        <div className="space-y-1">
                          <p className="text-foreground font-bold">{pref.title}</p>
                          <p className="text-xs text-muted-foreground font-medium">
                            {pref.desc}
                          </p>
                        </div>
                        <Switch defaultChecked={pref.active} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="max-w-xl space-y-10">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Security Protocol</h2>
                    <p className="text-muted-foreground font-medium">Manage encryption tiers and platform access security parameters.</p>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="p-6 bg-accent/5 border border-accent/10 rounded-2xl flex flex-col gap-6">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-accent" />
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Access Monitoring</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Currently tracking 4 active sessions across 2 geographical locations. All connections are encrypted via TLS 1.3.
                      </p>
                      <Button variant="outline" className="w-fit font-bold border-2">Rotate Access Keys</Button>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                        <div>
                          <p className="text-foreground font-bold">Two-Factor Authentication</p>
                          <p className="text-[11px] text-muted-foreground">Require secondary device verification for all login operations.</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                        <div>
                          <p className="text-foreground font-bold">Advanced Audit Logs</p>
                          <p className="text-[11px] text-muted-foreground">Log every interaction with the master platform database.</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
