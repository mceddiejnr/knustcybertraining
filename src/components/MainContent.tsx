
import QRCodeGenerator from "@/components/QRCodeGenerator";
import WelcomeMessage from "@/components/WelcomeMessage";
import SuccessMessage from "@/components/SuccessMessage";
import AccessCodeForm from "@/components/AccessCodeForm";
import AccessCodeDisplay from "@/components/AccessCodeDisplay";

export type AppState = "welcome" | "form" | "accessCode" | "codeDisplay" | "success";

interface MainContentProps {
  currentState: AppState;
  attendeeName: string;
  userAccessCode: string;
  onQRCodeScan: () => void;
  onNameSubmit: (name: string) => void;
  onAccessCodeSubmit: (code: string) => void;
  onBackToRegistration: () => void;
  onContinueFromCodeDisplay: () => void;
  onViewProgram: () => void;
}

const MainContent = ({
  currentState,
  attendeeName,
  userAccessCode,
  onQRCodeScan,
  onNameSubmit,
  onAccessCodeSubmit,
  onBackToRegistration,
  onContinueFromCodeDisplay,
  onViewProgram,
}: MainContentProps) => {
  const renderContent = () => {
    switch (currentState) {
      case "welcome":
        return <QRCodeGenerator onScan={onQRCodeScan} />;
      case "form":
        return <WelcomeMessage onNameSubmit={onNameSubmit} />;
      case "accessCode":
        return (
          <AccessCodeForm 
            onCodeSubmit={onAccessCodeSubmit}
            onBackToRegistration={onBackToRegistration}
          />
        );
      case "codeDisplay":
        return (
          <AccessCodeDisplay
            attendeeName={attendeeName}
            accessCode={userAccessCode}
            onContinue={onContinueFromCodeDisplay}
          />
        );
      case "success":
        return (
          <SuccessMessage 
            attendeeName={attendeeName} 
            onViewProgram={onViewProgram} 
          />
        );
      default:
        return <QRCodeGenerator onScan={onQRCodeScan} />;
    }
  };

  return <div className="relative z-20">{renderContent()}</div>;
};

export default MainContent;
