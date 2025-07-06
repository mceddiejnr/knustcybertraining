
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Reply, Clock, CheckCircle2, Bot, Sparkles, Edit, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [answeringQuestion, setAnsweringQuestion] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [editQuestionText, setEditQuestionText] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const { toast } = useToast();

  const loadQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading questions:', error);
        toast({
          title: "Error",
          description: "Failed to load questions",
          variant: "destructive",
        });
        return;
      }

      setQuestions(data || []);
    } catch (error) {
      console.error('Error loading questions:', error);
      toast({
        title: "Error",
        description: "Failed to load questions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateAIAnswer = async (question: Question) => {
    setAiLoading(true);
    try {
      console.log('Calling AI function with question:', question.question);
      
      const { data, error } = await supabase.functions.invoke('ai-question-answer', {
        body: {
          question: question.question,
          context: `User name: ${question.name}, Email: ${question.email || 'Not provided'}`
        }
      });

      console.log('AI function response:', data);
      console.log('AI function error:', error);

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Function call failed: ${error.message}`);
      }

      if (data?.success && data?.answer) {
        setAnswerText(data.answer);
        toast({
          title: "AI Answer Generated",
          description: "Review and edit the AI-generated answer before saving",
        });
      } else {
        const errorMessage = data?.error || 'Unknown error occurred';
        console.error('AI generation failed:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error generating AI answer:', error);
      toast({
        title: "Error",
        description: `Failed to generate AI answer: ${error.message}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleAnswerQuestion = async (questionId: string) => {
    if (!answerText.trim()) {
      toast({
        title: "Error",
        description: "Please enter an answer",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('questions')
        .update({
          answer: answerText.trim(),
          status: 'answered',
          answered_at: new Date().toISOString()
        })
        .eq('id', questionId);

      if (error) {
        console.error('Error answering question:', error);
        toast({
          title: "Error",
          description: "Failed to save answer",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Answer saved successfully",
      });

      setAnsweringQuestion(null);
      setAnswerText("");
      loadQuestions();
    } catch (error) {
      console.error('Error answering question:', error);
      toast({
        title: "Error",
        description: "Failed to save answer",
        variant: "destructive",
      });
    }
  };

  const handleEditQuestion = async (questionId: string) => {
    if (!editQuestionText.trim() || !editName.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('questions')
        .update({
          question: editQuestionText.trim(),
          name: editName.trim(),
          email: editEmail.trim() || null
        })
        .eq('id', questionId);

      if (error) {
        console.error('Error updating question:', error);
        toast({
          title: "Error",
          description: "Failed to update question",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Question updated successfully",
      });

      setEditingQuestion(null);
      setEditQuestionText("");
      setEditName("");
      setEditEmail("");
      loadQuestions();
    } catch (error) {
      console.error('Error updating question:', error);
      toast({
        title: "Error",
        description: "Failed to update question",
        variant: "destructive",
      });
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', questionId);

      if (error) {
        console.error('Error deleting question:', error);
        toast({
          title: "Error",
          description: "Failed to delete question",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Question deleted successfully",
      });

      loadQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
      toast({
        title: "Error",
        description: "Failed to delete question",
        variant: "destructive",
      });
    }
  };

  const startEditingQuestion = (question: Question) => {
    setEditingQuestion(question.id);
    setEditQuestionText(question.question);
    setEditName(question.name);
    setEditEmail(question.email || "");
  };

  const cancelEditing = () => {
    setEditingQuestion(null);
    setEditQuestionText("");
    setEditName("");
    setEditEmail("");
  };

  useEffect(() => {
    loadQuestions();
  }, []);

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
          questions.map((question) => (
            <div
              key={question.id}
              className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  {editingQuestion === question.id ? (
                    <div className="space-y-2">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Name"
                        className="bg-gray-600/50 border-gray-500 text-white text-sm"
                      />
                      <Input
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder="Email (optional)"
                        className="bg-gray-600/50 border-gray-500 text-white text-sm"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-semibold text-white text-sm">{question.name}</h3>
                      {question.email && (
                        <p className="text-xs text-gray-400">{question.email}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        {new Date(question.created_at).toLocaleDateString()} at{' '}
                        {new Date(question.created_at).toLocaleTimeString()}
                      </p>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={question.status === 'answered' ? 'default' : 'secondary'}
                    className={question.status === 'answered' ? 'bg-green-600' : 'bg-yellow-600'}
                  >
                    {question.status === 'answered' ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Answered
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </>
                    )}
                  </Badge>
                </div>
              </div>

              <div className="mb-3">
                {editingQuestion === question.id ? (
                  <Textarea
                    value={editQuestionText}
                    onChange={(e) => setEditQuestionText(e.target.value)}
                    placeholder="Question text"
                    className="bg-gray-600/50 border-gray-500 text-white text-sm"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {question.question}
                  </p>
                )}
              </div>

              {question.answer && (
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 mb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Reply className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-medium text-green-400">Your Answer:</span>
                    <span className="text-xs text-gray-400">
                      {question.answered_at && new Date(question.answered_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{question.answer}</p>
                </div>
              )}

              {editingQuestion === question.id ? (
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleEditQuestion(question.id)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-xs"
                    disabled={!editQuestionText.trim() || !editName.trim()}
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={cancelEditing}
                    variant="outline"
                    size="sm"
                    className="text-xs border-gray-500 text-gray-400"
                  >
                    Cancel
                  </Button>
                </div>
              ) : answeringQuestion === question.id ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Answer:</span>
                    <Button
                      onClick={() => generateAIAnswer(question)}
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
                      onClick={() => handleAnswerQuestion(question.id)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-xs"
                      disabled={!answerText.trim()}
                    >
                      Save Answer
                    </Button>
                    <Button
                      onClick={() => {
                        setAnsweringQuestion(null);
                        setAnswerText("");
                      }}
                      variant="outline"
                      size="sm"
                      className="text-xs border-gray-500 text-gray-400"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    onClick={() => {
                      setAnsweringQuestion(question.id);
                      setAnswerText(question.answer || "");
                    }}
                    variant="outline"
                    size="sm"
                    className="text-xs border-green-500/30 text-green-400 hover:bg-green-600/10"
                  >
                    <Reply className="w-3 h-3 mr-1" />
                    {question.answer ? 'Edit Answer' : 'Answer Question'}
                  </Button>
                  <Button
                    onClick={() => startEditingQuestion(question)}
                    variant="outline"
                    size="sm"
                    className="text-xs border-blue-500/30 text-blue-400 hover:bg-blue-600/10"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit Question
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-red-500/30 text-red-400 hover:bg-red-600/10"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-gray-800 border-gray-600">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Delete Question</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-300">
                          Are you sure you want to delete this question? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-gray-500 text-gray-400">Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionsManager;
