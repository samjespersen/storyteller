export const summarizerUserPrompt = (question: string, answer: string, topic: string) => `Given this question: "${question}" about the topic "${topic}" and the answer: "${answer}", provide a one-sentence summary of the answer that starts with "${topic} is". Keep it concise and focused on the key point.`

export const interviewInitialUserPrompt = (topic: string) => `You are interviewing someone about ${topic}. Ask a basic question to learn more about ${topic}. Keep it casual and concise. Provide ONLY the question text with no numbering or additional content.`

export const interviewUserPrompt = (questions: string[], answers: string[], topic: string) => `You are interviewing someone about ${topic}. Based on their previous answers, ask the next question. Keep questions simple at first, then build up to more complex questions as the interview progresses. Keep the questions focused on ${topic}. The goal is to ask a wide range of questions to understand the topic, and not to drill down on any one aspect. Previous Q&A: ${questions
    .map((q, i) => `Q: ${q} A: ${answers[i]}`)
    .join(' | ')}. Keep the next question concise and casual. Only ask one question at a time. Provide ONLY the question text with no numbering or additional content.`

export const storyTellerUserPrompt = (topic: string, summaries: string[]) => `You are a storyteller about ${topic}. Tell a short story about ${topic} using the following statements to help inform the story: ${summaries.join(' | ')}. Keep it casual and concise. Provide ONLY the story text with no numbering or additional content.`