import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  FileText, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin,
  Mail,
  Zap,
  Copy,
  Check,
  RefreshCw,
  Save,
  Send
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

const contentTypes = [
  { id: "blog_post", label: "Blog Post", icon: FileText },
  { id: "social_facebook", label: "Facebook", icon: Facebook },
  { id: "social_instagram", label: "Instagram", icon: Instagram },
  { id: "social_twitter", label: "Twitter/X", icon: Twitter },
  { id: "social_linkedin", label: "LinkedIn", icon: Linkedin },
  { id: "email_campaign", label: "Email", icon: Mail },
];

const toneOptions = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly & Approachable" },
  { value: "luxury", label: "Premium & Luxury" },
  { value: "informative", label: "Informative & Educational" },
  { value: "urgent", label: "Urgent & Action-Oriented" },
];

export function ContentGenerator() {
  const [contentType, setContentType] = useState("blog_post");
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("professional");
  const [targetAudience, setTargetAudience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic) {
      toast.error("Please enter a topic");
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-content-generator', {
        body: {
          contentType,
          topic,
          keywords: keywords.split(',').map(k => k.trim()).filter(Boolean),
          tone,
          targetAudience: targetAudience || undefined
        }
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedContent(data.generated);
      toast.success("Content generated successfully!");
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error(error.message || "Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    const textToCopy = generatedContent?.content || generatedContent?.title || JSON.stringify(generatedContent, null, 2);
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveDraft = async () => {
    try {
      const { error } = await supabase
        .from('content_drafts')
        .insert([{
          content_type: contentType as any,
          title: generatedContent?.title || generatedContent?.subject || topic,
          content: generatedContent?.content || JSON.stringify(generatedContent),
          meta_description: generatedContent?.metaDescription || generatedContent?.previewText,
          keywords: generatedContent?.suggestedKeywords || keywords.split(',').map(k => k.trim()).filter(Boolean),
          ai_prompt: topic,
          status: 'draft'
        }]);

      if (error) throw error;
      toast.success("Draft saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save draft");
    }
  };

  const selectedType = contentTypes.find(t => t.id === contentType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl">
          <Lightbulb className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">AI Content Generator</h2>
          <p className="text-muted-foreground">Create compelling content powered by AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Content Settings</CardTitle>
            <CardDescription>Configure what you want to generate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Content Type Selection */}
            <div className="space-y-2">
              <Label>Content Type</Label>
              <div className="grid grid-cols-3 gap-2">
                {contentTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={contentType === type.id ? "default" : "outline"}
                    className={`flex flex-col h-auto py-3 ${
                      contentType === type.id ? "bg-accent hover:bg-accent/90" : ""
                    }`}
                    onClick={() => setContentType(type.id)}
                  >
                    <type.icon className="h-5 w-5 mb-1" />
                    <span className="text-xs">{type.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Topic */}
            <div className="space-y-2">
              <Label>Topic / Subject</Label>
              <Textarea
                placeholder="e.g., 5 tips for first-time home buyers in the Peak District"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={3}
              />
            </div>

            {/* Keywords */}
            <div className="space-y-2">
              <Label>Target Keywords (comma separated)</Label>
              <Input
                placeholder="e.g., Peak District, first-time buyers, property tips"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>

            {/* Tone */}
            <div className="space-y-2">
              <Label>Tone of Voice</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {toneOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Target Audience */}
            <div className="space-y-2">
              <Label>Target Audience (optional)</Label>
              <Input
                placeholder="e.g., Young professionals, families, retirees"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>

            {/* Generate Button */}
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !topic}
              className="w-full bg-accent hover:bg-accent/90"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  Generate Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {selectedType && <selectedType.icon className="h-5 w-5 text-accent" />}
                  Generated Content
                </CardTitle>
                <CardDescription>Review and edit before publishing</CardDescription>
              </div>
              {generatedContent && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSaveDraft}>
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-16">
                <RefreshCw className="h-12 w-12 text-accent animate-spin mb-4" />
                <p className="text-muted-foreground">AI is crafting your content...</p>
              </div>
            ) : generatedContent ? (
              <div className="space-y-4">
                {/* Title */}
                {(generatedContent.title || generatedContent.subject) && (
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <Label className="text-xs text-muted-foreground">
                      {generatedContent.subject ? "Subject Line" : "Title"}
                    </Label>
                    <h3 className="font-semibold text-foreground mt-1">
                      {generatedContent.title || generatedContent.subject}
                    </h3>
                  </div>
                )}

                {/* Meta Description / Preview Text */}
                {(generatedContent.metaDescription || generatedContent.previewText) && (
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <Label className="text-xs text-muted-foreground">
                      {generatedContent.previewText ? "Preview Text" : "Meta Description"}
                    </Label>
                    <p className="text-sm text-foreground mt-1">
                      {generatedContent.metaDescription || generatedContent.previewText}
                    </p>
                  </div>
                )}

                {/* Main Content */}
                {generatedContent.content && (
                  <div className="p-4 bg-secondary/50 rounded-lg max-h-[400px] overflow-y-auto">
                    <Label className="text-xs text-muted-foreground mb-2 block">Content</Label>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{generatedContent.content}</ReactMarkdown>
                    </div>
                  </div>
                )}

                {/* Keywords/Hashtags */}
                {(generatedContent.suggestedKeywords || generatedContent.suggestedHashtags) && (
                  <div className="flex flex-wrap gap-2">
                    {(generatedContent.suggestedKeywords || generatedContent.suggestedHashtags)?.map(
                      (tag: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </Badge>
                      )
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button onClick={handleSaveDraft} variant="outline" className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button className="flex-1 bg-accent hover:bg-accent/90">
                    <Send className="h-4 w-4 mr-2" />
                    Publish
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Lightbulb className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Ready to Create</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Enter your topic and settings, then click Generate to create AI-powered content
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
