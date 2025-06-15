
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { FeedbackData } from "@/types/feedback";
import FeedbackItem from "./FeedbackItem";

interface FeedbackListProps {
  filteredFeedback: FeedbackData[];
  onViewDetails: (feedback: FeedbackData) => void;
  formatDate: (timestamp: string) => string;
  getSatisfactionColor: (satisfaction: string) => string;
}

const FeedbackList = ({
  filteredFeedback,
  onViewDetails,
  formatDate,
  getSatisfactionColor
}: FeedbackListProps) => {
  return (
    <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <MessageSquare className="w-5 h-5 text-green-400" />
          <span>Workshop Feedback ({filteredFeedback.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {filteredFeedback.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No feedback submissions yet.</p>
            <p className="text-sm">Feedback will appear here once participants submit their responses.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFeedback.map((item, index) => (
              <FeedbackItem
                key={index}
                item={item}
                onViewDetails={onViewDetails}
                formatDate={formatDate}
                getSatisfactionColor={getSatisfactionColor}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedbackList;
