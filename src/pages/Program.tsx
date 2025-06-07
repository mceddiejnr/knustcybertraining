
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, MapPin, Users, Calendar, Award, BookOpen, Download, Target, Lightbulb, CheckCircle } from "lucide-react";
import CyberBackground from "@/components/CyberBackground";
import ResourcesTab from "@/components/ResourcesTab";

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

  const learningObjectives = [
    "Understand the fundamentals of cybersecurity and its importance in the digital workplace",
    "Identify common cyber threats including phishing, malware, and social engineering attacks",
    "Learn best practices for password security and multi-factor authentication",
    "Develop skills to recognize and respond to suspicious activities",
    "Understand KNUST's cybersecurity policies and reporting procedures",
    "Create a personal cybersecurity action plan for daily work activities"
  ];

  const keyTopics = [
    { icon: Shield, title: "Threat Awareness", description: "Understanding current cybersecurity threats and attack vectors" },
    { icon: Target, title: "Risk Assessment", description: "Identifying vulnerabilities in personal and professional environments" },
    { icon: Lightbulb, title: "Best Practices", description: "Implementing security measures and protective strategies" },
    { icon: Users, title: "Incident Response", description: "Proper procedures for reporting and handling security incidents" }
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
            {/* Learning Objectives */}
            <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Target className="w-5 h-5 text-green-400" />
                  <span>Learning Objectives</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {learningObjectives.map((objective, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{objective}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Topics */}
            <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Lightbulb className="w-5 h-5 text-green-400" />
                  <span>Key Topics Covered</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {keyTopics.map((topic, index) => (
                    <div key={index} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                      <div className="flex items-center space-x-3 mb-2">
                        <topic.icon className="w-5 h-5 text-green-400" />
                        <h3 className="text-white font-semibold">{topic.title}</h3>
                      </div>
                      <p className="text-gray-300 text-sm">{topic.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Training Schedule */}
            <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-green-400" />
                    <span>Training Schedule</span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {completedSessions.length}/{trainingSchedule.length} completed
                  </span>
                </CardTitle>
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
                          <Button
                            onClick={() => toggleSessionCompletion(index)}
                            variant="ghost"
                            size="sm"
                            className="sm:hidden h-6 w-6 p-0"
                          >
                            <CheckCircle className={`w-4 h-4 ${completedSessions.includes(index) ? 'text-green-400' : 'text-gray-400'}`} />
                          </Button>
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
                          <Button
                            onClick={() => toggleSessionCompletion(index)}
                            variant="ghost"
                            size="sm"
                            className="hidden sm:flex h-6 w-6 p-0"
                          >
                            <CheckCircle className={`w-4 h-4 ${completedSessions.includes(index) ? 'text-green-400' : 'text-gray-400'}`} />
                          </Button>
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
