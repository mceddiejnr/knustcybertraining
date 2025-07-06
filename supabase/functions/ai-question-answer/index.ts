
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
    console.log('AI Question Answer function called');
    
    if (!openAIApiKey) {
      console.error('OpenAI API key not found in environment variables');
      throw new Error('OpenAI API key not configured');
    }

    // Log key info (first/last few chars for security)
    const keyPreview = openAIApiKey.length > 10 
      ? `${openAIApiKey.substring(0, 7)}...${openAIApiKey.substring(openAIApiKey.length - 4)}`
      : 'KEY_TOO_SHORT';
    console.log('OpenAI API key found, length:', openAIApiKey.length, 'preview:', keyPreview);

    const requestBody = await req.json();
    console.log('Request body:', JSON.stringify(requestBody, null, 2));
    
    const { question, context } = requestBody;

    if (!question) {
      console.error('No question provided in request');
      throw new Error('Question is required');
    }

    console.log('Question received:', question);
    console.log('Context received:', context);

    const systemPrompt = `You are a helpful AI assistant for a cybersecurity training workshop. Your role is to help answer questions from workshop participants. 

Context: This is a cybersecurity awareness training program covering topics like phishing, password security, data protection, and general security best practices.

Guidelines:
- Provide clear, accurate, and helpful answers
- Keep responses professional and educational
- If the question is outside cybersecurity scope, politely redirect to cybersecurity topics
- Make answers practical and actionable when possible
- Keep responses concise but thorough (aim for 2-3 paragraphs max)

Additional context: ${context || 'No additional context provided'}`;

    console.log('Making request to OpenAI API...');

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

    console.log('OpenAI API response status:', response.status);
    console.log('OpenAI API response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error response:', errorText);
      
      // Check if it's a quota issue
      if (response.status === 429) {
        console.error('429 error - quota exceeded or rate limited');
        throw new Error(`OpenAI API quota exceeded. Please check your OpenAI account billing and usage limits. Status: ${response.status}`);
      }
      
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI API response data keys:', Object.keys(data));
    
    const aiAnswer = data.choices?.[0]?.message?.content;

    if (!aiAnswer) {
      console.error('No answer content in OpenAI response');
      console.error('Full response data:', JSON.stringify(data, null, 2));
      throw new Error('No response from AI');
    }

    console.log('AI answer generated successfully, length:', aiAnswer.length);

    return new Response(JSON.stringify({ 
      success: true, 
      answer: aiAnswer 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-question-answer function:', error);
    console.error('Error stack:', error.stack);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || 'Unknown error occurred'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
