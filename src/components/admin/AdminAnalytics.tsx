
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Activity, Shield } from "lucide-react";

const AdminAnalytics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span>Registration Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400 mb-2">+{Math.floor(Math.random() * 20) + 10}%</div>
          <p className="text-sm text-gray-400">Increase from last session</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Activity className="w-5 h-5 text-green-400" />
            <span>Engagement Rate</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400 mb-2">94.5%</div>
          <p className="text-sm text-gray-400">Active participation rate</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Shield className="w-5 h-5 text-green-400" />
            <span>Security Score</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400 mb-2">A+</div>
          <p className="text-sm text-gray-400">System security rating</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
