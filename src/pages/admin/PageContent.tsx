import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileEdit, Save, RotateCcw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { usePageContent, defaultContent, PageContentData } from "@/hooks/usePageContent";
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
        toast.success(`${title} content saved`);
        setHasChanges(false);
      },
      onError: () => toast.error("Failed to save content"),
    });
  };

  const handleReset = () => {
    if (defaults) {
      setFormData(defaults);
      setHasChanges(true);
    }
  };

  if (isLoading) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={cn("border", hasChanges && "border-accent/50")}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-secondary/30 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  {title}
                  {hasChanges && (
                    <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">Unsaved</span>
                  )}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
              </div>
              <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-4 pt-0">
            {fields.map((field) => (
              <div key={field.key} className="space-y-1.5">
                <Label htmlFor={`${pageKey}-${field.key}`} className="text-sm">
                  {field.label}
                </Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={`${pageKey}-${field.key}`}
                    value={String(formData[field.key] ?? "")}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    rows={3}
                  />
                ) : (
                  <Input
                    id={`${pageKey}-${field.key}`}
                    type={field.type === "number" ? "number" : "text"}
                    value={String(formData[field.key] ?? "")}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                )}
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} disabled={updateContent.isPending || !hasChanges} size="sm">
                <Save className="h-4 w-4 mr-2" />
                {updateContent.isPending ? "Saving..." : "Save Changes"}
              </Button>
              <Button onClick={handleReset} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Defaults
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
    title: "Homepage — Hero Section",
    description: "The main hero area with 3 service cards and tagline",
    fields: [
      { key: "tagline", label: "Bottom Tagline" },
      { key: "heading", label: "Bottom Heading" },
      { key: "headingAccent", label: "Bottom Heading (Accent)" },
      { key: "card1Category", label: "Card 1 — Category Label" },
      { key: "card1Title", label: "Card 1 — Title" },
      { key: "card1Accent", label: "Card 1 — Accent Text" },
      { key: "card2Category", label: "Card 2 — Category Label" },
      { key: "card2Title", label: "Card 2 — Title" },
      { key: "card2Accent", label: "Card 2 — Accent Text" },
      { key: "card3Category", label: "Card 3 — Category Label" },
      { key: "card3Title", label: "Card 3 — Title" },
      { key: "card3Accent", label: "Card 3 — Accent Text" },
    ],
  },
  {
    pageKey: "home_stats",
    title: "Homepage — Stats Section",
    description: "Key statistics displayed in the stats bar",
    fields: [
      { key: "sectionLabel", label: "Section Label" },
      { key: "sectionHeading", label: "Section Heading" },
      { key: "stat1Value", label: "Stat 1 — Value" },
      { key: "stat1Suffix", label: "Stat 1 — Suffix" },
      { key: "stat1Label", label: "Stat 1 — Label" },
      { key: "stat2Value", label: "Stat 2 — Value" },
      { key: "stat2Suffix", label: "Stat 2 — Suffix" },
      { key: "stat2Label", label: "Stat 2 — Label" },
      { key: "stat3Value", label: "Stat 3 — Value" },
      { key: "stat3Suffix", label: "Stat 3 — Suffix" },
      { key: "stat3Label", label: "Stat 3 — Label" },
      { key: "stat4Value", label: "Stat 4 — Value" },
      { key: "stat4Prefix", label: "Stat 4 — Prefix" },
      { key: "stat4Suffix", label: "Stat 4 — Suffix" },
      { key: "stat4Label", label: "Stat 4 — Label" },
    ],
  },
  {
    pageKey: "home_about",
    title: "Homepage — About / Why Travio",
    description: "The about section with feature bullet points",
    fields: [
      { key: "sectionLabel", label: "Section Label" },
      { key: "heading", label: "Heading" },
      { key: "headingAccent", label: "Heading (Accent)" },
      { key: "feature1", label: "Feature 1" },
      { key: "feature2", label: "Feature 2" },
      { key: "feature3", label: "Feature 3" },
      { key: "feature4", label: "Feature 4" },
      { key: "ctaText", label: "CTA Link Text" },
    ],
  },
  {
    pageKey: "home_services",
    title: "Homepage — Services / Benefits",
    description: "The four service/benefit cards",
    fields: [
      { key: "sectionLabel", label: "Section Label" },
      { key: "heading", label: "Heading" },
      { key: "headingAccent", label: "Heading (Accent)" },
      { key: "service1Title", label: "Service 1 — Title" },
      { key: "service1Description", label: "Service 1 — Description", type: "textarea" },
      { key: "service2Title", label: "Service 2 — Title" },
      { key: "service2Description", label: "Service 2 — Description", type: "textarea" },
      { key: "service3Title", label: "Service 3 — Title" },
      { key: "service3Description", label: "Service 3 — Description", type: "textarea" },
      { key: "service4Title", label: "Service 4 — Title" },
      { key: "service4Description", label: "Service 4 — Description", type: "textarea" },
    ],
  },
  {
    pageKey: "home_cta",
    title: "Homepage — Call to Action",
    description: "The bottom CTA section",
    fields: [
      { key: "sectionLabel", label: "Section Label" },
      { key: "heading", label: "Heading" },
      { key: "headingAccent", label: "Heading (Accent)" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "primaryCta", label: "Primary Button Text" },
      { key: "secondaryCta", label: "Secondary Button Text" },
    ],
  },
  // Vehicle Tracking
  {
    pageKey: "vehicle_tracking_hero",
    title: "Vehicle Tracking — Hero",
    description: "Hero section heading and description",
    fields: [
      { key: "label", label: "Label" },
      { key: "heading", label: "Heading" },
      { key: "headingAccent", label: "Heading (Accent)" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    pageKey: "vehicle_tracking_features",
    title: "Vehicle Tracking — Features",
    description: "The 8 feature cards on the tracking page",
    fields: [
      { key: "sectionLabel", label: "Section Label" },
      { key: "heading", label: "Heading" },
      { key: "headingAccent", label: "Heading (Accent)" },
      ...Array.from({ length: 8 }, (_, i) => [
        { key: `feature${i + 1}Title`, label: `Feature ${i + 1} — Title` },
        { key: `feature${i + 1}Description`, label: `Feature ${i + 1} — Description`, type: "textarea" as const },
      ]).flat(),
    ],
  },
  {
    pageKey: "vehicle_tracking_steps",
    title: "Vehicle Tracking — How It Works",
    description: "The 3-step process section",
    fields: [
      { key: "sectionLabel", label: "Section Label" },
      { key: "heading", label: "Heading" },
      { key: "headingAccent", label: "Heading (Accent)" },
      { key: "step1Number", label: "Step 1 — Number" },
      { key: "step1Title", label: "Step 1 — Title" },
      { key: "step1Description", label: "Step 1 — Description", type: "textarea" },
      { key: "step2Number", label: "Step 2 — Number" },
      { key: "step2Title", label: "Step 2 — Title" },
      { key: "step2Description", label: "Step 2 — Description", type: "textarea" },
      { key: "step3Number", label: "Step 3 — Number" },
      { key: "step3Title", label: "Step 3 — Title" },
      { key: "step3Description", label: "Step 3 — Description", type: "textarea" },
    ],
  },
  {
    pageKey: "vehicle_tracking_cta",
    title: "Vehicle Tracking — CTA",
    description: "Bottom call-to-action section",
    fields: [
      { key: "heading", label: "Heading" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "primaryCta", label: "Primary Button Text" },
      { key: "secondaryCta", label: "Secondary Button Text" },
    ],
  },
  // Dash Cams
  {
    pageKey: "dashcams_hero",
    title: "Dash Cams — Hero",
    description: "Hero section heading and description",
    fields: [
      { key: "label", label: "Label" },
      { key: "heading", label: "Heading" },
      { key: "headingAccent", label: "Heading (Accent)" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    pageKey: "dashcams_features",
    title: "Dash Cams — Features",
    description: "The 8 feature cards on the dash cams page",
    fields: [
      { key: "sectionLabel", label: "Section Label" },
      { key: "heading", label: "Heading" },
      { key: "headingAccent", label: "Heading (Accent)" },
      ...Array.from({ length: 8 }, (_, i) => [
        { key: `feature${i + 1}Title`, label: `Feature ${i + 1} — Title` },
        { key: `feature${i + 1}Description`, label: `Feature ${i + 1} — Description`, type: "textarea" as const },
      ]).flat(),
    ],
  },
  {
    pageKey: "dashcams_cta",
    title: "Dash Cams — CTA",
    description: "Bottom call-to-action section",
    fields: [
      { key: "heading", label: "Heading" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "primaryCta", label: "Primary Button Text" },
      { key: "secondaryCta", label: "Secondary Button Text" },
    ],
  },
  // Fleet Management
  {
    pageKey: "fleet_mgmt_hero",
    title: "Fleet Management — Hero",
    description: "Hero section heading and description",
    fields: [
      { key: "label", label: "Label" },
      { key: "heading", label: "Heading" },
      { key: "headingAccent", label: "Heading (Accent)" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    pageKey: "fleet_mgmt_features",
    title: "Fleet Management — Features",
    description: "The 8 feature cards on the fleet management page",
    fields: [
      { key: "sectionLabel", label: "Section Label" },
      { key: "heading", label: "Heading" },
      { key: "headingAccent", label: "Heading (Accent)" },
      ...Array.from({ length: 8 }, (_, i) => [
        { key: `feature${i + 1}Title`, label: `Feature ${i + 1} — Title` },
        { key: `feature${i + 1}Description`, label: `Feature ${i + 1} — Description`, type: "textarea" as const },
      ]).flat(),
    ],
  },
  {
    pageKey: "fleet_mgmt_cta",
    title: "Fleet Management — CTA",
    description: "Bottom call-to-action section",
    fields: [
      { key: "heading", label: "Heading" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "primaryCta", label: "Primary Button Text" },
      { key: "secondaryCta", label: "Secondary Button Text" },
    ],
  },
];

export default function PageContentAdmin() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-accent/20 rounded-lg">
            <FileEdit className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Page Content</h1>
            <p className="text-muted-foreground">
              Edit text, headings, and descriptions across your website pages
            </p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        {sections.map((section, i) => (
          <motion.div
            key={section.pageKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <SectionEditor {...section} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
