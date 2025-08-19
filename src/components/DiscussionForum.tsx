import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, Plus, Eye, Pin, Clock } from "lucide-react";
import { useDiscussions } from "@/hooks/useDiscussions";
import CreateDiscussionDialog from "./CreateDiscussionDialog";
import DiscussionDetailDialog from "./DiscussionDetailDialog";
import type { Discussion } from "@/hooks/useDiscussions";

const DiscussionForum = () => {
  const { discussions, loading } = useDiscussions();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
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

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-gray-800/95 backdrop-blur-sm border-green-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin w-6 h-6 border-2 border-green-400 border-t-transparent rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-white text-xl">
              <Users className="w-6 h-6 text-green-400" />
              <span>Discussion Forum</span>
            </CardTitle>
            <Button
              onClick={() => setShowCreateDialog(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Discussion
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {discussions.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No discussions yet. Be the first to start a conversation!</p>
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Start Discussion
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card
                  key={discussion.id}
                  className="bg-gray-700/50 border-gray-600/50 hover:bg-gray-700/70 transition-colors cursor-pointer"
                  onClick={() => setSelectedDiscussion(discussion)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          {discussion.is_pinned && (
                            <Pin className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                          )}
                          <h3 className="font-semibold text-white text-lg truncate">
                            {discussion.title}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getCategoryColor(discussion.category)}`}
                          >
                            {discussion.category}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                          {discussion.content}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>by {discussion.author_name} • {formatDate(discussion.created_at)}</span>
                          </span>
                          
                          <span className="flex items-center space-x-1">
                            <MessageSquare className="w-3 h-3" />
                            <span>{discussion.reply_count || 0} replies</span>
                          </span>
                          
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{discussion.views} views</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <CreateDiscussionDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
      />

      {selectedDiscussion && (
        <DiscussionDetailDialog
          discussion={selectedDiscussion}
          open={!!selectedDiscussion}
          onClose={() => setSelectedDiscussion(null)}
        />
      )}
    </div>
  );
};

export default DiscussionForum;