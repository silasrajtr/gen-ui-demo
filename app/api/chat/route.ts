import { groq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages, UIMessage, stepCountIs } from 'ai';
import { tools } from '@/ai/tools';


/*

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: groq('llama3-70b-8192'), // or 'mixtral-8x7b-32768'
    system: 'You are a helpful assistant that can ask interactive questions.When you receive an interactive response, acknowledge it appropriately.',
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools,
  });

  return result.toUIMessageStreamResponse();
}
*/

// Modify your POST handler to include context about interactive responses
// app/api/chat/route.ts
// app/api/chat/route.ts
export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  // Safely check for interactive responses
  const lastMessage = messages[messages.length - 1];
  const isInteractiveResponse = lastMessage.metadata?.interactiveResponse ?? false;

  const result = streamText({
    model: groq('llama3-70b-8192'),
    system: `You are a helpful assistant that can ask interactive questions.
             ${isInteractiveResponse ? 'The last message was an interactive response.' : ''}`,
    messages: convertToModelMessages(messages),
    tools,
  });

  return result.toUIMessageStreamResponse();
}