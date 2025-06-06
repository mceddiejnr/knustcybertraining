
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, QrCode, Clock, Settings, MessageSquare, Calendar, LogOut, Shield, TrendingUp, Activity, KeyRound, UserCog } from "lucide-react";
import AttendancePanel from "@/components/admin/AttendancePanel";
import InspirationalMessageManager from "@/components/admin/InspirationalMessageManager";
import ProgramOutlineEditor from "@/components/admin/ProgramOutlineEditor";
import AccessCodeManager from "@/components/admin/AccessCodeManager";
import UserRoleManager from "@/components/admin/UserRoleManager";
import CyberBackground from "@/components/CyberBackground";
import AdminProtection from "@/components/AdminProtection";

type AdminSection = "overview" | "attendance" | "messages" | "program" | "analytics" | "access-codes" | "user-roles";

interface AttendeeData {
  name: string;
  timestamp: string;
  id: number;
}

const AdminContent = () => {
  const [currentSection, setCurrentSection] = useState<AdminSection>("overview");
  const [attendees, setAttendees] = useState<AttendeeData[]>([]);
  const [qrScans, setQrScans] = useState(0);

  const loadAttendees = () => {
    const savedAttendees = JSON.parse(localStorage.getItem("attendees") || "[]");
    setAttendees(savedAttendees);
    return savedAttendees;
  };

  useEffect(() => {
    const initialAttendees = loadAttendees();
    setQrScans(initialAttendees.length + Math.floor(Math.random() * 8) + 15);

    // Listen for storage changes to update attendees list
    const handleStorageChange = () => {
      loadAttendees();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for updates periodically
    const interval = setInterval(() => {
      loadAttendees();
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
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
      case "access-codes":
        return <AccessCodeManager />;
      case "user-roles":
        return <UserRoleManager />;
      case "analytics":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span>Registration Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400 mb-2">+{Math.floor(Math.random() * 20) + 10}%</div>
                <p className="text-sm text-gray-400">Increase from last session</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span>Engagement Rate</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400 mb-2">94.5%</div>
                <p className="text-sm text-gray-400">Active participation rate</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>Security Score</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400 mb-2">A+</div>
                <p className="text-sm text-gray-400">System security rating</p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Attendees</CardTitle>
                <Users className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">{attendees.length}</div>
                <p className="text-xs text-gray-400">Registered participants</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">QR Code Scans</CardTitle>
                <QrCode className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">{qrScans}</div>
                <p className="text-xs text-gray-400">Total scans today</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Live Attendance</CardTitle>
                <Clock className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">{attendees.length}</div>
                <p className="text-xs text-gray-400">Present now</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Active Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">5</div>
                <p className="text-xs text-gray-400">Ongoing workshops</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  const navigationItems = [
    { id: "overview", label: "Overview", icon: Settings },
    { id: "attendance", label: "Attendance", icon: Users },
    { id: "access-codes", label: "Access Codes", icon: KeyRound },
    { id: "user-roles", label: "User Roles", icon: UserCog },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "program", label: "Program", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 relative overflow-hidden">
      <CyberBackground />
      
      <div className="relative z-20 container mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 lg:space-x-4">
              <img alt="KNUST Logo" className="h-12 lg:h-16 w-auto" src="/lovable-uploads/203ba06e-92a1-4220-b166-c31ec24d5efa.png" />
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-wide">
                  ADMIN DASHBOARD
                </h1>
                <p className="text-green-400 font-mono text-sm lg:text-base">Cybersecurity Training Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => window.location.href = "/"} variant="outline" className="bg-gray-800/80 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-gray-700 hover:border-green-400 text-sm">
                Back to App
              </Button>
              <Button onClick={handleLogout} variant="outline" className="bg-gray-800/80 backdrop-blur-sm text-red-400 border-red-500/30 hover:bg-red-900/20 hover:border-red-400 text-sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 lg:mb-8">
          {navigationItems.map(({ id, label, icon: Icon }) => (
            <Button 
              key={id}
              onClick={() => setCurrentSection(id as AdminSection)} 
              variant={currentSection === id ? "default" : "outline"} 
              className={currentSection === id 
                ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg" 
                : "bg-gray-800/80 border-green-500/30 text-green-400 hover:bg-gray-700 hover:border-green-400"
              }
              size="sm"
            >
              <Icon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{label.split(' ')[0]}</span>
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {renderContent()}
        </div>
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
