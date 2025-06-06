
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, RefreshCw, Trash2, Search } from "lucide-react";

interface UserWithCode {
  id: number;
  name: string;
  accessCode: string;
  timestamp: string;
}

const AccessCodeManager = () => {
  const [users, setUsers] = useState<UserWithCode[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadUsers = () => {
    const attendees = JSON.parse(localStorage.getItem("attendees") || "[]");
    const userCodes = JSON.parse(localStorage.getItem("userAccessCodes") || "{}");
    
    const usersWithCodes = attendees.map((attendee: any) => ({
      ...attendee,
      accessCode: userCodes[attendee.id] || "N/A"
    }));
    
    setUsers(usersWithCodes);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const generateAccessCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const resetUserCode = (userId: number) => {
    const newCode = generateAccessCode();
    const userCodes = JSON.parse(localStorage.getItem("userAccessCodes") || "{}");
    userCodes[userId] = newCode;
    localStorage.setItem("userAccessCodes", JSON.stringify(userCodes));
    loadUsers();
  };

  const deleteUser = (userId: number) => {
    // Remove from attendees
    const attendees = JSON.parse(localStorage.getItem("attendees") || "[]");
    const updatedAttendees = attendees.filter((attendee: any) => attendee.id !== userId);
    localStorage.setItem("attendees", JSON.stringify(updatedAttendees));

    // Remove access code
    const userCodes = JSON.parse(localStorage.getItem("userAccessCodes") || "{}");
    delete userCodes[userId];
    localStorage.setItem("userAccessCodes", JSON.stringify(userCodes));

    loadUsers();
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.accessCode.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center">
            <KeyRound className="w-5 h-5 mr-2 text-green-400" />
            Access Code Management
          </h2>
          <p className="text-gray-400 text-sm">Manage user access codes and registrations</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search users or codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700/80 border-gray-600 text-white w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-white font-semibold">{user.name}</h3>
                    <span className="text-xs text-gray-400">
                      ID: {user.id}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <KeyRound className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-mono text-lg">
                        {user.accessCode}
                      </span>
                    </div>
                    <span className="text-gray-400">
                      Registered: {new Date(user.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={() => resetUserCode(user.id)}
                    size="sm"
                    variant="outline"
                    className="border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-400"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Reset Code
                  </Button>
                  <Button
                    onClick={() => deleteUser(user.id)}
                    size="sm"
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-400"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredUsers.length === 0 && (
          <Card className="bg-gray-800/95 backdrop-blur-sm border-gray-600">
            <CardContent className="p-8 text-center">
              <KeyRound className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400">
                {searchTerm ? "No users found matching your search." : "No registered users yet."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="bg-gray-700/50 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-400 text-sm">💡 Access Code Info</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Access codes are 6-digit numbers automatically generated for new users</li>
            <li>• Users need their access code to return to the workshop content</li>
            <li>• Reset a code if a user loses theirs or needs a new one</li>
            <li>• Deleting a user removes both their registration and access code</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessCodeManager;
