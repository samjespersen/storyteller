export interface ChatRequest {
  prompt: string;
}

export interface ChatResponse {
  response: string;
}

export interface ErrorResponse {
  error: string;
}

export interface InterviewRequest {
  topic: string;
  questions?: string[];
  answers?: string[];
}

export interface InterviewResponse {
  status: 'in_progress' | 'completed';
  question?: string;
}

export interface SummarizerRequest {
  question: string;
  answer: string;
  topic: string;
}

export interface SummarizerResponse {
  summary: string;
}

export interface StoryTellerRequest {
  topic: string;
  summaries: string[];
}

export interface StoryTellerResponse {
  story: string;
}