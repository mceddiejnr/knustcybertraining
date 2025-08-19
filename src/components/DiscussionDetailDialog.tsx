import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, User, Clock, Reply, Eye } from "lucide-react";
import { useDiscussionReplies, type Discussion } from "@/hooks/useDiscussions";

interface DiscussionDetailDialogProps {
  discussion: Discussion;
  open: boolean;
  onClose: () => void;
}

const DiscussionDetailDialog = ({ discussion, open, onClose }: DiscussionDetailDialogProps) => {
  const [replyContent, setReplyContent] = useState("");
  const [replyAuthorName, setReplyAuthorName] = useState("");
  const [replyAuthorEmail, setReplyAuthorEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  
  const { replies, loading, createReply } = useDiscussionReplies(discussion.id);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await createReply(
      replyContent,
      replyAuthorName,
      replyAuthorEmail
    );

    if (success) {
      setReplyContent("");
      setReplyAuthorName("");
      setReplyAuthorEmail("");
      setShowReplyForm(false);
    }

    setIsSubmitting(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cybersecurity':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'training':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'qa':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-green-500/20 text-green-300 border-green-500/30';
    }
  };

  // Increment view count when dialog opens
  useEffect(() => {
    if (open && discussion) {
      // Note: This would typically be handled by calling incrementViews from useDiscussions
      // For now, we'll handle it when the dialog opens
    }
  }, [open, discussion]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] bg-gray-800 border-green-500/30 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-white">
            <MessageSquare className="w-5 h-5 text-green-400" />
            <span>Discussion</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Discussion Header */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Badge 
                variant="outline" 
                className={`text-xs ${getCategoryColor(discussion.category)}`}
              >
                {discussion.category}
              </Badge>
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <span className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{discussion.views} views</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>{replies.length} replies</span>
                </span>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-white">
              {discussion.title}
            </h2>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <User className="w-4 h-4" />
              <span>by {discussion.author_name}</span>
              <Clock className="w-4 h-4 ml-2" />
              <span>{formatDate(discussion.created_at)}</span>
            </div>
          </div>

          {/* Discussion Content */}
          <div className="bg-gray-700/30 rounded-lg p-4">
            <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
              {discussion.content}
            </p>
          </div>

          <Separator className="bg-gray-600" />

          {/* Replies Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Reply className="w-5 h-5" />
                <span>Replies ({replies.length})</span>
              </h3>
              <Button
                onClick={() => setShowReplyForm(!showReplyForm)}
                variant="outline"
                size="sm"
                className="border-green-500/50 text-green-400 hover:bg-green-500/10"
              >
                <Reply className="w-4 h-4 mr-2" />
                Reply
              </Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {replies.map((reply) => (
                  <div key={reply.id} className="bg-gray-700/20 rounded-lg p-4 border-l-2 border-green-500/30">
                    <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                      <User className="w-3 h-3" />
                      <span>{reply.author_name}</span>
                      <Clock className="w-3 h-3 ml-2" />
                      <span>{formatDate(reply.created_at)}</span>
                    </div>
                    <p className="text-gray-200 whitespace-pre-wrap">
                      {reply.content}
                    </p>
                  </div>
                ))}
                
                {replies.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No replies yet. Be the first to respond!</p>
                  </div>
                )}
              </div>
            )}

            {/* Reply Form */}
            {showReplyForm && (
              <div className="bg-gray-700/30 rounded-lg p-4 border border-green-500/20">
                <form onSubmit={handleReplySubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="replyAuthorName" className="text-sm font-semibold text-gray-200 mb-2 block">
                        Your Name *
                      </Label>
                      <Input
                        id="replyAuthorName"
                        type="text"
                        value={replyAuthorName}
                        onChange={(e) => setReplyAuthorName(e.target.value)}
                        placeholder="Your name"
                        className="bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/30"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="replyAuthorEmail" className="text-sm font-semibold text-gray-200 mb-2 block">
                        Email (Optional)
                      </Label>
                      <Input
                        id="replyAuthorEmail"
                        type="email"
                        value={replyAuthorEmail}
                        onChange={(e) => setReplyAuthorEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/30"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="replyContent" className="text-sm font-semibold text-gray-200 mb-2 block">
                      Your Reply *
                    </Label>
                    <Textarea
                      id="replyContent"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Share your thoughts or add to the discussion..."
                      className="bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/30 min-h-[100px] resize-none"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowReplyForm(false)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !replyContent.trim() || !replyAuthorName.trim()}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                          <span>Posting...</span>
                        </div>
                      ) : (
                        "Post Reply"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiscussionDetailDialog;