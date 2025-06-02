
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, MapPin, Users, Calendar } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="mb-4 hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
            <h1 className="text-3xl font-bold mb-4">
              Cybersecurity Training Session Outline
            </h1>
            <p className="text-blue-100 text-lg mb-6">
              "Securing Digital Workspaces: Awareness, Prevention, and Best Practices"
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Tuesday, 3rd June 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>10:00 AM – 12:00 Noon</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Library Mall Conference Room, KNUST</span>
              </div>
            </div>
            
            <div className="mt-4 flex items-center space-x-2 text-sm">
              <Users className="w-4 h-4" />
              <span>Target Audience: Library Staff</span>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Training Schedule
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Activity</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Facilitator</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleItems.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <td className="py-4 px-4 font-mono text-sm text-blue-600 font-medium">
                        {item.time}
                      </td>
                      <td className="py-4 px-4 font-medium text-gray-800">
                        {item.activity}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {item.facilitator}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                Important Notes:
              </h3>
              <ul className="text-gray-600 space-y-1 text-sm">
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
