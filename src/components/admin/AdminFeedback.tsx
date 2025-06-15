import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FeedbackData } from "@/types/feedback";
import FeedbackOverview from "./feedback/FeedbackOverview";
import FeedbackFilters from "./feedback/FeedbackFilters";
import FeedbackList from "./feedback/FeedbackList";
import FeedbackDetailDialog from "./feedback/FeedbackDetailDialog";

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
    if (feedback.length === 0) return "0.0";
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
      <FeedbackOverview
        totalFeedback={feedback.length}
        averageRating={getAverageRating()}
        recommendationPercentage={getRecommendationStats()}
        latestSubmissionDate={feedback.length > 0 ? formatDate(feedback[0].created_at).split(',')[0] : 'N/A'}
      />

      <FeedbackFilters
        filterRating={filterRating}
        setFilterRating={setFilterRating}
        filterSatisfaction={filterSatisfaction}
        setFilterSatisfaction={setFilterSatisfaction}
      />

      <FeedbackList
        filteredFeedback={filteredFeedback}
        onViewDetails={setSelectedFeedback}
        formatDate={formatDate}
        getSatisfactionColor={getSatisfactionColor}
      />

      <FeedbackDetailDialog
        selectedFeedback={selectedFeedback}
        onClose={() => setSelectedFeedback(null)}
        formatDate={formatDate}
      />
    </div>
  );
};

export default AdminFeedback;
