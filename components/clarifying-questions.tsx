type ClarifyingQuestionsProps = {
  originalQuery: string;
  questions: string[];
};

export const ClarifyingQuestions = ({ originalQuery, questions }: ClarifyingQuestionsProps) => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="font-semibold">Original query:</p>
        <p>"{originalQuery}"</p>
      </div>
      
      <div className="space-y-3">
        <p className="font-semibold">To better assist you, please clarify:</p>
        {questions.map((question, index) => (
          <div 
            key={index}
            className="p-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => console.log('Question selected:', question)}
          >
            <p>{question}</p>
          </div>
        ))}
      </div>
    </div>
  );
};