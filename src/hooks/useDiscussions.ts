import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_email?: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
  is_pinned: boolean;
  category: string;
  views: number;
  reply_count?: number;
}

export interface DiscussionReply {
  id: string;
  discussion_id: string;
  content: string;
  author_name: string;
  author_email?: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

export const useDiscussions = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadDiscussions = async () => {
    try {
      setLoading(true);
      
      // Load discussions with reply count
      const { data: discussionsData, error: discussionsError } = await supabase
        .from('discussions')
        .select(`
          *,
          discussion_replies(count)
        `)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (discussionsError) {
        console.error('Error loading discussions:', discussionsError);
        toast({
          title: "Error",
          description: "Failed to load discussions. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Transform data to include reply count
      const discussionsWithCount = discussionsData?.map(discussion => ({
        ...discussion,
        reply_count: discussion.discussion_replies?.[0]?.count || 0
      })) || [];

      setDiscussions(discussionsWithCount);
    } catch (error) {
      console.error('Error loading discussions:', error);
      toast({
        title: "Error",
        description: "Failed to load discussions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createDiscussion = async (
    title: string,
    content: string,
    authorName: string,
    authorEmail?: string,
    category: string = 'general'
  ) => {
    try {
      const { error } = await supabase
        .from('discussions')
        .insert([{
          title: title.trim(),
          content: content.trim(),
          author_name: authorName.trim(),
          author_email: authorEmail?.trim() || null,
          category,
        }]);

      if (error) {
        console.error('Error creating discussion:', error);
        toast({
          title: "Error",
          description: "Failed to create discussion. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Discussion Created!",
        description: "Your discussion has been posted successfully.",
      });

      loadDiscussions();
      return true;
    } catch (error) {
      console.error('Error creating discussion:', error);
      toast({
        title: "Error",
        description: "Failed to create discussion. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const incrementViews = async (discussionId: string) => {
    try {
      await supabase.rpc('increment_discussion_views', {
        discussion_id: discussionId
      });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  useEffect(() => {
    loadDiscussions();
  }, []);

  return {
    discussions,
    loading,
    loadDiscussions,
    createDiscussion,
    incrementViews,
  };
};

export const useDiscussionReplies = (discussionId: string) => {
  const [replies, setReplies] = useState<DiscussionReply[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadReplies = async () => {
    if (!discussionId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('discussion_replies')
        .select('*')
        .eq('discussion_id', discussionId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading replies:', error);
        toast({
          title: "Error",
          description: "Failed to load replies. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setReplies(data || []);
    } catch (error) {
      console.error('Error loading replies:', error);
      toast({
        title: "Error",
        description: "Failed to load replies. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createReply = async (
    content: string,
    authorName: string,
    authorEmail?: string
  ) => {
    try {
      const { error } = await supabase
        .from('discussion_replies')
        .insert([{
          discussion_id: discussionId,
          content: content.trim(),
          author_name: authorName.trim(),
          author_email: authorEmail?.trim() || null,
        }]);

      if (error) {
        console.error('Error creating reply:', error);
        toast({
          title: "Error",
          description: "Failed to post reply. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Reply Posted!",
        description: "Your reply has been posted successfully.",
      });

      loadReplies();
      return true;
    } catch (error) {
      console.error('Error creating reply:', error);
      toast({
        title: "Error",
        description: "Failed to post reply. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    loadReplies();
  }, [discussionId]);

  return {
    replies,
    loading,
    loadReplies,
    createReply,
  };
};