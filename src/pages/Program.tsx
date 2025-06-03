import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, MapPin, Calendar, Users, Shield } from "lucide-react";
import { useState, useEffect } from "react";

interface Session {
  id: number;
  time: string;
  topic: string;
  speaker: string;
  description?: string;
}

const Program = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  const defaultScheduleItems = [
    {
      id: 1,
      time: "10:00 – 10:10",
      topic: "Opening Remarks and Welcome",
      speaker: "University Librarian"
    },
    {
      id: 2,
      time: "10:10 – 10:20",
      topic: "Introduction to Cybersecurity",
      speaker: "Deputy Director, ISTAD"
    },
    {
      id: 3,
      time: "10:20 – 10:30",
      topic: "ISTAD's Role in Cybersecurity",
      speaker: "Deputy Director, ISTAD"
    },
    {
      id: 4,
      time: "10:30 – 10:40",
      topic: "The need for Cybersecurity",
      speaker: "Deputy Director, ISTAD"
    },
    {
      id: 5,
      time: "10:40 – 10:50",
      topic: "What Motivates Cyber Criminals?",
      speaker: "Deputy Director, ISTAD"
    },
    {
      id: 6,
      time: "10:50 – 11:00",
      topic: "Types of Cyber Crime",
      speaker: "Deputy Director, ISTAD"
    },
    {
      id: 7,
      time: "11:00 – 11:20",
      topic: "Phishing & Social Engineering",
      speaker: "Deputy Director, ISTAD"
    },
    {
      id: 8,
      time: "11:20 – 11:25",
      topic: "Video Demonstration",
      speaker: "All Facilitators"
    },
    {
      id: 9,
      time: "11:25 – 11:30",
      topic: "Password Strength Demonstration",
      speaker: "All Facilitators"
    },
    {
      id: 10,
      time: "11:35 – 11:40",
      topic: "Attack Map Demonstration",
      speaker: "All Facilitators"
    },
    {
      id: 11,
      time: "11:40 – 11:50",
      topic: "Conclusion",
      speaker: "Deputy Director, ISTAD"
    },
    {
      id: 12,
      time: "11:50 – 12:00",
      topic: "Q&A, Interactive Session",
      speaker: "All Facilitators"
    }
  ];

  useEffect(() => {
    // Load sessions from localStorage or use defaults
    const savedSessions = localStorage.getItem("programSessions");
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    } else {
      setSessions(defaultScheduleItems);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 relative overflow-hidden">
      {/* Cyber background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22 bg-gradient-to-br from-green-600 to-green-800 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-10 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-300 to-green-500 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-6xl">
        <div className="mb-6">
          {/* KNUST Logo */}
          <div className="mb-4">
            <img 
              src="/lovable-uploads/edb649cb-0092-4609-a197-946f2fe735de.png" 
              alt="KNUST Logo" 
              className="h-12 sm:h-14 md:h-16 w-auto drop-shadow-lg"
            />
          </div>
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="mb-4 bg-gray-800/80 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-gray-700 hover:border-green-400 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-green-500/30 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 via-gray-700 to-green-600 text-white p-6 md:p-8 relative overflow-hidden">
            {/* Header background pattern */}
            <div className="absolute inset-0 opacity-20">
              <Shield className="absolute top-4 right-4 w-8 h-8 md:w-12 md:h-12 text-white animate-pulse" />
              <div className="absolute bottom-4 left-4 w-6 h-6 md:w-10 md:h-10 bg-white/20 rounded-full animate-pulse"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                  KNUST Cybersecurity Training Session
                </h1>
              </div>
              <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6 font-medium">
                "Cybersecurity Essentials: Staying Safe in a Digital Workplace" 🛡️
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
                <div className="flex items-center space-x-2 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <Calendar className="w-4 h-4 flex-shrink-0 text-green-400" />
                  <span className="font-medium">Tuesday, 3rd June 2025</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <Clock className="w-4 h-4 flex-shrink-0 text-green-400" />
                  <span className="font-medium">10:00 AM – 12:00 PM</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-xl p-3 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                  <MapPin className="w-4 h-4 flex-shrink-0 text-green-400" />
                  <span className="font-medium">Library Mall Conference Room</span>
                </div>
              </div>
              
              <div className="mt-4 flex items-center space-x-2 text-xs sm:text-sm bg-white/10 rounded-xl p-3 inline-flex backdrop-blur-sm">
                <Users className="w-4 h-4 flex-shrink-0 text-green-400" />
                <span className="font-medium">Target Audience: KNUST Library Staff</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
              <span>Training Schedule 📅</span>
            </h2>
            
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-green-500/30">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-green-500/30 bg-gray-700/50">
                    <th className="text-left py-4 px-4 font-bold text-green-400 text-sm lg:text-base">Time</th>
                    <th className="text-left py-4 px-4 font-bold text-green-400 text-sm lg:text-base">Activity</th>
                    <th className="text-left py-4 px-4 font-bold text-green-400 text-sm lg:text-base">Facilitator</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((item, index) => (
                    <tr 
                      key={item.id} 
                      className={`border-b border-gray-600/30 hover:bg-gray-700/30 transition-all duration-200 ${
                        index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-700/20'
                      }`}
                    >
                      <td className="py-4 px-4 font-mono text-sm lg:text-base text-green-400 font-bold">
                        {item.time}
                      </td>
                      <td className="py-4 px-4 font-semibold text-white text-sm lg:text-base">
                        {item.topic}
                      </td>
                      <td className="py-4 px-4 text-gray-300 font-medium text-sm lg:text-base">
                        {item.speaker}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet Cards */}
            <div className="md:hidden space-y-4">
              {sessions.map((item, index) => (
                <div key={item.id} className="bg-gray-700/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-mono text-sm text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded-lg border border-green-500/20">
                      {item.time}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">
                    {item.topic}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm">
                    <span className="text-green-400 font-medium">Facilitator:</span> {item.speaker}
                  </p>
                </div>
              ))}
            </div>

            {/* Important Notes */}
            <div className="mt-8 bg-gray-700/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 shadow-inner">
              <h3 className="font-bold text-white mb-4 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm sm:text-base md:text-lg">Important Notes 📋</span>
              </h3>
              <ul className="text-gray-300 space-y-3 text-xs sm:text-sm md:text-base font-medium">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
                  <span>Please arrive 10 minutes early for registration</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span>Bring your KNUST ID for verification</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></span>
                  <span>Interactive sessions will include hands-on exercises</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-green-700 rounded-full flex-shrink-0"></span>
                  <span>Light refreshments will be served during breaks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Program;
