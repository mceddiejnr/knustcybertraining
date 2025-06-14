
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star, MessageSquare, ThumbsUp, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [overallSatisfaction, setOverallSatisfaction] = useState("");
  const [mostValuable, setMostValuable] = useState("");
  const [improvements, setImprovements] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Save feedback to localStorage (in a real app, this would go to a backend)
    const feedback = {
      rating,
      overallSatisfaction,
      mostValuable,
      improvements,
      additionalComments,
      wouldRecommend,
      timestamp: new Date().toISOString(),
    };

    const existingFeedback = JSON.parse(localStorage.getItem("workshopFeedback") || "[]");
    existingFeedback.push(feedback);
    localStorage.setItem("workshopFeedback", JSON.stringify(existingFeedback));

    setIsSubmitted(true);
    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your valuable feedback. It helps us improve our training programs.",
    });
  };

  if (isSubmitted) {
    return (
      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-600/20 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
          <p className="text-gray-300">
            Your feedback has been submitted successfully. We appreciate your time and input!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <MessageSquare className="w-5 h-5 text-green-400" />
          <span>Workshop Feedback</span>
        </CardTitle>
        <p className="text-gray-300 text-sm">
          Help us improve future cybersecurity training sessions by sharing your experience.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <Label className="text-white font-medium mb-3 block">
              Overall Rating *
            </Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition-colors ${
                    star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
              <span className="text-gray-300 ml-2">
                {rating > 0 && `${rating}/5`}
              </span>
            </div>
          </div>

          {/* Overall Satisfaction */}
          <div>
            <Label className="text-white font-medium mb-3 block">
              How satisfied were you with the training?
            </Label>
            <RadioGroup value={overallSatisfaction} onValueChange={setOverallSatisfaction}>
              {["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} className="border-green-500/50" />
                  <Label htmlFor={option} className="text-gray-300 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Most Valuable */}
          <div>
            <Label className="text-white font-medium mb-3 block">
              What was the most valuable part of the training?
            </Label>
            <Textarea
              value={mostValuable}
              onChange={(e) => setMostValuable(e.target.value)}
              placeholder="e.g., Password security demonstration, Phishing examples, etc."
              className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500/50"
              rows={3}
            />
          </div>

          {/* Improvements */}
          <div>
            <Label className="text-white font-medium mb-3 block">
              What could be improved?
            </Label>
            <Textarea
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              placeholder="Suggestions for making the training more effective..."
              className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500/50"
              rows={3}
            />
          </div>

          {/* Would Recommend */}
          <div>
            <Label className="text-white font-medium mb-3 block">
              Would you recommend this training to colleagues?
            </Label>
            <RadioGroup value={wouldRecommend} onValueChange={setWouldRecommend}>
              {["Definitely", "Probably", "Maybe", "Probably Not", "Definitely Not"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`recommend-${option}`} className="border-green-500/50" />
                  <Label htmlFor={`recommend-${option}`} className="text-gray-300 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Additional Comments */}
          <div>
            <Label className="text-white font-medium mb-3 block">
              Additional Comments
            </Label>
            <Textarea
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
              placeholder="Any other feedback or suggestions..."
              className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500/50"
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
