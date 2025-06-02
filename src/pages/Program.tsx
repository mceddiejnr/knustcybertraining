
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, MapPin, Calendar, Users, Shield } from "lucide-react";

const Program = () => {
  const scheduleItems = [
    {
      time: "10:00 – 10:10",
      activity: "Opening Remarks and Welcome",
      facilitator: "Dr. Samuel Kotei Nikoi (University Librarian)"
    },
    {
      time: "10:10 – 10:25",
      activity: "Introduction to Cybersecurity",
      facilitator: "Mr. Phanuel Kwadwo Seli Asense (Deputy Director)"
    },
    {
      time: "10:25 – 10:45",
      activity: "Common Cyber Threats & Prevention Tips",
      facilitator: "Cybersecurity Expert"
    },
    {
      time: "10:45 – 11:10",
      activity: "Safe Use of Email, Passwords & Cloud Tools",
      facilitator: "Microsoft 365 Trainer"
    },
    {
      time: "11:10 – 11:30",
      activity: "Cybersecurity Policies and Best Practices",
      facilitator: "UITS Representative"
    },
    {
      time: "11:30 – 11:50",
      activity: "Q&A and Interactive Session",
      facilitator: "All Facilitators"
    },
    {
      time: "11:50 – 12:00",
      activity: "Closing Remarks & Next Steps",
      facilitator: "Training Coordinator"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-green-50 py-8 px-4 relative overflow-hidden">
      {/* Elegant floating elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-red-400 to-red-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-6">
          {/* KNUST Logo */}
          <div className="mb-4">
            <img 
              src="/lovable-uploads/edb649cb-0092-4609-a197-946f2fe735de.png" 
              alt="KNUST Logo" 
              className="h-20 w-auto drop-shadow-lg"
            />
          </div>
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="mb-4 bg-white/80 border-yellow-300 text-gray-700 hover:bg-yellow-50 hover:border-yellow-400 backdrop-blur-sm rounded-xl shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-yellow-200/50 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white p-8 relative overflow-hidden">
            {/* Header background pattern */}
            <div className="absolute inset-0 opacity-20">
              <Shield className="absolute top-4 right-4 w-12 h-12 text-white animate-pulse" />
              <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/20 rounded-full animate-pulse"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-white" />
                <h1 className="text-3xl font-bold">
                  KNUST Cybersecurity Training Session Outline
                </h1>
              </div>
              <p className="text-white/90 text-lg mb-6 font-medium">
                "Securing Digital Workspaces: Awareness, Prevention, and Best Practices" ✨
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">Tuesday, 3rd June 2025</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">10:00 AM – 12:00 Noon</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">Library Mall Conference Room, KNUST</span>
                </div>
              </div>
              
              <div className="mt-4 flex items-center space-x-2 text-sm bg-white/10 rounded-xl p-3 inline-flex backdrop-blur-sm">
                <Users className="w-4 h-4" />
                <span className="font-medium">Target Audience: KNUST Library Staff</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <Shield className="w-6 h-6 text-yellow-500" />
              <span>Training Schedule 📅</span>
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-yellow-300">
                    <th className="text-left py-4 px-4 font-bold text-gray-700 bg-yellow-50 rounded-tl-xl">Time</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700 bg-yellow-50">Activity</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700 bg-yellow-50 rounded-tr-xl">Facilitator</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleItems.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-gray-200 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-green-50 transition-all duration-200 ${
                        index % 2 === 0 ? 'bg-blue-50/30' : 'bg-white'
                      }`}
                    >
                      <td className="py-4 px-4 font-mono text-sm text-red-600 font-bold bg-red-50/50 rounded-l-lg">
                        {item.time}
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-800">
                        {item.activity}
                      </td>
                      <td className="py-4 px-4 text-gray-600 font-medium">
                        {item.facilitator}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 border border-yellow-200/50 shadow-inner">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span>Important Notes 📋</span>
              </h3>
              <ul className="text-gray-700 space-y-2 text-sm font-medium">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  <span>Please arrive 10 minutes early for registration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  <span>Bring your KNUST ID for verification</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Interactive sessions will include hands-on exercises</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
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
