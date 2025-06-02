
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
