
import { useState, useEffect } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { toast } from 'sonner';

interface TrainingProgress {
  sessionIndex: number;
  sessionTitle: string;
  completedAt: string;
  eventId?: string;
}

export const useTrainingProgress = () => {
  const { activeEvent } = useEvents();
  const [completedSessions, setCompletedSessions] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Load user's progress from localStorage
  const loadProgress = async () => {
    try {
      setLoading(true);
      const storageKey = activeEvent ? `training_progress_${activeEvent.id}` : 'training_progress_default';
      const savedProgress = localStorage.getItem(storageKey);
      
      if (savedProgress) {
        const progressData: TrainingProgress[] = JSON.parse(savedProgress);
        const sessionIndices = progressData.map(item => item.sessionIndex);
        setCompletedSessions(sessionIndices);
      }
    } catch (error) {
      console.error('Error loading progress from localStorage:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mark session as complete
  const markSessionComplete = async (sessionIndex: number, sessionTitle: string) => {
    try {
      const storageKey = activeEvent ? `training_progress_${activeEvent.id}` : 'training_progress_default';
      const existingProgress = localStorage.getItem(storageKey);
      let progressData: TrainingProgress[] = existingProgress ? JSON.parse(existingProgress) : [];

      // Check if session is already completed
      if (!progressData.some(item => item.sessionIndex === sessionIndex)) {
        progressData.push({
          sessionIndex,
          sessionTitle,
          completedAt: new Date().toISOString(),
          eventId: activeEvent?.id
        });

        localStorage.setItem(storageKey, JSON.stringify(progressData));
        setCompletedSessions(prev => [...prev, sessionIndex]);
        toast.success('Session marked as complete!');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error marking session complete:', error);
      toast.error('Failed to mark session as complete');
      return false;
    }
  };

  // Unmark session as complete
  const unmarkSessionComplete = async (sessionIndex: number) => {
    try {
      const storageKey = activeEvent ? `training_progress_${activeEvent.id}` : 'training_progress_default';
      const existingProgress = localStorage.getItem(storageKey);
      
      if (existingProgress) {
        let progressData: TrainingProgress[] = JSON.parse(existingProgress);
        progressData = progressData.filter(item => item.sessionIndex !== sessionIndex);
        
        localStorage.setItem(storageKey, JSON.stringify(progressData));
        setCompletedSessions(prev => prev.filter(index => index !== sessionIndex));
        toast.success('Session unmarked');
        return true;
      }
      return false;
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
  }, [activeEvent]);

  return {
    completedSessions,
    loading,
    toggleSessionCompletion,
    getProgressPercentage,
    loadProgress
  };
};
