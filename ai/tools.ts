import { tool as createTool } from 'ai';
import { z } from 'zod';

// ai/tools.ts
export type WeatherOutput = {
  weather: string;
  temperature: number;
  location: string;
};

export const weatherTool = createTool({
  description: 'Display the weather for a location',
  inputSchema: z.object({
    location: z.string().describe('The location to get the weather for'),
  }),
  execute: async function ({ location }): Promise<WeatherOutput> {  // Explicit return type
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { weather: 'Sunny', temperature: 75, location };
  },
});

// Add a new stock tool
/*
export const stockTool = createTool({
  description: 'Get price for a stock',
  inputSchema: z.object({
    symbol: z.string().describe('The stock symbol to get the price for'),
  }),
  execute: async function ({ symbol }) {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { symbol, price: 100 };
  },
});

// Update the tools object
export const tools = {
  displayWeather: weatherTool,
  getStockPrice: stockTool,
};
*/
// Add to your existing tools.ts
export type StockOutput = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
};

export const stockTool = createTool({
  description: 'Get current stock price information',
  inputSchema: z.object({
    symbol: z.string().describe('The stock symbol to look up (e.g., AAPL)'),
  }),
  execute: async function ({ symbol }): Promise<StockOutput> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response - in a real app you'd call a stock API here
    return {
      symbol: symbol.toUpperCase(),
      price: Math.random() * 500 + 50, // Random price between 50-550
      change: (Math.random() * 10 - 5), // Random change between -5 and +5
      changePercent: (Math.random() * 10 - 5) // Random % change between -5% and +5%
    };
  },
});

/*
// Update your tools export to include both
export const tools = {
  displayWeather: weatherTool,
  getStockPrice: stockTool
};
*/

// Add to your existing tools.ts
export type ClarifyingQuestionsOutput = {
  originalQuery: string;
  questions: string[];
};

export const clarifyingQuestionsTool = createTool({
  description: 'Generate clarifying questions to better understand user needs',
  inputSchema: z.object({
    userQuery: z.string().describe('The original user query that needs clarification'),
  }),
  execute: async function ({ userQuery }): Promise<ClarifyingQuestionsOutput> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response - in a real app this would call your AI model
    return {
      originalQuery: userQuery,
      questions: [
        "What editing software are you currently using?",
        "Do you have experience working with 3D assets?",
        "What's your deadline for this project?",
        "Are you looking for software recommendations or ready-to-use solutions?",
        "What kind of 3D asset are you trying to incorporate (character, object, environment)?"
      ]
    };
  },
});

export type InteractiveQuestionOutput = {
  question: string;
  options: string[];
  responseId: string; // Unique identifier for this question
};

export type InteractiveResponse = {
  responseId: string;
  selectedOption: string;
};

export const interactiveQuestionTool = createTool({
  description: 'Present interactive questions with options to the user',
  inputSchema: z.object({
    question: z.string().describe('The question to ask'),
    options: z.array(z.string()).describe('Available options for the user to choose'),
    responseId: z.string().describe('Unique identifier for tracking this response'),
  }),
  execute: async function ({ question, options, responseId }): Promise<InteractiveQuestionOutput> {
    // In a real implementation, you might store this in a database
    return { question, options, responseId };
  },
});

// Update your tools export
export const tools = {
  displayWeather: weatherTool,
  getStockPrice: stockTool,
  // generateClarifyingQuestions: clarifyingQuestionsTool,
  askInteractiveQuestion: interactiveQuestionTool,
};
