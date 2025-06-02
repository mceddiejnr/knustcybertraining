
import { useState } from "react";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import WelcomeMessage from "@/components/WelcomeMessage";
import SuccessMessage from "@/components/SuccessMessage";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Background Tech Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-cyan-400 rotate-45"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-green-400 rotate-12"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 border border-blue-400 -rotate-12"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 border border-cyan-400 rotate-45"></div>
      </div>
      
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ffff' fill-opacity='0.4'%3E%3Ccircle cx='9' cy='9' r='1'/%3E%3Ccircle cx='49' cy='49' r='1'/%3E%3Ccircle cx='9' cy='49' r='1'/%3E%3Ccircle cx='49' cy='9' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
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
  );
};

export default Index;
