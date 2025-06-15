
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CyberBackground from "@/components/CyberBackground";
import AuthStatusBar from "@/components/AuthStatusBar";
import MainContent from "@/components/MainContent";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { useAuth } from "@/hooks/useAuth";
import { useAppLogic } from "@/hooks/useAppLogic";

const Index = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const {
    currentState,
    attendeeName,
    userAccessCode,
    handleQRCodeScan,
    handleNameSubmit,
    handleAccessCodeSubmit,
    handleBackToRegistration,
    handleContinueFromCodeDisplay,
    handleViewProgram,
  } = useAppLogic();

  // Redirect authenticated admin users to admin dashboard
  useEffect(() => {
    if (!loading && user && profile?.role === 'admin') {
      console.log("Authenticated admin user detected, redirecting to admin dashboard");
      navigate("/admin");
    }
  }, [user, profile, loading, navigate]);

  // Show loading while checking authentication to prevent QR code flash
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 relative overflow-hidden">
        <CyberBackground />
        <LoadingScreen 
          message="INITIALIZING SECURE CONNECTION..."
          variant="cyber"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 relative overflow-hidden">
      <CyberBackground />
      <AuthStatusBar />
      <MainContent
        currentState={currentState}
        attendeeName={attendeeName}
        userAccessCode={userAccessCode}
        onQRCodeScan={handleQRCodeScan}
        onNameSubmit={handleNameSubmit}
        onAccessCodeSubmit={handleAccessCodeSubmit}
        onBackToRegistration={handleBackToRegistration}
        onContinueFromCodeDisplay={handleContinueFromCodeDisplay}
        onViewProgram={handleViewProgram}
      />
    </div>
  );
};

export default Index;
