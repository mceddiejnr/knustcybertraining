
import { useState } from "react";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import WelcomeMessage from "@/components/WelcomeMessage";
import SuccessMessage from "@/components/SuccessMessage";
import CyberBackground from "@/components/CyberBackground";

export type AppState = "welcome" | "form" | "success";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("welcome");
  const [attendeeName, setAttendeeName] = useState("");

  const handleQRCodeScan = () => {
    setCurrentState("form");
  };

  const handleNameSubmit = (name: string) => {
    // Check if user already exists
    const existingAttendees = JSON.parse(localStorage.getItem("attendees") || "[]");
    const existingUser = existingAttendees.find((attendee: any) => 
      attendee.name.toLowerCase().trim() === name.toLowerCase().trim()
    );

    if (existingUser) {
      // User already checked in, redirect to program page
      console.log("User already registered, redirecting to program page");
      window.location.href = "/program";
      return;
    }

    // New user, proceed with registration
    setAttendeeName(name);
    const newAttendee = {
      name: name.trim(),
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 relative overflow-hidden">
      <CyberBackground />
      
      <div className="relative z-20">
        {currentState === "welcome" && (
          <QRCodeGenerator onScan={handleQRCodeScan} />
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
