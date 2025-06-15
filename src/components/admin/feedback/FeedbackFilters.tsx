
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

interface FeedbackFiltersProps {
  filterRating: string;
  setFilterRating: (value: string) => void;
  filterSatisfaction: string;
  setFilterSatisfaction: (value: string) => void;
}

const FeedbackFilters = ({
  filterRating,
  setFilterRating,
  filterSatisfaction,
  setFilterSatisfaction,
}: FeedbackFiltersProps) => {
  return (
    <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Filter className="w-5 h-5 text-green-400" />
          <span>Filters</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm text-gray-400 mb-2 block">Filter by Rating</label>
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                <SelectValue placeholder="All Ratings" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm text-gray-400 mb-2 block">Filter by Satisfaction</label>
            <Select value={filterSatisfaction} onValueChange={setFilterSatisfaction}>
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                <SelectValue placeholder="All Satisfaction Levels" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all">All Satisfaction Levels</SelectItem>
                <SelectItem value="Very Satisfied">Very Satisfied</SelectItem>
                <SelectItem value="Satisfied">Satisfied</SelectItem>
                <SelectItem value="Neutral">Neutral</SelectItem>
                <SelectItem value="Dissatisfied">Dissatisfied</SelectItem>
                <SelectItem value="Very Dissatisfied">Very Dissatisfied</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackFilters;
