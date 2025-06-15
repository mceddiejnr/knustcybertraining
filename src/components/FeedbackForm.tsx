import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star, MessageSquare, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const FeedbackForm = ({ isInDrawer = false }: { isInDrawer?: boolean }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
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
    const successContent = (
      <div className={!isInDrawer ? "p-8 text-center" : "text-center pt-8"}>
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-green-600/20 rounded-full">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-gray-300">
          Your feedback has been submitted successfully. We appreciate your time and input!
        </p>
      </div>
    );
    
    if (isInDrawer) return successContent;

    return (
      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 max-w-2xl mx-auto">
        <CardContent>{successContent}</CardContent>
      </Card>
    );
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-8">
      <fieldset className="space-y-3">
        <legend className="text-white font-medium block text-base">
          Overall Rating *
        </legend>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "w-8 h-8 cursor-pointer transition-all duration-200",
                (hoverRating || rating) >= star
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-600 hover:text-yellow-300",
                "hover:scale-110"
              )}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
          {rating > 0 && (
            <span className="bg-gray-700 text-yellow-400 text-xs font-semibold ml-2 px-2.5 py-0.5 rounded-full">
              {rating}/5
            </span>
          )}
        </div>
      </fieldset>

      <div className="space-y-6">
        <div>
          <Label className="text-white font-medium mb-3 block text-base">
            How satisfied were you with the training?
          </Label>
          <RadioGroup
            value={overallSatisfaction}
            onValueChange={setOverallSatisfaction}
            className="flex flex-wrap gap-2"
          >
            {["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"].map(
              (option) => (
                <div key={option}>
                  <RadioGroupItem
                    value={option}
                    id={`${option}-${isInDrawer}`}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`${option}-${isInDrawer}`}
                    className={cn(
                      "cursor-pointer rounded-md border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm text-gray-400 transition-colors hover:bg-gray-700 hover:text-white",
                      overallSatisfaction === option &&
                        "bg-green-900/50 border-green-500 text-green-300 ring-1 ring-green-500"
                    )}
                  >
                    {option}
                  </Label>
                </div>
              )
            )}
          </RadioGroup>
        </div>
        
        <div>
          <Label className="text-white font-medium mb-3 block text-base">
            Would you recommend this training to colleagues?
          </Label>
          <RadioGroup
            value={wouldRecommend}
            onValueChange={setWouldRecommend}
            className="flex flex-wrap gap-2"
          >
            {["Definitely", "Probably", "Maybe", "Probably Not", "Definitely Not"].map(
              (option) => (
                <div key={option}>
                  <RadioGroupItem
                    value={option}
                    id={`recommend-${option}-${isInDrawer}`}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`recommend-${option}-${isInDrawer}`}
                    className={cn(
                      "cursor-pointer rounded-md border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm text-gray-400 transition-colors hover:bg-gray-700 hover:text-white",
                      wouldRecommend === option &&
                        "bg-green-900/50 border-green-500 text-green-300 ring-1 ring-green-500"
                    )}
                  >
                    {option}
                  </Label>
                </div>
              )
            )}
          </RadioGroup>
        </div>
        
        <div>
          <Label htmlFor="most-valuable" className="text-white font-medium mb-3 block text-base">
            What was the most valuable part of the training?
          </Label>
          <Textarea
            id="most-valuable"
            value={mostValuable}
            onChange={(e) => setMostValuable(e.target.value)}
            placeholder="e.g., Password security demonstration..."
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-1 focus:ring-green-500 focus:border-green-500"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="improvements" className="text-white font-medium mb-3 block text-base">
            What could be improved?
          </Label>
          <Textarea
            id="improvements"
            value={improvements}
            onChange={(e) => setImprovements(e.target.value)}
            placeholder="Suggestions for making the training more effective..."
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-1 focus:ring-green-500 focus:border-green-500"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="additional-comments" className="text-white font-medium mb-3 block text-base">
            Additional Comments
          </Label>
          <Textarea
            id="additional-comments"
            value={additionalComments}
            onChange={(e) => setAdditionalComments(e.target.value)}
            placeholder="Any other feedback or suggestions..."
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-1 focus:ring-green-500 focus:border-green-500"
            rows={4}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 text-base rounded-lg transition-transform hover:scale-[1.02]"
      >
        <Send className="w-5 h-5 mr-2" />
        Submit Feedback
      </Button>
    </form>
  );

  if (isInDrawer) {
    return formContent;
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
        {formContent}
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
