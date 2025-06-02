
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, MapPin, Lock, CircuitBoard } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-8 px-4 relative overflow-hidden">
      {/* Background Tech Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-cyan-400 rotate-45"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-green-400 rotate-12"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 border border-blue-400 -rotate-12"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 border border-cyan-400 rotate-45"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-6">
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="mb-4 bg-slate-800/50 border-cyan-500/30 text-cyan-400 hover:bg-slate-700/50 hover:border-cyan-400 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/20 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-600/90 via-blue-600/90 to-slate-600/90 text-white p-8 relative overflow-hidden">
            {/* Header background pattern */}
            <div className="absolute inset-0 opacity-20">
              <CircuitBoard className="absolute top-4 right-4 w-12 h-12 text-cyan-300" />
              <Lock className="absolute bottom-4 left-4 w-10 h-10 text-green-300" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <Lock className="w-8 h-8 text-cyan-300" />
                <h1 className="text-3xl font-bold">
                  Cybersecurity Training Session Outline
                </h1>
              </div>
              <p className="text-cyan-100 text-lg mb-6">
                "Securing Digital Workspaces: Awareness, Prevention, and Best Practices"
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
                  <CircuitBoard className="w-4 h-4" />
                  <span>Tuesday, 3rd June 2025</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
                  <Clock className="w-4 h-4" />
                  <span>10:00 AM – 12:00 Noon</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
                  <MapPin className="w-4 h-4" />
                  <span>Library Mall Conference Room, KNUST</span>
                </div>
              </div>
              
              <div className="mt-4 flex items-center space-x-2 text-sm bg-white/10 rounded-lg p-2 inline-flex">
                <Lock className="w-4 h-4" />
                <span>Target Audience: Library Staff</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <CircuitBoard className="w-6 h-6 text-cyan-400" />
              <span>Training Schedule</span>
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-cyan-500/30">
                    <th className="text-left py-3 px-4 font-semibold text-cyan-400">Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-cyan-400">Activity</th>
                    <th className="text-left py-3 px-4 font-semibold text-cyan-400">Facilitator</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleItems.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-slate-600/30 hover:bg-cyan-500/10 transition-colors ${
                        index % 2 === 0 ? 'bg-slate-700/30' : 'bg-slate-800/30'
                      }`}
                    >
                      <td className="py-4 px-4 font-mono text-sm text-cyan-300 font-medium">
                        {item.time}
                      </td>
                      <td className="py-4 px-4 font-medium text-white">
                        {item.activity}
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        {item.facilitator}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-slate-700/50 rounded-xl p-6 border border-cyan-500/20">
              <h3 className="font-semibold text-white mb-2 flex items-center space-x-2">
                <Lock className="w-5 h-5 text-cyan-400" />
                <span>Important Notes:</span>
              </h3>
              <ul className="text-slate-300 space-y-1 text-sm">
                <li>• Please arrive 10 minutes early for registration</li>
                <li>• Bring your KNUST ID for verification</li>
                <li>• Interactive sessions will include hands-on exercises</li>
                <li>• Light refreshments will be served during breaks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Program;
