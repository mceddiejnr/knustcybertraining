
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, QrCode, Clock, Settings, MessageSquare, Calendar } from "lucide-react";
import AttendancePanel from "@/components/admin/AttendancePanel";
import InspirationalMessageManager from "@/components/admin/InspirationalMessageManager";
import ProgramOutlineEditor from "@/components/admin/ProgramOutlineEditor";
import CybersecurityBackground from "@/components/CybersecurityBackground";

type AdminSection = "overview" | "attendance" | "messages" | "program";

interface AttendeeData {
  name: string;
  timestamp: string;
  id: number;
}

const Admin = () => {
  const [currentSection, setCurrentSection] = useState<AdminSection>("overview");
  const [attendees, setAttendees] = useState<AttendeeData[]>([]);
  const [qrScans, setQrScans] = useState(0);

  useEffect(() => {
    // Load attendees from localStorage
    const savedAttendees = JSON.parse(localStorage.getItem("attendees") || "[]");
    setAttendees(savedAttendees);
    
    // Simulate QR code scans (could be tracked separately)
    setQrScans(savedAttendees.length + Math.floor(Math.random() * 5));
  }, []);

  const renderContent = () => {
    switch (currentSection) {
      case "attendance":
        return <AttendancePanel attendees={attendees} />;
      case "messages":
        return <InspirationalMessageManager />;
      case "program":
        return <ProgramOutlineEditor />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Overview Cards */}
            <Card className="bg-white/95 backdrop-blur-sm border-blue-200/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{attendees.length}</div>
                <p className="text-xs text-muted-foreground">Registered participants</p>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-green-200/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">QR Code Scans</CardTitle>
                <QrCode className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{qrScans}</div>
                <p className="text-xs text-muted-foreground">Total scans today</p>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-yellow-200/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Live Attendance</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{attendees.length}</div>
                <p className="text-xs text-muted-foreground">Present now</p>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-red-200/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">3</div>
                <p className="text-xs text-muted-foreground">Ongoing workshops</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-green-50 relative overflow-hidden">
      <CybersecurityBackground />
      
      <div className="relative z-20 container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/edb649cb-0092-4609-a197-946f2fe735de.png" 
                alt="KNUST Logo" 
                className="h-16 w-auto"
              />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-red-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600">Cybersecurity Training Management</p>
              </div>
            </div>
            <Button
              onClick={() => window.location.href = "/"}
              variant="outline"
              className="bg-white/80 backdrop-blur-sm"
            >
              Back to App
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            onClick={() => setCurrentSection("overview")}
            variant={currentSection === "overview" ? "default" : "outline"}
            className="flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Overview</span>
          </Button>
          <Button
            onClick={() => setCurrentSection("attendance")}
            variant={currentSection === "attendance" ? "default" : "outline"}
            className="flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Attendance Records</span>
          </Button>
          <Button
            onClick={() => setCurrentSection("messages")}
            variant={currentSection === "messages" ? "default" : "outline"}
            className="flex items-center space-x-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Inspiration Messages</span>
          </Button>
          <Button
            onClick={() => setCurrentSection("program")}
            variant={currentSection === "program" ? "default" : "outline"}
            className="flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Program Outline</span>
          </Button>
        </div>

        {/* Main Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;
