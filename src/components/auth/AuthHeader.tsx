
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SecurityIcon from "@/components/SecurityIcon";

interface AuthHeaderProps {
  isSignUp: boolean;
}

const AuthHeader = ({ isSignUp }: AuthHeaderProps) => {
  return (
    <CardHeader className="text-center space-y-4 pt-6 pb-4 relative z-10">
      <SecurityIcon />

      <div className="space-y-1">
        <CardTitle className="text-xl font-bold text-white tracking-wide">
          {isSignUp ? "JOIN TRAINING" : "SECURE ACCESS"}
        </CardTitle>
        <div className="text-green-400 font-mono text-xs tracking-wider">
          CYBERSECURITY TRAINING PORTAL
        </div>
        <CardDescription className="text-gray-300 font-medium text-xs leading-relaxed">
          {isSignUp ? "Create your training account" : "Enter your credentials"}
          <br />
          <span className="text-green-400 text-xs">
            {isSignUp ? "Join the cybersecurity community" : "Access your training dashboard"}
          </span>
        </CardDescription>
      </div>
    </CardHeader>
  );
};

export default AuthHeader;
