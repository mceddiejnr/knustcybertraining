
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import WelcomeMessage from "@/components/WelcomeMessage";
import SuccessMessage from "@/components/SuccessMessage";
import AccessCodeForm from "@/components/AccessCodeForm";
import AccessCodeDisplay from "@/components/AccessCodeDisplay";
import CyberBackground from "@/components/CyberBackground";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Settings, Shield } from "lucide-react";

export type AppState = "welcome" | "form" | "accessCode" | "codeDisplay" | "success";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("welcome");
  const [attendeeName, setAttendeeName] = useState("");
  const [userAccessCode, setUserAccessCode] = useState("");
  const { user, profile, signOut, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  // Remove the automatic redirect for admin users - let them stay on index if they want to
  // Users will be redirected from the login form instead

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

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 relative overflow-hidden">
      <CyberBackground />
      
      {/* Auth Status Bar */}
      {user && (
        <div className="absolute top-4 right-4 z-30 flex items-center space-x-2">
          <span className="text-white text-sm font-mono">
            Welcome, {profile?.full_name || user.email}
          </span>
          <Button
            onClick={() => navigate("/admin")}
            variant="outline"
            size="sm"
            className="bg-gray-800/80 border-green-500/30 text-green-400 hover:bg-gray-700 hover:border-green-400"
          >
            <Settings className="w-4 h-4 mr-1" />
            Admin
          </Button>
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="bg-gray-800/80 border-red-500/30 text-red-400 hover:bg-red-900/20 hover:border-red-400"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Sign Out
          </Button>
        </div>
      )}

      {!user && (
        <div className="absolute top-4 right-4 z-30">
          <Button
            onClick={() => navigate("/auth")}
            variant="outline"
            size="sm"
            className="bg-gray-800/90 backdrop-blur-sm border-green-500/30 hover:bg-gray-700 text-green-400 text-xs sm:text-sm hover:border-green-400"
          >
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Admin
          </Button>
        </div>
      )}
      
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
