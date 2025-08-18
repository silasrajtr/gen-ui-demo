'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Weather } from '@/components/weather';
import { Stock } from '@/components/stock';
import { ClarifyingQuestions } from '@/components/clarifying-questions';
import { InteractiveQuestion } from '@/components/interactive-question';


import { WeatherOutput } from '@/ai/tools'
import { StockOutput } from '@/ai/tools'
import { ClarifyingQuestionsOutput } from '@/ai/tools'
import { InteractiveQuestionOutput } from '@/ai/tools'




export default function Page() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Chat with Weather</h1>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            Start a conversation with the AI...
          </div>
        ) : (
          messages.map(message => (
            <div 
              key={message.id} 
              className={`p-4 rounded-lg ${message.role === 'user' ? 'bg-blue-100 ml-auto text-black' : 'bg-gray-100 mr-auto text-gray-800'}`}
            >
              <div className="font-semibold">
                {message.role === 'user' ? 'You' : 'AI'}
              </div>
              <div className="mt-1">
                {message.parts.map((part, index) => {
                  if (part.type === 'text') {
                    return <span key={index}>{part.text}</span>;
                  }

                  if (part.type === 'tool-displayWeather') {
                    switch (part.state) {
                      case 'input-available':
                        return <div key={index}>Loading weather...</div>;
                      case 'output-available':
                        // Add type assertion
                        const weatherOutput = part.output as WeatherOutput;
                        return (
                          <div key={index} className="mt-2">
                            <Weather {...weatherOutput} />
                          </div>
                        );
                      case 'output-error':
                        return <div key={index} className="text-red-500">Error: {part.errorText}</div>;
                      default:
                        return null;
                    }
                  }
                  /*
                  if (part.type === 'tool-getStockPrice') {
                    switch (part.state) {
                      case 'input-available':
                        return <div key={index}>Loading stock price...</div>;
                      case 'output-available':
                        return (
                          <div key={index}>
                            <Stock {...part.output} />
                          </div>
                        );
                      case 'output-error':
                        return <div key={index}>Error: {part.errorText}</div>;
                      default:
                        return null;
                    }
                  }
                  */
                  // Add this case to your message.parts.map:
                  if (part.type === 'tool-getStockPrice') {
                    switch (part.state) {
                      case 'input-available':
                        return <div key={index}>Loading stock price...</div>;
                      case 'output-available':
                        const stockOutput = part.output as StockOutput;
                        return (
                          <div key={index} className="mt-2">
                            <Stock {...stockOutput} />
                          </div>
                        );
                      case 'output-error':
                        return <div key={index} className="text-red-500">Error: {part.errorText}</div>;
                      default:
                        return null;
                    }
                  }

                  // Add this case to your message.parts.map:
                  if (part.type === 'tool-generateClarifyingQuestions') {
                    switch (part.state) {
                      case 'input-available':
                        return <div key={index}>Generating clarifying questions...</div>;
                      case 'output-available':
                        const questionsOutput = part.output as ClarifyingQuestionsOutput;
                        return (
                          <div key={index} className="mt-2">
                            <ClarifyingQuestions {...questionsOutput} />
                          </div>
                        );
                      case 'output-error':
                        return <div key={index} className="text-red-500">Error: {part.errorText}</div>;
                      default:
                        return null;
                    }
                  }

                  if (part.type === 'tool-askInteractiveQuestion') {
                    switch (part.state) {
                      case 'input-available':
                        return <div key={index}>Preparing question...</div>;
                      case 'output-available':
                        const questionOutput = part.output as InteractiveQuestionOutput;
                        return (
                          <div key={index} className="mt-2">
                            <InteractiveQuestion
                              {...questionOutput}
                              // In your InteractiveQuestion onSelect handler:
                              onSelect={(response) => {
                                sendMessage({ 
                                  text: response.selectedOption,
                                  metadata: {
                                    interactiveResponse: true,  // lowercase 'i'
                                    responseId: response.responseId
                                  } as const
                                });
                              }}
                              
                            />
                          </div>
                        );
                      case 'output-error':
                        return <div key={index} className="text-red-500">Error: {part.errorText}</div>;
                      default:
                        return null;
                    }
                  }

                  return null;
                })}
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={!input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}