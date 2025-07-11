
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { Users, TrendingUp, Award, Clock } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';

interface UserProgress {
  user_id: string;
  user_name: string;
  completed_sessions: number;
  total_sessions: number;
  progress_percentage: number;
  last_activity: string;
}

interface ProgressStats {
  totalUsers: number;
  averageCompletion: number;
  completedUsers: number;
  activeUsers: number;
}

const TrainingProgressPanel = () => {
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [stats, setStats] = useState<ProgressStats>({
    totalUsers: 0,
    averageCompletion: 0,
    completedUsers: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const { activeEvent } = useEvents();

  const TOTAL_SESSIONS = 12; // Total number of training sessions

  const loadProgressData = async () => {
    if (!activeEvent) return;

    try {
      setLoading(true);

      // Get all progress data for the active event
      const { data: progressData, error: progressError } = await supabase
        .from('training_progress')
        .select(`
          user_id,
          session_index,
          completed_at,
          profiles!inner(full_name)
        `)
        .eq('event_id', activeEvent.id);

      if (progressError) {
        console.error('Error loading progress data:', progressError);
        return;
      }

      // Group progress by user
      const userProgressMap = new Map<string, {
        name: string;
        sessions: Set<number>;
        lastActivity: string;
      }>();

      progressData?.forEach((item: any) => {
        const userId = item.user_id;
        const userName = item.profiles?.full_name || 'Unknown User';
        
        if (!userProgressMap.has(userId)) {
          userProgressMap.set(userId, {
            name: userName,
            sessions: new Set(),
            lastActivity: item.completed_at
          });
        }
        
        const userData = userProgressMap.get(userId)!;
        userData.sessions.add(item.session_index);
        
        // Update last activity if this is more recent
        if (new Date(item.completed_at) > new Date(userData.lastActivity)) {
          userData.lastActivity = item.completed_at;
        }
      });

      // Convert to array format
      const progressArray: UserProgress[] = Array.from(userProgressMap.entries()).map(([userId, data]) => ({
        user_id: userId,
        user_name: data.name,
        completed_sessions: data.sessions.size,
        total_sessions: TOTAL_SESSIONS,
        progress_percentage: Math.round((data.sessions.size / TOTAL_SESSIONS) * 100),
        last_activity: data.lastActivity
      }));

      // Sort by progress percentage (descending)
      progressArray.sort((a, b) => b.progress_percentage - a.progress_percentage);

      setUserProgress(progressArray);

      // Calculate statistics
      const totalUsers = progressArray.length;
      const averageCompletion = totalUsers > 0 
        ? Math.round(progressArray.reduce((sum, user) => sum + user.progress_percentage, 0) / totalUsers)
        : 0;
      const completedUsers = progressArray.filter(user => user.progress_percentage === 100).length;
      const activeUsers = progressArray.filter(user => {
        const lastActivity = new Date(user.last_activity);
        const daysSinceActivity = (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceActivity <= 7; // Active in last 7 days
      }).length;

      setStats({
        totalUsers,
        averageCompletion,
        completedUsers,
        activeUsers
      });

    } catch (error) {
      console.error('Error loading progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProgressData();
  }, [activeEvent]);

  if (loading) {
    return (
      <Card className="bg-gray-800/90 backdrop-blur-sm border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white">Loading Training Progress...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800/90 backdrop-blur-sm border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/90 backdrop-blur-sm border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Avg. Completion</p>
                <p className="text-2xl font-bold text-white">{stats.averageCompletion}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/90 backdrop-blur-sm border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-white">{stats.completedUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/90 backdrop-blur-sm border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-sm text-gray-400">Active (7d)</p>
                <p className="text-2xl font-bold text-white">{stats.activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Progress Table */}
      <Card className="bg-gray-800/90 backdrop-blur-sm border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
            Individual Training Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userProgress.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No training progress data available for the current event.
            </p>
          ) : (
            <div className="space-y-4">
              {userProgress.map((user) => (
                <div key={user.user_id} className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{user.user_name}</h4>
                    <span className="text-sm text-gray-400">
                      {user.completed_sessions}/{user.total_sessions} sessions
                    </span>
                  </div>
                  
                  <Progress 
                    value={user.progress_percentage} 
                    className="h-2 mb-2" 
                  />
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{user.progress_percentage}% Complete</span>
                    <span>
                      Last activity: {new Date(user.last_activity).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingProgressPanel;
