'use client';
import { InteractiveResponse } from '@/ai/tools'


type InteractiveQuestionProps = {
  question: string;
  options: string[];
  responseId: string;
  onSelect: (response: InteractiveResponse) => void;
};

export const InteractiveQuestion = ({
  question,
  options,
  responseId,
  onSelect,
}: InteractiveQuestionProps) => {
  return (
    <div className="space-y-3 p-4 border rounded-lg bg-white shadow-sm">
      <p className="font-medium">{question}</p>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            className="w-full text-left p-2 border rounded hover:bg-gray-50 transition-colors"
            onClick={() => onSelect({ responseId, selectedOption: option })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};