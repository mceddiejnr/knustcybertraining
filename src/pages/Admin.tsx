
import { useState, useEffect } from "react";
import AttendancePanel from "@/components/admin/AttendancePanel";
import InspirationalMessageManager from "@/components/admin/InspirationalMessageManager";
import ProgramOutlineEditor from "@/components/admin/ProgramOutlineEditor";
import AccessCodeManager from "@/components/admin/AccessCodeManager";
import UserRoleManager from "@/components/admin/UserRoleManager";
import UserApprovalManager from "@/components/admin/UserApprovalManager";
import AdminFeedback from "@/components/admin/AdminFeedback";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminNavigation from "@/components/admin/AdminNavigation";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import QuestionsManager from "@/components/admin/QuestionsManager";
import EventManager from "@/components/admin/EventManager";
import CyberBackground from "@/components/CyberBackground";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import ResourceManager from "@/components/admin/ResourceManager";

type AdminSection = "overview" | "attendance" | "messages" | "program" | "analytics" | "access-codes" | "user-roles" | "feedback" | "user-approvals" | "resources" | "questions" | "events";

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
      case "user-approvals":
        return <UserApprovalManager />;
      case "feedback":
        return <AdminFeedback />;
      case "analytics":
        return <AdminAnalytics />;
      case "resources":
        return <ResourceManager />;
      case "questions":
        return <QuestionsManager />;
      case "events":
        return <EventManager />;
      default:
        return <AdminOverview attendees={attendees} qrScans={qrScans} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 relative overflow-hidden">
      <CyberBackground />
      
      <div className="relative z-20 container mx-auto p-4 lg:p-6">
        <AdminHeader />
        <AdminNavigation currentSection={currentSection} onSectionChange={setCurrentSection} />
        
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  return (
    <AuthGuard requireAdmin={true}>
      <AdminContent />
    </AuthGuard>
  );
};

export default Admin;
