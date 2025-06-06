
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, MapPin, Users, Calendar, Award, BookOpen, Download } from "lucide-react";
import CyberBackground from "@/components/CyberBackground";
import ResourcesTab from "@/components/ResourcesTab";

const Program = () => {
  const [inspirationalMessage, setInspirationalMessage] = useState("");

  useEffect(() => {
    const savedMessage = localStorage.getItem("inspirationalMessage");
    if (savedMessage) {
      setInspirationalMessage(savedMessage);
    } else {
      setInspirationalMessage("Stay vigilant, stay secure! Your digital safety is in your hands. 🛡️");
    }
  }, []);

  const trainingSchedule = [
    { time: "10:00 – 10:10", activity: "Opening Remarks and Welcome", facilitator: "University Librarian" },
    { time: "10:10 – 10:20", activity: "Introduction to Cybersecurity", facilitator: "Deputy Director, ISTAD" },
    { time: "10:20 – 10:30", activity: "ISTAD's Role in Cybersecurity", facilitator: "Deputy Director, ISTAD" },
    { time: "10:30 – 10:40", activity: "The need for Cybersecurity", facilitator: "Deputy Director, ISTAD" },
    { time: "10:40 – 10:50", activity: "What Motivates Cyber Criminals?", facilitator: "Deputy Director, ISTAD" },
    { time: "10:50 – 11:00", activity: "Types of Cyber Crime", facilitator: "Deputy Director, ISTAD" },
    { time: "11:00 – 11:20", activity: "Phishing & Social Engineering", facilitator: "Deputy Director, ISTAD" },
    { time: "11:20 – 11:25", activity: "Video Demonstration", facilitator: "All Facilitators" },
    { time: "11:25 – 11:30", activity: "Password Strength Demonstration", facilitator: "All Facilitators" },
    { time: "11:35 – 11:40", activity: "Attack Map Demonstration", facilitator: "All Facilitators" },
    { time: "11:40 – 11:50", activity: "Conclusion", facilitator: "Deputy Director, ISTAD" },
    { time: "11:50 – 12:00", activity: "Q&A, Interactive Session", facilitator: "All Facilitators" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 relative overflow-hidden">
      <CyberBackground />
      
      <div className="relative z-20 container mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <img 
              src="/lovable-uploads/edb649cb-0092-4609-a197-946f2fe735de.png" 
              alt="KNUST Logo" 
              className="h-12 sm:h-16 w-auto drop-shadow-lg"
            />
            <div className="text-left">
              <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-wide">
                CYBERSECURITY TRAINING
              </h1>
              <p className="text-green-400 font-mono text-sm sm:text-base">Organized by Library & UITS, KNUST</p>
            </div>
          </div>
          
          {/* Event Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
            <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
              <CardContent className="p-3 sm:p-4 text-center">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mx-auto mb-2" />
                <p className="text-white font-semibold text-sm sm:text-base">Tuesday, 3rd June 2025</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
              <CardContent className="p-3 sm:p-4 text-center">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mx-auto mb-2" />
                <p className="text-white font-semibold text-sm sm:text-base">10:00 AM – 12:00 PM</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
              <CardContent className="p-3 sm:p-4 text-center">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mx-auto mb-2" />
                <p className="text-white font-semibold text-sm sm:text-base">Library Mall Conference Room</p>
              </CardContent>
            </Card>
          </div>

          {/* Theme */}
          <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-6 h-6 text-green-400 mr-2" />
                <h2 className="text-lg sm:text-xl font-bold text-white">Training Theme</h2>
              </div>
              <p className="text-green-400 font-semibold text-base sm:text-lg">
                "Cybersecurity Essentials: Staying Safe in a Digital Workplace"
              </p>
            </CardContent>
          </Card>
        </div>

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
            {/* Training Schedule */}
            <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span>Training Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="grid gap-2">
                    {trainingSchedule.map((item, index) => (
                      <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-green-400 font-semibold font-mono text-sm">{item.time}</span>
                        </div>
                        <div className="sm:col-span-1">
                          <span className="text-white font-medium text-sm">{item.activity}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{item.facilitator}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inspirational Message */}
            {inspirationalMessage && (
              <Card className="bg-gradient-to-r from-green-600/20 to-green-700/20 backdrop-blur-sm border-green-400/50 mb-6">
                <CardContent className="p-4 sm:p-6 text-center">
                  <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <p className="text-green-300 font-semibold text-base sm:text-lg leading-relaxed">
                    {inspirationalMessage}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => window.location.href = "/"} 
                variant="outline"
                className="bg-gray-800/80 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-gray-700 hover:border-green-400"
              >
                Back to Home
              </Button>
              <Button 
                onClick={() => window.location.href = "/admin/login"} 
                variant="outline"
                className="bg-gray-800/80 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-gray-700 hover:border-green-400"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin Panel
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <ResourcesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Program;
