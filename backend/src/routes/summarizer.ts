import { Anthropic } from '@anthropic-ai/sdk';
import type { SummarizerRequest, SummarizerResponse, ErrorResponse } from '../types';
import { extractMessageText } from '../util';
import { summarizerUserPrompt } from '../prompts';

export async function handleSummarizerRequest(
    anthropic: Anthropic,
    request: SummarizerRequest
): Promise<SummarizerResponse | ErrorResponse> {
    try {
        const { question, answer, topic } = request;
        const message = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 150,
            messages: [{
                role: 'user',
                content: summarizerUserPrompt(question, answer, topic)
            }]
        });

        return {
            summary: extractMessageText(message.content)
        };
    } catch (error) {
        console.error('Error in summarizer handler:', error);
        return {
            error: 'Failed to generate summary'
        };
    }
}