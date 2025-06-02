
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, QrCode, Clock, Settings, MessageSquare, Calendar, LogOut, Shield, TrendingUp, Activity } from "lucide-react";
import AttendancePanel from "@/components/admin/AttendancePanel";
import InspirationalMessageManager from "@/components/admin/InspirationalMessageManager";
import ProgramOutlineEditor from "@/components/admin/ProgramOutlineEditor";
import AnimatedBackground from "@/components/AnimatedBackground";
import AdminProtection from "@/components/AdminProtection";

type AdminSection = "overview" | "attendance" | "messages" | "program" | "analytics";

interface AttendeeData {
  name: string;
  timestamp: string;
  id: number;
}

const AdminContent = () => {
  const [currentSection, setCurrentSection] = useState<AdminSection>("overview");
  const [attendees, setAttendees] = useState<AttendeeData[]>([]);
  const [qrScans, setQrScans] = useState(0);

  useEffect(() => {
    // Load attendees from localStorage
    const savedAttendees = JSON.parse(localStorage.getItem("attendees") || "[]");
    setAttendees(savedAttendees);
    
    // Simulate QR code scans (could be tracked separately)
    setQrScans(savedAttendees.length + Math.floor(Math.random() * 8) + 15);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    window.location.href = "/admin/login";
  };

  const renderContent = () => {
    switch (currentSection) {
      case "attendance":
        return <AttendancePanel attendees={attendees} />;
      case "messages":
        return <InspirationalMessageManager />;
      case "program":
        return <ProgramOutlineEditor />;
      case "analytics":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Registration Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-2">+{Math.floor(Math.random() * 20) + 10}%</div>
                <p className="text-sm text-muted-foreground">Increase from last session</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <span>Engagement Rate</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 mb-2">94.5%</div>
                <p className="text-sm text-muted-foreground">Active participation rate</p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Enhanced Overview Cards */}
            <Card className="bg-white/95 backdrop-blur-sm border-blue-200/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{attendees.length}</div>
                <p className="text-xs text-muted-foreground">Registered participants</p>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-green-200/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">QR Code Scans</CardTitle>
                <QrCode className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{qrScans}</div>
                <p className="text-xs text-muted-foreground">Total scans today</p>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-yellow-200/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Live Attendance</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{attendees.length}</div>
                <p className="text-xs text-muted-foreground">Present now</p>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-slate-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-600">5</div>
                <p className="text-xs text-muted-foreground">Ongoing workshops</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-20 container mx-auto p-6">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/edb649cb-0092-4609-a197-946f2fe735de.png" 
                alt="KNUST Logo" 
                className="h-16 w-auto"
              />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-600 via-blue-600 to-slate-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600">Cybersecurity Training Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => window.location.href = "/"}
                variant="outline"
                className="bg-white/80 backdrop-blur-sm"
              >
                Back to App
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="bg-white/80 backdrop-blur-sm text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation */}
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
          <Button
            onClick={() => setCurrentSection("analytics")}
            variant={currentSection === "analytics" ? "default" : "outline"}
            className="flex items-center space-x-2"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Analytics</span>
          </Button>
        </div>

        {/* Main Content */}
        {renderContent()}
      </div>
    </div>
  );
};

const Admin = () => {
  return (
    <AdminProtection>
      <AdminContent />
    </AdminProtection>
  );
};

export default Admin;
