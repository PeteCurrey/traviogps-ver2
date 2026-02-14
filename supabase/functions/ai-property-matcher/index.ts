const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [], propertyContext = {} } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Message is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build the system prompt for the property matcher
    const systemPrompt = `You are a helpful and knowledgeable estate agent assistant for Dales and Peaks, a premium estate agency covering Derbyshire, the Peak District, Sheffield, Chesterfield, and Nottingham.

Your role is to:
1. Understand what type of property the user is looking for
2. Ask clarifying questions about their requirements (budget, bedrooms, location preferences, must-have features)
3. Provide helpful advice about the local areas
4. Guide them towards properties that match their criteria

Key areas we cover:
- Peak District (Bakewell, Matlock, Buxton, Hathersage)
- Sheffield and surrounding areas
- Chesterfield
- Dronfield
- Nottingham

Property types available:
- Detached houses
- Semi-detached houses
- Terraced houses
- Flats/Apartments
- Bungalows
- Cottages
- Barn conversions
- Farmhouses
- New builds
- Land
- Commercial properties

Be warm, professional, and helpful. Use a conversational tone. When you have enough information, suggest they view our properties or book a valuation.

If the user mentions specific requirements, respond with a JSON block at the end of your message in this format:
\`\`\`json
{
  "extractedFilters": {
    "listingType": "sale" or "rent",
    "minPrice": number or null,
    "maxPrice": number or null,
    "minBedrooms": number or null,
    "propertyTypes": ["type1", "type2"] or null,
    "locations": ["location1", "location2"] or null
  }
}
\`\`\`

Only include the JSON if you've extracted meaningful filter criteria from the conversation.`;

    // Build messages array
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    // Call OpenRouter API with GPT-5-mini for fast, quality responses
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://lovable.dev',
        'X-Title': 'Dales and Peaks Property Matcher',
      },
      body: JSON.stringify({
        model: 'openai/gpt-5-mini',
        messages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', errorText);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to generate response' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || '';

    // Try to extract JSON filters from the response
    let extractedFilters = null;
    const jsonMatch = assistantMessage.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        extractedFilters = parsed.extractedFilters || null;
      } catch {
        // Ignore JSON parsing errors
      }
    }

    // Clean the response by removing the JSON block
    const cleanResponse = assistantMessage.replace(/```json\n[\s\S]*?\n```/g, '').trim();

    return new Response(
      JSON.stringify({
        success: true,
        message: cleanResponse,
        extractedFilters,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in ai-property-matcher:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
