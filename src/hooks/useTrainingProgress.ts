
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useEvents } from '@/hooks/useEvents';
import { toast } from 'sonner';

interface TrainingProgress {
  id: string;
  user_id: string;
  event_id: string | null;
  session_index: number;
  session_title: string;
  completed_at: string;
  created_at: string;
}

export const useTrainingProgress = () => {
  const { user } = useAuth();
  const { activeEvent } = useEvents();
  const [completedSessions, setCompletedSessions] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Load user's progress from database
  const loadProgress = async () => {
    if (!user || !activeEvent) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('training_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('event_id', activeEvent.id);

      if (error) {
        console.error('Error loading progress:', error);
        toast.error('Failed to load progress');
        return;
      }

      if (data) {
        const sessionIndices = data.map(item => item.session_index);
        setCompletedSessions(sessionIndices);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
      toast.error('Failed to load progress');
    } finally {
      setLoading(false);
    }
  };

  // Mark session as complete
  const markSessionComplete = async (sessionIndex: number, sessionTitle: string) => {
    if (!user || !activeEvent) {
      toast.error('Please sign in to track progress');
      return false;
    }

    try {
      const { error } = await supabase
        .from('training_progress')
        .insert({
          user_id: user.id,
          event_id: activeEvent.id,
          session_index: sessionIndex,
          session_title: sessionTitle
        });

      if (error) {
        console.error('Error marking session complete:', error);
        toast.error('Failed to mark session as complete');
        return false;
      }

      setCompletedSessions(prev => [...prev, sessionIndex]);
      toast.success('Session marked as complete!');
      return true;
    } catch (error) {
      console.error('Error marking session complete:', error);
      toast.error('Failed to mark session as complete');
      return false;
    }
  };

  // Unmark session as complete
  const unmarkSessionComplete = async (sessionIndex: number) => {
    if (!user || !activeEvent) {
      toast.error('Please sign in to track progress');
      return false;
    }

    try {
      const { error } = await supabase
        .from('training_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('event_id', activeEvent.id)
        .eq('session_index', sessionIndex);

      if (error) {
        console.error('Error unmarking session:', error);
        toast.error('Failed to unmark session');
        return false;
      }

      setCompletedSessions(prev => prev.filter(index => index !== sessionIndex));
      toast.success('Session unmarked');
      return true;
    } catch (error) {
      console.error('Error unmarking session:', error);
      toast.error('Failed to unmark session');
      return false;
    }
  };

  // Toggle session completion
  const toggleSessionCompletion = async (sessionIndex: number, sessionTitle: string) => {
    if (completedSessions.includes(sessionIndex)) {
      return await unmarkSessionComplete(sessionIndex);
    } else {
      return await markSessionComplete(sessionIndex, sessionTitle);
    }
  };

  // Calculate progress percentage
  const getProgressPercentage = (totalSessions: number) => {
    if (totalSessions === 0) return 0;
    return Math.round((completedSessions.length / totalSessions) * 100);
  };

  useEffect(() => {
    loadProgress();
  }, [user, activeEvent]);

  return {
    completedSessions,
    loading,
    toggleSessionCompletion,
    getProgressPercentage,
    loadProgress
  };
};
