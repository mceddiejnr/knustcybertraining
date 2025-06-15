
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, MessageSquare } from "lucide-react";
import { FeedbackData } from "@/types/feedback";

interface FeedbackDetailDialogProps {
  selectedFeedback: FeedbackData | null;
  onClose: () => void;
  formatDate: (timestamp: string) => string;
}

const FeedbackDetailDialog = ({ selectedFeedback, onClose, formatDate }: FeedbackDetailDialogProps) => {
  return (
    <Dialog open={!!selectedFeedback} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
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
            <Button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDetailDialog;
