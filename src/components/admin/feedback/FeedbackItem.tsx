
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, View } from "lucide-react";
import { FeedbackData } from "@/types/feedback";

interface FeedbackItemProps {
  item: FeedbackData;
  onViewDetails: (feedback: FeedbackData) => void;
  formatDate: (timestamp: string) => string;
  getSatisfactionColor: (satisfaction: string) => string;
}

const FeedbackItem = ({
  item,
  onViewDetails,
  formatDate,
  getSatisfactionColor,
}: FeedbackItemProps) => {
  return (
    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'
                }`}
              />
            ))}
            <span className="text-sm text-gray-400 ml-2">({item.rating}/5)</span>
          </div>
          <Badge className={`${getSatisfactionColor(item.overall_satisfaction)} text-white`}>
            {item.overall_satisfaction}
          </Badge>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
          <span className="text-xs text-gray-400">
            {formatDate(item.created_at)}
          </span>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-8 w-8" onClick={() => onViewDetails(item)}>
            <View />
            <span className="sr-only">View Feedback</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {item.most_valuable && (
          <div>
            <p className="text-green-400 font-medium mb-1">Most Valuable:</p>
            <p className="text-gray-300 truncate">{item.most_valuable}</p>
          </div>
        )}
        
        {item.improvements && (
          <div>
            <p className="text-orange-400 font-medium mb-1">Improvements:</p>
            <p className="text-gray-300 truncate">{item.improvements}</p>
          </div>
        )}
        
        {item.would_recommend && (
          <div>
            <p className="text-blue-400 font-medium mb-1">Would Recommend:</p>
            <p className="text-gray-300">{item.would_recommend}</p>
          </div>
        )}
        
        {item.additional_comments && (
          <div className="md:col-span-2">
            <p className="text-purple-400 font-medium mb-1">Additional Comments:</p>
            <p className="text-gray-300 truncate">{item.additional_comments}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackItem;
