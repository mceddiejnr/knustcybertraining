
import { useState } from "react";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import WelcomeMessage from "@/components/WelcomeMessage";
import SuccessMessage from "@/components/SuccessMessage";
import AccessCodeForm from "@/components/AccessCodeForm";
import AccessCodeDisplay from "@/components/AccessCodeDisplay";
import CyberBackground from "@/components/CyberBackground";

export type AppState = "welcome" | "form" | "accessCode" | "codeDisplay" | "success";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("welcome");
  const [attendeeName, setAttendeeName] = useState("");
  const [userAccessCode, setUserAccessCode] = useState("");

  const handleQRCodeScan = () => {
    setCurrentState("form");
  };

  const generateAccessCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleNameSubmit = (name: string) => {
    // Check if user already exists
    const existingAttendees = JSON.parse(localStorage.getItem("attendees") || "[]");
    const existingUser = existingAttendees.find((attendee: any) => 
      attendee.name.toLowerCase().trim() === name.toLowerCase().trim()
    );

    if (existingUser) {
      // User already registered, ask for access code
      console.log("User already registered, requesting access code");
      setAttendeeName(name);
      setCurrentState("accessCode");
      return;
    }

    // New user, proceed with registration
    setAttendeeName(name);
    const accessCode = generateAccessCode();
    const newAttendee = {
      name: name.trim(),
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    
    // Save attendee
    existingAttendees.push(newAttendee);
    localStorage.setItem("attendees", JSON.stringify(existingAttendees));
    
    // Save access code
    const userCodes = JSON.parse(localStorage.getItem("userAccessCodes") || "{}");
    userCodes[newAttendee.id] = accessCode;
    localStorage.setItem("userAccessCodes", JSON.stringify(userCodes));
    
    setUserAccessCode(accessCode);
    setCurrentState("codeDisplay");
  };

  const handleAccessCodeSubmit = (code: string) => {
    // Verify access code
    const userCodes = JSON.parse(localStorage.getItem("userAccessCodes") || "{}");
    const validCode = Object.values(userCodes).includes(code);
    
    if (validCode) {
      console.log("Valid access code, redirecting to program page");
      window.location.href = "/program";
    } else {
      console.log("Invalid access code");
      // You could show an error here
      alert("Invalid access code. Please try again or contact an administrator.");
    }
  };

  const handleBackToRegistration = () => {
    setCurrentState("form");
    setAttendeeName("");
  };

  const handleContinueFromCodeDisplay = () => {
    window.location.href = "/program";
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

        {currentState === "accessCode" && (
          <AccessCodeForm 
            onCodeSubmit={handleAccessCodeSubmit}
            onBackToRegistration={handleBackToRegistration}
          />
        )}

        {currentState === "codeDisplay" && (
          <AccessCodeDisplay
            attendeeName={attendeeName}
            accessCode={userAccessCode}
            onContinue={handleContinueFromCodeDisplay}
          />
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
