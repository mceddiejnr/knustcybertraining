
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const QuestionForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('questions')
        .insert([{
          name: name.trim(),
          email: email.trim() || null,
          question: question.trim()
        }]);

      if (error) {
        console.error('Error submitting question:', error);
        toast({
          title: "Error",
          description: "Failed to submit your question. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Question Submitted!",
        description: "Thank you for your question. We'll get back to you soon.",
      });

      // Reset form
      setName("");
      setEmail("");
      setQuestion("");
    } catch (error) {
      console.error('Error submitting question:', error);
      toast({
        title: "Error",
        description: "Failed to submit your question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-800/95 backdrop-blur-sm border-green-500/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-white text-lg">
          <MessageCircle className="w-5 h-5 text-green-400" />
          <span>Ask a Question</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="name" className="text-xs font-semibold text-gray-200 mb-1 block">
              Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="text-xs bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/30 h-8"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-xs font-semibold text-gray-200 mb-1 block">
              Email (Optional)
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="text-xs bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/30 h-8"
            />
          </div>

          <div>
            <Label htmlFor="question" className="text-xs font-semibold text-gray-200 mb-1 block">
              Question *
            </Label>
            <Textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What would you like to know about cybersecurity?"
              className="text-xs bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/30 min-h-[60px] resize-none"
              rows={3}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !name.trim() || !question.trim()}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-xs h-8 font-semibold"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-1">
                <div className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              <>
                <Send className="w-3 h-3 mr-1" />
                Submit Question
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuestionForm;
