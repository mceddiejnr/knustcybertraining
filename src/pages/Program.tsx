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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center z-30 transition-transform hover:scale-110"
            aria-label="Provide Feedback"
          >
            <MessageSquare className="h-7 w-7" />
            <span className="sr-only">Provide Feedback</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-gray-900/90 backdrop-blur-sm border-l border-green-500/30 text-white outline-none w-full sm:max-w-md p-0">
          <SheetHeader className="p-6 pb-4 text-left">
            <SheetTitle className="flex items-center space-x-3 text-white text-2xl">
              <MessageSquare className="w-7 h-7 text-green-400" />
              <span>Workshop Feedback</span>
            </SheetTitle>
            <SheetDescription className="text-gray-400 pt-2">
              Your feedback is anonymous and helps us improve.
            </SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(100vh-120px)] px-6 pb-6">
            <FeedbackForm isInDrawer={true} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Program;
