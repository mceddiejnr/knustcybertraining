
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { question, context } = await req.json();

    if (!question) {
      throw new Error('Question is required');
    }

    const systemPrompt = `You are a helpful AI assistant for a cybersecurity training workshop. Your role is to help answer questions from workshop participants. 

Context: This is a cybersecurity awareness training program covering topics like phishing, password security, data protection, and general security best practices.

Guidelines:
- Provide clear, accurate, and helpful answers
- Keep responses professional and educational
- If the question is outside cybersecurity scope, politely redirect to cybersecurity topics
- Make answers practical and actionable when possible
- Keep responses concise but thorough (aim for 2-3 paragraphs max)

Additional context: ${context || 'No additional context provided'}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiAnswer = data.choices[0]?.message?.content;

    if (!aiAnswer) {
      throw new Error('No response from AI');
    }

    return new Response(JSON.stringify({ 
      success: true, 
      answer: aiAnswer 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-question-answer function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
