import { Anthropic } from '@anthropic-ai/sdk';
import type { ErrorResponse, StoryTellerRequest, StoryTellerResponse } from '../types';
import { extractMessageText } from '../util';
import { storyTellerUserPrompt } from '../prompts';

export async function handleStoryTellerRequest(
    anthropic: Anthropic,
    request: StoryTellerRequest
): Promise<StoryTellerResponse | ErrorResponse> {
    try {
        const { topic, summaries } = request;
        const message = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            messages: [{
                role: 'user',
                content: storyTellerUserPrompt(topic, summaries)
            }]
        });

        return {
            story: extractMessageText(message.content)
        };
    } catch (error) {
        console.error('Error in storyteller handler:', error);
        return {
            error: 'Failed to generate story'
        };
    }
}