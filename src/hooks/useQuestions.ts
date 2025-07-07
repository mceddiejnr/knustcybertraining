
import { useState, useEffect } from "react";
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

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
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
        toast({
          title: "AI Answer Generated",
          description: "Review and edit the AI-generated answer before saving",
        });
        return data.answer;
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

  const handleAnswerQuestion = async (questionId: string, answerText: string) => {
    if (!answerText.trim()) {
      toast({
        title: "Error",
        description: "Please enter an answer",
        variant: "destructive",
      });
      return false;
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
        return false;
      }

      toast({
        title: "Success",
        description: "Answer saved successfully",
      });

      await loadQuestions();
      return true;
    } catch (error) {
      console.error('Error answering question:', error);
      toast({
        title: "Error",
        description: "Failed to save answer",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleEditQuestion = async (questionId: string, questionText: string, name: string, email: string) => {
    if (!questionText.trim() || !name.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('questions')
        .update({
          question: questionText.trim(),
          name: name.trim(),
          email: email.trim() || null
        })
        .eq('id', questionId);

      if (error) {
        console.error('Error updating question:', error);
        toast({
          title: "Error",
          description: "Failed to update question",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Question updated successfully",
      });

      await loadQuestions();
      return true;
    } catch (error) {
      console.error('Error updating question:', error);
      toast({
        title: "Error",
        description: "Failed to update question",
        variant: "destructive",
      });
      return false;
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
        return false;
      }

      toast({
        title: "Success",
        description: "Question deleted successfully",
      });

      await loadQuestions();
      return true;
    } catch (error) {
      console.error('Error deleting question:', error);
      toast({
        title: "Error",
        description: "Failed to delete question",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  return {
    questions,
    loading,
    aiLoading,
    generateAIAnswer,
    handleAnswerQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
    loadQuestions
  };
};
