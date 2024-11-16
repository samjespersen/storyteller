export function extractMessageText(content: any[]): string {
    if (!Array.isArray(content) || content.length === 0) {
      throw new Error('Invalid message content structure');
    }
  
    const firstContent = content[0];
    if (!firstContent || typeof firstContent.text !== 'string') {
      throw new Error('Message content missing text field');
    }
  
    return firstContent.text;
  }