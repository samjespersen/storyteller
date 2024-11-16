import { Anthropic } from '@anthropic-ai/sdk';
import { handleInterviewRequest } from './interview';
import { handleSummarizerRequest } from './summarizer';
import { handleStoryTellerRequest } from './storyteller';
export const setupRoutes = (anthropic: Anthropic) => async (req: Request) => {
    const url = new URL(req.url);

    switch (url.pathname) {
        case '/api/interview':
            const interviewBody = await req.json();
            return handleInterviewRequest(anthropic, interviewBody);

        case '/api/summarize':
            const summarizerBody = await req.json();
            return handleSummarizerRequest(anthropic, summarizerBody);

        case '/api/story':
            const storyBody = await req.json();
            return handleStoryTellerRequest(anthropic, storyBody);

        default:
            return { error: 'Not Found', status: 404 };
    }
};