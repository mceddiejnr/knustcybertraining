
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-4 sm:py-8 px-3 sm:px-4 relative overflow-hidden">
      {/* Professional background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 sm:top-40 right-10 sm:right-20 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-18 sm:w-28 h-18 sm:h-28 bg-gradient-to-br from-red-600 to-red-700 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 sm:bottom-40 right-10 w-14 sm:w-20 h-14 sm:h-20 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-4 sm:mb-6">
          {/* KNUST Logo */}
          <div className="mb-3 sm:mb-4">
            <img 
              src="/lovable-uploads/edb649cb-0092-4609-a197-946f2fe735de.png" 
              alt="KNUST Logo" 
              className="h-12 sm:h-16 md:h-20 w-auto drop-shadow-lg"
            />
          </div>
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="mb-3 sm:mb-4 bg-white/80 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-sm text-sm sm:text-base"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 via-slate-700 to-blue-600 text-white p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            {/* Header background pattern */}
            <div className="absolute inset-0 opacity-20">
              <Shield className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white animate-pulse" />
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-white/20 rounded-full animate-pulse"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold">
                  KNUST Cybersecurity Training Session
                </h1>
              </div>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 font-medium">
                "Securing Digital Workspaces: Awareness, Prevention, and Best Practices" 🛡️
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                <div className="flex items-center space-x-2 bg-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 backdrop-blur-sm">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="font-medium">Tuesday, 3rd June 2025</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 backdrop-blur-sm">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="font-medium">10:00 AM – 12:00 Noon</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="font-medium">Library Mall Conference Room</span>
                </div>
              </div>
              
              <div className="mt-3 sm:mt-4 flex items-center space-x-2 text-xs sm:text-sm bg-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 inline-flex backdrop-blur-sm">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="font-medium">Target Audience: KNUST Library Staff</span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center space-x-2">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
              <span>Training Schedule 📅</span>
            </h2>
            
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="hidden sm:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-300">
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-bold text-slate-700 bg-slate-50 rounded-tl-xl text-sm sm:text-base">Time</th>
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-bold text-slate-700 bg-slate-50 text-sm sm:text-base">Activity</th>
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-bold text-slate-700 bg-slate-50 rounded-tr-xl text-sm sm:text-base">Facilitator</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleItems.map((item, index) => (
                        <tr 
                          key={index} 
                          className={`border-b border-slate-200 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 transition-all duration-200 ${
                            index % 2 === 0 ? 'bg-slate-50/30' : 'bg-white'
                          }`}
                        >
                          <td className="py-3 sm:py-4 px-2 sm:px-4 font-mono text-xs sm:text-sm text-red-600 font-bold bg-red-50/50 rounded-l-lg">
                            {item.time}
                          </td>
                          <td className="py-3 sm:py-4 px-2 sm:px-4 font-semibold text-slate-800 text-sm sm:text-base">
                            {item.activity}
                          </td>
                          <td className="py-3 sm:py-4 px-2 sm:px-4 text-slate-600 font-medium text-sm sm:text-base">
                            {item.facilitator}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile view */}
                <div className="sm:hidden space-y-4">
                  {scheduleItems.map((item, index) => (
                    <div key={index} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-mono text-sm text-red-600 font-bold bg-red-50 px-2 py-1 rounded">
                          {item.time}
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-1 text-sm">
                        {item.activity}
                      </h3>
                      <p className="text-slate-600 text-xs">
                        {item.facilitator}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/50 shadow-inner">
              <h3 className="font-bold text-slate-800 mb-2 sm:mb-3 flex items-center space-x-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                <span className="text-sm sm:text-base">Important Notes 📋</span>
              </h3>
              <ul className="text-slate-700 space-y-1 sm:space-y-2 text-xs sm:text-sm font-medium">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                  <span>Please arrive 10 minutes early for registration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-slate-500 rounded-full flex-shrink-0"></span>
                  <span>Bring your KNUST ID for verification</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span>Interactive sessions will include hands-on exercises</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></span>
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
