import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContentRequest {
  contentType: 'blog_post' | 'social_facebook' | 'social_instagram' | 'social_twitter' | 'social_linkedin' | 'email_campaign';
  topic: string;
  keywords?: string[];
  tone?: string;
  targetAudience?: string;
  additionalContext?: string;
}

const SYSTEM_PROMPTS: Record<string, string> = {
  blog_post: `You are an expert real estate content writer for Dales & Peaks, a premium estate agency covering the Peak District, Sheffield, Chesterfield, and Nottingham. 
Write engaging, SEO-optimized blog posts that:
- Appeal to property buyers, sellers, and renters in the area
- Include local area knowledge and property market insights
- Use a professional yet approachable tone
- Include a compelling title, meta description, and structured content with headings
- Naturally incorporate relevant keywords

Format your response as JSON with: { "title": "", "metaDescription": "", "content": "" (use markdown), "suggestedKeywords": [] }`,

  social_facebook: `You are a social media expert for Dales & Peaks, a premium estate agency. Create engaging Facebook posts that:
- Are conversational and community-focused
- Include calls to action
- Are optimized for engagement (likes, comments, shares)
- Use 1-2 relevant emojis naturally
- Are 100-200 words max

Format your response as JSON with: { "title": "", "content": "", "suggestedHashtags": [] }`,

  social_instagram: `You are an Instagram content creator for Dales & Peaks estate agency. Create captivating Instagram captions that:
- Tell a story and evoke emotion
- Are visually descriptive to complement property images
- Include a clear call to action
- Use relevant hashtags (suggest 10-15)
- Are 150-200 words before hashtags

Format your response as JSON with: { "title": "", "content": "", "suggestedHashtags": [] }`,

  social_twitter: `You are a Twitter/X content creator for Dales & Peaks estate agency. Create punchy tweets that:
- Are under 280 characters
- Are attention-grabbing and shareable
- Include relevant hashtags (2-3 max)
- May include a call to action

Format your response as JSON with: { "title": "", "content": "", "suggestedHashtags": [] }`,

  social_linkedin: `You are a LinkedIn content strategist for Dales & Peaks, a premium estate agency. Create professional posts that:
- Establish thought leadership in the property market
- Share market insights, trends, or success stories
- Are professional but personable
- Include industry-relevant hashtags
- Are 200-300 words

Format your response as JSON with: { "title": "", "content": "", "suggestedHashtags": [] }`,

  email_campaign: `You are an email marketing expert for Dales & Peaks estate agency. Create compelling email campaigns that:
- Have attention-grabbing subject lines
- Use preview text effectively
- Have clear, scannable content with a single focus
- Include compelling calls to action
- Follow email best practices

Format your response as JSON with: { "subject": "", "previewText": "", "content": "" (use HTML for email formatting) }`
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

    const { contentType, topic, keywords, tone, targetAudience, additionalContext }: ContentRequest = await req.json();

    if (!contentType || !topic) {
      return new Response(
        JSON.stringify({ error: "contentType and topic are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = SYSTEM_PROMPTS[contentType];
    if (!systemPrompt) {
      return new Response(
        JSON.stringify({ error: "Invalid content type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let userPrompt = `Create content about: ${topic}`;
    if (keywords?.length) userPrompt += `\n\nTarget keywords: ${keywords.join(", ")}`;
    if (tone) userPrompt += `\n\nTone: ${tone}`;
    if (targetAudience) userPrompt += `\n\nTarget audience: ${targetAudience}`;
    if (additionalContext) userPrompt += `\n\nAdditional context: ${additionalContext}`;

    console.log("Generating content for:", contentType, topic);

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
        temperature: 0.7,
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

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    // Try to parse JSON from the response
    let parsedContent;
    try {
      // Find JSON in the response (it might be wrapped in markdown code blocks)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedContent = JSON.parse(jsonMatch[0]);
      } else {
        parsedContent = { content };
      }
    } catch {
      parsedContent = { content };
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        generated: parsedContent,
        contentType,
        prompt: userPrompt
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Content generation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
