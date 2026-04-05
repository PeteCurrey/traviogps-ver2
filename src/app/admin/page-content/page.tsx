"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileEdit, Save, RotateCcw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { usePageContent, PageContentData } from "@/hooks/usePageContent";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SectionEditorProps {
  pageKey: string;
  title: string;
  description: string;
  fields: { key: string; label: string; type?: "text" | "textarea" | "number" }[];
}

function SectionEditor({ pageKey, title, description, fields }: SectionEditorProps) {
  const { content, isLoading, updateContent, defaults } = usePageContent(pageKey);
  const [formData, setFormData] = useState<PageContentData>({});
  const [isOpen, setIsOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (content) {
      setFormData(content);
    }
  }, [content]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    updateContent.mutate(formData, {
      onSuccess: () => {
        toast.success(`${title} content saved successfully`);
        setHasChanges(false);
      },
      onError: (error) => {
        console.error("Save error:", error);
        toast.error("Failed to save content. Please check your connection.");
      },
    });
  };

  const handleReset = () => {
    if (defaults) {
      setFormData(defaults);
      setHasChanges(true);
      toast.info("Reset to default values. Click Save to apply.");
    }
  };

  if (isLoading) {
    return (
      <Card className="border border-border animate-pulse">
        <CardHeader className="h-20 bg-secondary/20" />
      </Card>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={cn("border transition-all duration-300", hasChanges ? "border-accent shadow-glow" : "border-border shadow-sm")}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-secondary/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg flex items-center gap-2 font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {title}
                  {hasChanges && (
                    <motion.span 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full uppercase tracking-wider font-bold"
                    >
                      Unsaved Changes
                    </motion.span>
                  )}
                </CardTitle>
                <CardDescription className="text-sm font-medium">{description}</CardDescription>
              </div>
              <div className={cn("p-2 rounded-full transition-colors", isOpen ? "bg-accent/10" : "bg-secondary/50")}>
                <ChevronDown className={cn("h-4 w-4 text-accent transition-transform duration-300", isOpen && "rotate-180")} />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6 pt-0 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/50">
              {fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={`${pageKey}-${field.key}`} className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {field.label}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={`${pageKey}-${field.key}`}
                      value={String(formData[field.key] ?? "")}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      rows={4}
                      className="bg-background border-border resize-none focus:ring-accent"
                    />
                  ) : (
                    <Input
                      id={`${pageKey}-${field.key}`}
                      type={field.type === "number" ? "number" : "text"}
                      value={String(formData[field.key] ?? "")}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="bg-background border-border focus:ring-accent"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 pt-6 border-t border-border/50">
              <Button 
                onClick={handleSave} 
                disabled={updateContent.isPending || !hasChanges} 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8"
              >
                {updateContent.isPending ? (
                  <div className="flex items-center gap-2">
                    <Save className="h-4 w-4 animate-spin" />
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Configuration
                  </div>
                )}
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg" className="font-bold">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Factory Defaults
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

const sections: SectionEditorProps[] = [
  {
    pageKey: "home_hero",
    title: "Landing — Hero Experience",
    description: "The primary entry point headlines and service identifiers",
    fields: [
      { key: "tagline", label: "Hero Navigation Tagline" },
      { key: "heading", label: "Main Structural Heading" },
      { key: "headingAccent", label: "Heading Accentuated Term" },
      { key: "card1Category", label: "Sector 1 — Category" },
      { key: "card1Title", label: "Sector 1 — Primary Title" },
      { key: "card1Accent", label: "Sector 1 — Highlighted Title" },
      { key: "card2Category", label: "Sector 2 — Category" },
      { key: "card2Title", label: "Sector 2 — Primary Title" },
      { key: "card2Accent", label: "Sector 2 — Highlighted Title" },
      { key: "card3Category", label: "Sector 3 — Category" },
      { key: "card3Title", label: "Sector 3 — Primary Title" },
      { key: "card3Accent", label: "Sector 3 — Highlighted Title" },
    ],
  },
  {
    pageKey: "home_stats",
    title: "Market Verification Stats",
    description: "Numerical validation of platform performance and scale",
    fields: [
      { key: "sectionLabel", label: "Block Identifier" },
      { key: "sectionHeading", label: "Block Primary Title" },
      { key: "stat1Value", label: "Metric 1 — Numerical Value" },
      { key: "stat1Suffix", label: "Metric 1 — Unit Suffix" },
      { key: "stat1Label", label: "Metric 1 — Descriptive Label" },
      { key: "stat2Value", label: "Metric 2 — Numerical Value" },
      { key: "stat2Suffix", label: "Metric 2 — Unit Suffix" },
      { key: "stat2Label", label: "Metric 2 — Descriptive Label" },
      { key: "stat3Value", label: "Metric 3 — Numerical Value" },
      { key: "stat3Suffix", label: "Metric 3 — Unit Suffix" },
      { key: "stat3Label", label: "Metric 3 — Descriptive Label" },
      { key: "stat4Value", label: "Metric 4 — Numerical Value" },
      { key: "stat4Prefix", label: "Metric 4 — Unit Prefix" },
      { key: "stat4Suffix", label: "Metric 4 — Unit Suffix" },
      { key: "stat4Label", label: "Metric 4 — Descriptive Label" },
    ],
  },
  {
    pageKey: "home_about",
    title: "Why Travio — Comparative Advantage",
    description: "Core mission statement and unique value propositions",
    fields: [
      { key: "sectionLabel", label: "Block Identifier" },
      { key: "heading", label: "Primary Narrative Title" },
      { key: "headingAccent", label: "Narrative Accentuation" },
      { key: "feature1", label: "Advantage Identifier 1" },
      { key: "feature2", label: "Advantage Identifier 2" },
      { key: "feature3", label: "Advantage Identifier 3" },
      { key: "feature4", label: "Advantage Identifier 4" },
      { key: "ctaText", label: "Primary Workflow Link" },
    ],
  },
  {
    pageKey: "home_services",
    title: "Operational Verticals",
    description: "Deep dive into the four specialized service modules",
    fields: [
      { key: "sectionLabel", label: "Block Identifier" },
      { key: "heading", label: "Module Overview Title" },
      { key: "headingAccent", label: "Overview Accentuation" },
      { key: "service1Title", label: "Vertical 1 — Nomenclature" },
      { key: "service1Description", label: "Vertical 1 — Abstract", type: "textarea" },
      { key: "service2Title", label: "Vertical 2 — Nomenclature" },
      { key: "service2Description", label: "Vertical 2 — Abstract", type: "textarea" },
      { key: "service3Title", label: "Vertical 3 — Nomenclature" },
      { key: "service3Description", label: "Vertical 3 — Abstract", type: "textarea" },
      { key: "service4Title", label: "Vertical 4 — Nomenclature" },
      { key: "service4Description", label: "Vertical 4 — Abstract", type: "textarea" },
    ],
  },
  {
    pageKey: "home_cta",
    title: "Conversion Gateway",
    description: "Final acquisition headlines and behavioral drivers",
    fields: [
      { key: "sectionLabel", label: "Block Identifier" },
      { key: "heading", label: "Acquisition Headline" },
      { key: "headingAccent", label: "Headline Accentuation" },
      { key: "description", label: "Acquisition Narrative", type: "textarea" },
      { key: "primaryCta", label: "Primary Acquisition Trigger" },
      { key: "secondaryCta", label: "Alternative Acquisition Trigger" },
    ],
  },
  // Solutions
  {
    pageKey: "vehicle_tracking_hero",
    title: "GPS Tracking — Strategic Hero",
    description: "Sector-specific entrance parameters and logic",
    fields: [
      { key: "label", label: "Strategic Identifier" },
      { key: "heading", label: "Strategic Narrative Title" },
      { key: "headingAccent", label: "Narrative Accentuation" },
      { key: "description", label: "Strategic Abstract", type: "textarea" },
    ],
  },
  {
    pageKey: "vehicle_tracking_features",
    title: "GPS Tracking — Capability Grid",
    description: "Granular breakdown of tracking-specific utility modules",
    fields: [
      { key: "sectionLabel", label: "Block Identifier" },
      { key: "heading", label: "Capability Overview Title" },
      { key: "headingAccent", label: "Capability Accentuation" },
      ...Array.from({ length: 8 }, (_, i) => [
        { key: `feature${i + 1}Title`, label: `Module ${i + 1} — Nomenclature` },
        { key: `feature${i + 1}Description`, label: `Module ${i + 1} — Abstract`, type: "textarea" as const },
      ]).flat(),
    ],
  },
  {
    pageKey: "vehicle_tracking_steps",
    title: "GPS Tracking — Deployment Logic",
    description: "The architectural onboarding process for new tracking systems",
    fields: [
      { key: "sectionLabel", label: "Block Identifier" },
      { key: "heading", label: "Process Map Title" },
      { key: "headingAccent", label: "Process Map Accentuation" },
      { key: "step1Number", label: "Stage 01 — Index" },
      { key: "step1Title", label: "Stage 01 — Protocol" },
      { key: "step1Description", label: "Stage 01 — Abstract", type: "textarea" },
      { key: "step2Number", label: "Stage 02 — Index" },
      { key: "step2Title", label: "Stage 02 — Protocol" },
      { key: "step2Description", label: "Stage 02 — Abstract", type: "textarea" },
      { key: "step3Number", label: "Stage 03 — Index" },
      { key: "step3Title", label: "Stage 03 — Protocol" },
      { key: "step3Description", label: "Stage 03 — Abstract", type: "textarea" },
    ],
  },
];

export default function PageContentAdminPage() {
  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-5 mb-3">
          <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center shadow-sm">
            <FileEdit className="h-7 w-7 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Platform Typography</h1>
            <p className="text-muted-foreground font-medium">
              Architect and manage structural content across your global fleet tracking surface
            </p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <motion.div
            key={section.pageKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 + 0.2 }}
          >
            <SectionEditor {...section} />
          </motion.div>
        ))}
      </div>
      
      <div className="p-8 border border-accent/10 bg-accent/5 rounded-2xl text-center">
        <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Centralized Content Infrastructure</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          All modifications here reflect instantly across the live production environment. 
          Use the 'Reset' function to revert specific modules to their baseline definitions.
        </p>
      </div>
    </div>
  );
}
