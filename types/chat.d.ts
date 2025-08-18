// types/ai.d.ts
import { InteractiveResponse } from '@/ai/tools';

declare module 'ai' {
  interface UIMessage {
    metadata?: {
      interactiveResponse?: boolean;
      responseId?: string;
      // Add other metadata properties as needed
    } | null;
  }
}