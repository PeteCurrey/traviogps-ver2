import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface AnalysisRequest {
  type: 'market_trend' | 'competitor_analysis' | 'seo_recommendations' | 'content_ideas';
  data?: Record<string, unknown>;
  context?: string;
}

const SYSTEM_PROMPTS: Record<string, string> = {
  market_trend: `You are an expert fleet management and telematics market analyst for the UK. Analyze market trends and provide actionable insights.

Consider:
- Fleet technology adoption trends
- Fuel cost movements and EV transition
- Regulatory changes (tachograph, DVSA compliance)
- Competitor pricing and market positioning
- Seasonal fleet management patterns

Provide your analysis as JSON with: { "summary": "", "keyInsights": [], "recommendations": [], "impactLevel": "low|medium|high", "actionItems": [] }`,

  competitor_analysis: `You are a competitive intelligence analyst for a fleet management and GPS tracking company. Analyze competitor activities and market positioning.

Consider:
- Pricing strategies for tracking and telematics
- Technology offerings and feature sets
- Market share and customer segments
- Strengths and weaknesses
- Go-to-market strategies

Provide your analysis as JSON with: { "summary": "", "competitorStrengths": [], "opportunities": [], "threats": [], "recommendations": [] }`,

  seo_recommendations: `You are an SEO expert specializing in fleet management and telematics websites. Provide actionable SEO recommendations.

Consider:
- Keyword opportunities for fleet tracking, dash cams, vehicle management
- Content gaps in fleet management topics
- Technical SEO issues
- Local SEO optimization for UK businesses
- Competitor keyword strategies

Provide your analysis as JSON with: { "summary": "", "priorityKeywords": [], "contentIdeas": [], "technicalFixes": [], "quickWins": [] }`,

  content_ideas: `You are a content strategist for Travio, a fleet management and GPS tracking company serving UK businesses. Generate content ideas that will drive engagement and leads.

Consider:
- Current fleet industry trends
- Seasonal business patterns
- Regulatory updates and compliance topics
- Technology innovations in telematics
- Customer pain points around fleet costs and efficiency

Provide your ideas as JSON with: { "blogTopics": [], "socialMediaIdeas": [], "emailCampaigns": [], "videoContent": [], "seasonalContent": [] }`
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { type, data, context }: AnalysisRequest = await req.json();

    if (!type) {
      return new Response(
        JSON.stringify({ error: "Analysis type is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = SYSTEM_PROMPTS[type];
    if (!systemPrompt) {
      return new Response(
        JSON.stringify({ error: "Invalid analysis type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let userPrompt = `Analyze the following and provide insights:\n\n`;
    if (data) userPrompt += `Data: ${JSON.stringify(data, null, 2)}\n\n`;
    if (context) userPrompt += `Context: ${context}\n\n`;
    userPrompt += `Provide a comprehensive analysis with actionable recommendations.`;

    console.log("Running AI analysis:", type);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add more credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content;

    let parsedContent;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedContent = JSON.parse(jsonMatch[0]);
      } else {
        parsedContent = { analysis: content };
      }
    } catch {
      parsedContent = { analysis: content };
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        analysis: parsedContent,
        type
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Analysis error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
