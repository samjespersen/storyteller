import { Anthropic } from '@anthropic-ai/sdk';
import type { InterviewRequest, InterviewResponse, ErrorResponse } from '../types';
import { extractMessageText } from '../util';
import { handleSummarizerRequest } from './summarizer';
import { interviewInitialUserPrompt, interviewUserPrompt } from '../prompts';

export async function handleInterviewRequest(
  anthropic: Anthropic,
  request: InterviewRequest
): Promise<InterviewResponse | ErrorResponse> {
  try {
    const { topic, answers = [], questions = [] } = request;

    if (answers.length >= 10) {
      return {
        status: 'completed',
      };
    }

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 150,
      messages: [{
        role: 'user',
        content: answers.length === 0 ? interviewInitialUserPrompt(topic) : interviewUserPrompt(questions, answers, topic)
      }]
    });

    return {
      status: 'in_progress',
      question: extractMessageText(message.content),
    };

  } catch (error) {
    console.error('Error in interview handler:', error);
    return {
      error: 'Failed to process interview request'
    };
  }
}