
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Download, MessageSquare } from "lucide-react";
import CyberBackground from "@/components/CyberBackground";
import ProgramResources from "@/components/ProgramResources";
import FeedbackForm from "@/components/FeedbackForm";
import ProgramHeader from "@/components/ProgramHeader";
import LearningObjectives from "@/components/LearningObjectives";
import KeyTopics from "@/components/KeyTopics";
import TrainingSchedule from "@/components/TrainingSchedule";
import InspirationalMessage from "@/components/InspirationalMessage";
import QuickActions from "@/components/QuickActions";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

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
      
      <div className="relative z-20 container mx-auto p-4 sm:p-6 pb-24">
        <ProgramHeader />

        {/* Tabs */}
        <Tabs defaultValue="program" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/80 backdrop-blur-sm border border-green-500/30">
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
            <ProgramResources />
          </TabsContent>
        </Tabs>
      </div>

      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center z-30 transition-transform hover:scale-110"
            aria-label="Provide Feedback"
          >
            <MessageSquare className="h-7 w-7" />
            <span className="sr-only">Provide Feedback</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-gray-900/95 backdrop-blur-sm border-t border-green-500/30 text-white outline-none">
          <div className="mx-auto w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-gray-600 shrink-0" />
            <div className="overflow-y-auto p-4">
              <DrawerHeader className="text-left">
                <DrawerTitle className="flex items-center space-x-2 text-white text-xl">
                  <MessageSquare className="w-6 h-6 text-green-400" />
                  <span>Workshop Feedback</span>
                </DrawerTitle>
                <DrawerDescription className="text-gray-400 pt-2">
                  Help us improve future cybersecurity training sessions by sharing your experience.
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 pb-4">
                <FeedbackForm isInDrawer={true} />
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Program;
