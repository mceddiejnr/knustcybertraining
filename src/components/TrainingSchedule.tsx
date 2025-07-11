
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, CheckCircle } from "lucide-react";
import { useTrainingProgress } from "@/hooks/useTrainingProgress";
import { useAuth } from "@/hooks/useAuth";
import ProgressIndicator from "@/components/ProgressIndicator";

const TrainingSchedule = () => {
  const { user } = useAuth();
  const { completedSessions, toggleSessionCompletion, getProgressPercentage, loading } = useTrainingProgress();

  const trainingSchedule = [
    { time: "10:00 – 10:10", activity: "Opening Remarks and Welcome", facilitator: "University Librarian", description: "Welcome address and introduction to the training program" },
    { time: "10:10 – 10:20", activity: "Introduction to Cybersecurity", facilitator: "Deputy Director, ISTAD", description: "Fundamentals of cybersecurity and its importance" },
    { time: "10:20 – 10:30", activity: "ISTAD's Role in Cybersecurity", facilitator: "Deputy Director, ISTAD", description: "Understanding KNUST's cybersecurity initiatives" },
    { time: "10:30 – 10:40", activity: "The need for Cybersecurity", facilitator: "Deputy Director, ISTAD", description: "Current threat landscape and why cybersecurity matters" },
    { time: "10:40 – 10:50", activity: "What Motivates Cyber Criminals?", facilitator: "Deputy Director, ISTAD", description: "Psychology behind cyber attacks and criminal motivations" },
    { time: "10:50 – 11:00", activity: "Types of Cyber Crime", facilitator: "Deputy Director, ISTAD", description: "Overview of malware, ransomware, and other threats" },
    { time: "11:00 – 11:20", activity: "Phishing & Social Engineering", facilitator: "Deputy Director, ISTAD", description: "Hands-on identification of phishing attempts" },
    { time: "11:20 – 11:25", activity: "Video Demonstration", facilitator: "All Facilitators", description: "Real-world cybersecurity incident case studies" },
    { time: "11:25 – 11:30", activity: "Password Strength Demonstration", facilitator: "All Facilitators", description: "Interactive password creation and testing" },
    { time: "11:35 – 11:40", activity: "Attack Map Demonstration", facilitator: "All Facilitators", description: "Live visualization of global cyber threats" },
    { time: "11:40 – 11:50", activity: "Conclusion", facilitator: "Deputy Director, ISTAD", description: "Key takeaways and next steps" },
    { time: "11:50 – 12:00", activity: "Q&A, Interactive Session", facilitator: "All Facilitators", description: "Open discussion and practical questions" }
  ];

  const handleToggleCompletion = async (index: number, sessionTitle: string) => {
    if (!user) {
      return;
    }
    
    await toggleSessionCompletion(index, sessionTitle);
  };

  if (loading) {
    return (
      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Loading Training Schedule...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-green-400" />
            <span>Training Schedule</span>
          </div>
        </CardTitle>
        
        {user && (
          <div className="mt-4">
            <ProgressIndicator 
              completed={completedSessions.length} 
              total={trainingSchedule.length} 
            />
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <div className="grid gap-3">
            {trainingSchedule.map((item, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 p-4 rounded-lg border transition-all duration-200 ${
                  completedSessions.includes(index) 
                    ? 'bg-green-700/30 border-green-500' 
                    : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700/70'
                }`}
              >
                <div className="flex items-center justify-between sm:justify-start">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-green-400 font-semibold font-mono text-sm">{item.time}</span>
                  </div>
                  {user && (
                    <Button
                      onClick={() => handleToggleCompletion(index, item.activity)}
                      variant="ghost"
                      size="sm"
                      className="sm:hidden h-6 w-6 p-0"
                    >
                      <CheckCircle className={`w-4 h-4 ${completedSessions.includes(index) ? 'text-green-400' : 'text-gray-400'}`} />
                    </Button>
                  )}
                </div>
                
                <div className="sm:col-span-2">
                  <h4 className="text-white font-medium text-sm mb-1">{item.activity}</h4>
                  <p className="text-gray-400 text-xs">{item.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item.facilitator}</span>
                  </div>
                  {user && (
                    <Button
                      onClick={() => handleToggleCompletion(index, item.activity)}
                      variant="ghost"
                      size="sm"
                      className="hidden sm:flex h-6 w-6 p-0"
                    >
                      <CheckCircle className={`w-4 h-4 ${completedSessions.includes(index) ? 'text-green-400' : 'text-gray-400'}`} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {!user && (
          <div className="mt-4 p-4 bg-blue-700/20 border border-blue-500/30 rounded-lg">
            <p className="text-blue-300 text-sm text-center">
              Sign in to track your training progress and mark sessions as complete
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrainingSchedule;
