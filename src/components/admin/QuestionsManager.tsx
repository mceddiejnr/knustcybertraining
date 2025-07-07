
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { useQuestions } from "@/hooks/useQuestions";
import QuestionCard from "./questions/QuestionCard";
import QuestionEditForm from "./questions/QuestionEditForm";
import QuestionAnswerForm from "./questions/QuestionAnswerForm";

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

const QuestionsManager = () => {
  const {
    questions,
    loading,
    aiLoading,
    generateAIAnswer,
    handleAnswerQuestion,
    handleEditQuestion,
    handleDeleteQuestion
  } = useQuestions();

  const [answeringQuestion, setAnsweringQuestion] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [initialAnswerText, setInitialAnswerText] = useState("");

  const handleStartAnswering = (questionId: string, existingAnswer: string = "") => {
    setAnsweringQuestion(questionId);
    setInitialAnswerText(existingAnswer);
  };

  const handleStartEditing = (question: Question) => {
    setEditingQuestion(question.id);
  };

  const handleCancelAnswering = () => {
    setAnsweringQuestion(null);
    setInitialAnswerText("");
  };

  const handleCancelEditing = () => {
    setEditingQuestion(null);
  };

  const handleSaveAnswer = async (questionId: string, answer: string) => {
    const success = await handleAnswerQuestion(questionId, answer);
    if (success) {
      handleCancelAnswering();
    }
  };

  const handleSaveEdit = async (questionId: string, questionText: string, name: string, email: string) => {
    const success = await handleEditQuestion(questionId, questionText, name, email);
    if (success) {
      handleCancelEditing();
    }
  };

  const handleGenerateAI = async (question: Question) => {
    const answer = await generateAIAnswer(question);
    if (answer) {
      setInitialAnswerText(answer);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-green-300 border-t-green-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <MessageCircle className="w-5 h-5 text-green-400" />
          <span>User Questions ({questions.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No questions submitted yet</p>
          </div>
        ) : (
          questions.map((question) => {
            if (editingQuestion === question.id) {
              return (
                <QuestionEditForm
                  key={question.id}
                  question={question}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEditing}
                />
              );
            }

            if (answeringQuestion === question.id) {
              return (
                <QuestionAnswerForm
                  key={question.id}
                  question={question}
                  initialAnswer={initialAnswerText}
                  onSave={handleSaveAnswer}
                  onCancel={handleCancelAnswering}
                  onGenerateAI={handleGenerateAI}
                  aiLoading={aiLoading}
                />
              );
            }

            return (
              <QuestionCard
                key={question.id}
                question={question}
                onStartAnswering={handleStartAnswering}
                onStartEditing={handleStartEditing}
                onDelete={handleDeleteQuestion}
              />
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionsManager;
