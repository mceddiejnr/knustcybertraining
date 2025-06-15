import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, Calendar, TrendingUp, Filter, View } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

interface FeedbackData {
  id: string;
  rating: number;
  overall_satisfaction: string;
  most_valuable: string;
  improvements: string;
  additional_comments: string;
  would_recommend: string;
  created_at: string;
}

const AdminFeedback = () => {
  const [feedback, setFeedback] = useState<FeedbackData[]>([]);
  const [filteredFeedback, setFilteredFeedback] = useState<FeedbackData[]>([]);
  const [filterRating, setFilterRating] = useState<string>("all");
  const [filterSatisfaction, setFilterSatisfaction] = useState<string>("all");
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackData | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching feedback:', error);
      } else if (data) {
        // Map null values to empty strings for easier handling in the component
        const formattedData = data.map(item => ({
          ...item,
          overall_satisfaction: item.overall_satisfaction ?? '',
          most_valuable: item.most_valuable ?? '',
          improvements: item.improvements ?? '',
          additional_comments: item.additional_comments ?? '',
          would_recommend: item.would_recommend ?? '',
        }));
        setFeedback(formattedData);
      }
    };

    fetchFeedback();

    const channel = supabase
      .channel('feedback-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'feedback' },
        () => {
          fetchFeedback(); // Re-fetch all on any change for simplicity
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    let filtered = feedback;

    if (filterRating !== "all") {
      filtered = filtered.filter(f => f.rating.toString() === filterRating);
    }

    if (filterSatisfaction !== "all") {
      filtered = filtered.filter(f => f.overall_satisfaction === filterSatisfaction);
    }

    setFilteredFeedback(filtered);
  }, [feedback, filterRating, filterSatisfaction]);

  const getAverageRating = () => {
    if (feedback.length === 0) return 0;
    const total = feedback.reduce((sum, f) => sum + f.rating, 0);
    return (total / feedback.length).toFixed(1);
  };

  const getSatisfactionStats = () => {
    const stats = feedback.reduce((acc, f) => {
      if (f.overall_satisfaction) {
        acc[f.overall_satisfaction] = (acc[f.overall_satisfaction] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    return stats;
  };

  const getRecommendationStats = () => {
    const positive = feedback.filter(f => f.would_recommend === "Definitely" || f.would_recommend === "Probably").length;
    return feedback.length > 0 ? Math.round((positive / feedback.length) * 100) : 0;
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSatisfactionColor = (satisfaction: string) => {
    switch (satisfaction) {
      case "Very Satisfied": return "bg-green-600";
      case "Satisfied": return "bg-green-500";
      case "Neutral": return "bg-yellow-500";
      case "Dissatisfied": return "bg-orange-500";
      case "Very Dissatisfied": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Feedback</p>
                <p className="text-2xl font-bold text-green-400">{feedback.length}</p>
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
                  <p className="text-2xl font-bold text-green-400">{getAverageRating()}</p>
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
                <p className="text-2xl font-bold text-green-400">{getRecommendationStats()}%</p>
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
                  {feedback.length > 0 ? formatDate(feedback[0].created_at).split(',')[0] : 'N/A'}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
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

      {/* Feedback List */}
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
                <div key={index} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
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
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-8 w-8" onClick={() => setSelectedFeedback(item)}>
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
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feedback Detail Dialog */}
      <Dialog open={!!selectedFeedback} onOpenChange={(isOpen) => { if (!isOpen) setSelectedFeedback(null); }}>
        <DialogContent className="bg-gray-900/90 backdrop-blur-sm border-green-500/30 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><MessageSquare className="text-green-400" /> Feedback Details</DialogTitle>
            {selectedFeedback && <DialogDescription className="text-gray-400 pt-1">Submitted on {formatDate(selectedFeedback.created_at)}</DialogDescription>}
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-4 py-4 text-sm max-h-[60vh] overflow-y-auto pr-4">
              <div className="flex items-center gap-3">
                <p className="font-semibold text-gray-400 w-32 shrink-0">Rating:</p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= selectedFeedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-300">({selectedFeedback.rating}/5)</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <p className="font-semibold text-gray-400 w-32 shrink-0">Satisfaction:</p>
                <p className="text-gray-300">{selectedFeedback.overall_satisfaction}</p>
              </div>
              <div className="flex items-start gap-3">
                <p className="font-semibold text-gray-400 w-32 shrink-0">Would Recommend:</p>
                <p className="text-gray-300">{selectedFeedback.would_recommend}</p>
              </div>
              {selectedFeedback.most_valuable && (
                <div className="flex items-start gap-3">
                  <p className="font-semibold text-gray-400 w-32 shrink-0">Most Valuable:</p>
                  <p className="text-gray-300 bg-gray-800/50 p-2 rounded-md flex-1">{selectedFeedback.most_valuable}</p>
                </div>
              )}
              {selectedFeedback.improvements && (
                <div className="flex items-start gap-3">
                  <p className="font-semibold text-gray-400 w-32 shrink-0">Improvements:</p>
                  <p className="text-gray-300 bg-gray-800/50 p-2 rounded-md flex-1">{selectedFeedback.improvements}</p>
                </div>
              )}
              {selectedFeedback.additional_comments && (
                <div className="flex items-start gap-3">
                  <p className="font-semibold text-gray-400 w-32 shrink-0">Additional Comments:</p>
                  <p className="text-gray-300 bg-gray-800/50 p-2 rounded-md flex-1">{selectedFeedback.additional_comments}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="sm:justify-start">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white" onClick={() => setSelectedFeedback(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFeedback;
