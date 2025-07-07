
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

interface Question {
  id: string;
  name: string;
  email: string | null;
  question: string;
  status: string;
  created_at: string;
  answered_at: string | null;
  answer: string | null;
}

interface QuestionAnswerFormProps {
  question: Question;
  initialAnswer: string;
  onSave: (questionId: string, answer: string) => void;
  onCancel: () => void;
  onGenerateAI: (question: Question) => void;
  aiLoading: boolean;
}

const QuestionAnswerForm = ({ 
  question, 
  initialAnswer, 
  onSave, 
  onCancel, 
  onGenerateAI, 
  aiLoading 
}: QuestionAnswerFormProps) => {
  const [answerText, setAnswerText] = useState(initialAnswer);

  const handleSave = () => {
    onSave(question.id, answerText);
  };

  return (
    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-white text-sm">{question.name}</h3>
          {question.email && (
            <p className="text-xs text-gray-400">{question.email}</p>
          )}
          <p className="text-xs text-gray-500">
            {new Date(question.created_at).toLocaleDateString()} at{' '}
            {new Date(question.created_at).toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-gray-300 text-sm leading-relaxed">
          {question.question}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Answer:</span>
          <Button
            onClick={() => onGenerateAI(question)}
            disabled={aiLoading}
            size="sm"
            variant="outline"
            className="text-xs border-blue-500/30 text-blue-400 hover:bg-blue-600/10"
          >
            {aiLoading ? (
              <div className="animate-spin w-3 h-3 border-2 border-blue-300 border-t-blue-600 rounded-full mr-1" />
            ) : (
              <Sparkles className="w-3 h-3 mr-1" />
            )}
            {aiLoading ? 'Generating...' : 'AI Assist'}
          </Button>
        </div>
        <Textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Type your answer here..."
          className="bg-gray-600/50 border-gray-500 text-white text-sm"
          rows={4}
        />
        <div className="flex space-x-2">
          <Button
            onClick={handleSave}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-xs"
            disabled={!answerText.trim()}
          >
            Save Answer
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            size="sm"
            className="text-xs border-gray-500 text-gray-400"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionAnswerForm;
