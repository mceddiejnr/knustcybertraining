
import { useState } from "react";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import WelcomeMessage from "@/components/WelcomeMessage";
import SuccessMessage from "@/components/SuccessMessage";
import CybersecurityBackground from "@/components/CybersecurityBackground";

export type AppState = "welcome" | "form" | "success";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("welcome");
  const [attendeeName, setAttendeeName] = useState("");

  const handleQRCodeScan = () => {
    setCurrentState("form");
  };

  const handleNameSubmit = (name: string) => {
    setAttendeeName(name);
    // Save to localStorage (simulating database storage)
    const existingAttendees = JSON.parse(localStorage.getItem("attendees") || "[]");
    const newAttendee = {
      name,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    existingAttendees.push(newAttendee);
    localStorage.setItem("attendees", JSON.stringify(existingAttendees));
    setCurrentState("success");
  };

  const handleViewProgram = () => {
    window.location.href = "/program";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Live Cybersecurity Background Animation */}
      <CybersecurityBackground />
      
      {/* Subtle professional background elements */}
      <div className="absolute inset-0 opacity-10 z-10">
        <div className="absolute top-10 left-10 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 sm:top-40 right-10 sm:right-20 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-18 sm:w-28 h-18 sm:h-28 bg-gradient-to-br from-red-600 to-red-700 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 sm:bottom-40 right-10 w-14 sm:w-20 h-14 sm:h-20 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      
      {/* Subtle tech pattern */}
      <div className="absolute inset-0 opacity-5 z-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23475569' fill-opacity='0.4'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Content with higher z-index */}
      <div className="relative z-20">
        {currentState === "welcome" && (
          <QRCodeDisplay onScan={handleQRCodeScan} />
        )}
        
        {currentState === "form" && (
          <WelcomeMessage onNameSubmit={handleNameSubmit} />
        )}
        
        {currentState === "success" && (
          <SuccessMessage 
            attendeeName={attendeeName} 
            onViewProgram={handleViewProgram} 
          />
        )}
      </div>
    </div>
  );
};

export default Index;
