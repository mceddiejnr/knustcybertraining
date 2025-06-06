
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, QrCode, Clock, Calendar } from "lucide-react";

interface AttendeeData {
  name: string;
  timestamp: string;
  id: number;
}

interface AdminOverviewProps {
  attendees: AttendeeData[];
  qrScans: number;
}

const AdminOverview = ({ attendees, qrScans }: AdminOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Total Attendees</CardTitle>
          <Users className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400">{attendees.length}</div>
          <p className="text-xs text-gray-400">Registered participants</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">QR Code Scans</CardTitle>
          <QrCode className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400">{qrScans}</div>
          <p className="text-xs text-gray-400">Total scans today</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Live Attendance</CardTitle>
          <Clock className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400">{attendees.length}</div>
          <p className="text-xs text-gray-400">Present now</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Active Sessions</CardTitle>
          <Calendar className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400">5</div>
          <p className="text-xs text-gray-400">Ongoing workshops</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
