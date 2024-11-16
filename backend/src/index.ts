import { serve } from "bun";
import { Anthropic } from '@anthropic-ai/sdk';
import { config } from 'dotenv';
import { setupRoutes } from './routes';
import { corsHeaders, handleCors } from './middleware/cors';

config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const server = serve({
  port: process.env.PORT || 3000,
  async fetch(req) {
    // Handle CORS preflight
    const corsResponse = handleCors(req);
    if (corsResponse) return corsResponse;
    
    try {
      const routeHandler = setupRoutes(anthropic);
      const result = await routeHandler(req);
      
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
  },
});

console.log(`Server running at http://localhost:${server.port}`);