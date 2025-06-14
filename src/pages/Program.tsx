
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Download, MessageSquare } from "lucide-react";
import CyberBackground from "@/components/CyberBackground";
import ResourcesTab from "@/components/ResourcesTab";
import FeedbackForm from "@/components/FeedbackForm";
import ProgramHeader from "@/components/ProgramHeader";
import LearningObjectives from "@/components/LearningObjectives";
import KeyTopics from "@/components/KeyTopics";
import TrainingSchedule from "@/components/TrainingSchedule";
import InspirationalMessage from "@/components/InspirationalMessage";
import QuickActions from "@/components/QuickActions";

const Program = () => {
  const [inspirationalMessage, setInspirationalMessage] = useState("");
  const [completedSessions, setCompletedSessions] = useState<number[]>([]);

  useEffect(() => {
    const savedMessage = localStorage.getItem("inspirationalMessage");
    if (savedMessage) {
      setInspirationalMessage(savedMessage);
    } else {
      setInspirationalMessage("Stay vigilant, stay secure! Your digital safety is in your hands. 🛡️");
    }

    const savedCompleted = localStorage.getItem("completedSessions");
    if (savedCompleted) {
      setCompletedSessions(JSON.parse(savedCompleted));
    }
  }, []);

  const toggleSessionCompletion = (index: number) => {
    const updatedCompleted = completedSessions.includes(index)
      ? completedSessions.filter(i => i !== index)
      : [...completedSessions, index];
    
    setCompletedSessions(updatedCompleted);
    localStorage.setItem("completedSessions", JSON.stringify(updatedCompleted));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 relative overflow-hidden">
      <CyberBackground />
      
      <div className="relative z-20 container mx-auto p-4 sm:p-6">
        <ProgramHeader />

        {/* Tabs */}
        <Tabs defaultValue="program" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/80 backdrop-blur-sm border border-green-500/30">
            <TabsTrigger 
              value="program" 
              className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Program Outline
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger 
              value="feedback" 
              className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="program" className="mt-6">
            <LearningObjectives />
            <KeyTopics />
            <TrainingSchedule 
              completedSessions={completedSessions}
              toggleSessionCompletion={toggleSessionCompletion}
            />
            <InspirationalMessage message={inspirationalMessage} />
            <QuickActions />
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <ResourcesTab />
          </TabsContent>

          <TabsContent value="feedback" className="mt-6">
            <div className="mb-6">
              <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 mb-6">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h2 className="text-xl font-bold text-white mb-2">
                    Share Your Experience
                  </h2>
                  <p className="text-gray-300 text-sm">
                    Your feedback is valuable in helping us improve our cybersecurity training programs. 
                    Please take a moment to share your thoughts and experience from today's workshop.
                  </p>
                </CardContent>
              </Card>
              <FeedbackForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Program;
