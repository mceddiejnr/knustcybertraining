
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, TrendingUp, Calendar, Star } from "lucide-react";

interface FeedbackOverviewProps {
  totalFeedback: number;
  averageRating: string;
  recommendationPercentage: number;
  latestSubmissionDate: string;
}

const FeedbackOverview = ({
  totalFeedback,
  averageRating,
  recommendationPercentage,
  latestSubmissionDate,
}: FeedbackOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Feedback</p>
              <p className="text-2xl font-bold text-green-400">{totalFeedback}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-green-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Average Rating</p>
              <div className="flex items-center space-x-1">
                <p className="text-2xl font-bold text-green-400">{averageRating}</p>
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Would Recommend</p>
              <p className="text-2xl font-bold text-green-400">{recommendationPercentage}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Latest Submission</p>
              <p className="text-sm font-bold text-green-400">
                {latestSubmissionDate}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-green-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackOverview;
