
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Session {
  id: number;
  time: string;
  topic: string;
  speaker: string;
  description?: string;
}

const ProgramOutlineEditor = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newSession, setNewSession] = useState({
    time: "",
    topic: "",
    speaker: "",
    description: ""
  });
  const { toast } = useToast();

  const defaultSessions: Session[] = [
    {
      id: 1,
      time: "10:00 – 10:10",
      topic: "Opening Remarks and Welcome",
      speaker: "University Librarian",
      description: "Welcome and program introduction"
    },
    {
      id: 2,
      time: "10:10 – 10:20",
      topic: "Introduction to Cybersecurity",
      speaker: "Deputy Director, ISTAD",
      description: "Overview of cybersecurity fundamentals"
    },
    {
      id: 3,
      time: "10:20 – 10:30",
      topic: "ISTAD's Role in Cybersecurity",
      speaker: "Deputy Director, ISTAD",
      description: "Understanding ISTAD's cybersecurity initiatives"
    },
    {
      id: 4,
      time: "10:30 – 10:40",
      topic: "The need for Cybersecurity",
      speaker: "Deputy Director, ISTAD",
      description: "Why cybersecurity is crucial in today's digital world"
    },
    {
      id: 5,
      time: "10:40 – 10:50",
      topic: "What Motivates Cyber Criminals?",
      speaker: "Deputy Director, ISTAD",
      description: "Understanding the psychology behind cyber attacks"
    },
    {
      id: 6,
      time: "10:50 – 11:00",
      topic: "Types of Cyber Crime",
      speaker: "Deputy Director, ISTAD",
      description: "Overview of different cyber crime categories"
    },
    {
      id: 7,
      time: "11:00 – 11:20",
      topic: "Phishing & Social Engineering",
      speaker: "Deputy Director, ISTAD",
      description: "Identifying and avoiding social engineering attacks"
    },
    {
      id: 8,
      time: "11:20 – 11:25",
      topic: "Video Demonstration",
      speaker: "All Facilitators",
      description: "Visual demonstration of cybersecurity concepts"
    },
    {
      id: 9,
      time: "11:25 – 11:30",
      topic: "Password Strength Demonstration",
      speaker: "All Facilitators",
      description: "Hands-on password security best practices"
    },
    {
      id: 10,
      time: "11:35 – 11:40",
      topic: "Attack Map Demonstration",
      speaker: "All Facilitators",
      description: "Live demonstration of global cyber attacks"
    },
    {
      id: 11,
      time: "11:40 – 11:50",
      topic: "Conclusion",
      speaker: "Deputy Director, ISTAD",
      description: "Summary and key takeaways"
    },
    {
      id: 12,
      time: "11:50 – 12:00",
      topic: "Q&A, Interactive Session",
      speaker: "All Facilitators",
      description: "Questions, answers, and interactive discussion"
    }
  ];

  useEffect(() => {
    // Load sessions from localStorage or use defaults
    const savedSessions = localStorage.getItem("programSessions");
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    } else {
      setSessions(defaultSessions);
      localStorage.setItem("programSessions", JSON.stringify(defaultSessions));
    }
  }, []);

  const saveSessions = (updatedSessions: Session[]) => {
    setSessions(updatedSessions);
    localStorage.setItem("programSessions", JSON.stringify(updatedSessions));
    toast({
      title: "Program updated! 📅",
      description: "Changes have been saved and will be visible to attendees.",
    });
  };

  const addSession = () => {
    if (!newSession.time || !newSession.topic || !newSession.speaker) {
      toast({
        title: "Missing information",
        description: "Please fill in time, topic, and speaker fields.",
        variant: "destructive"
      });
      return;
    }

    const session: Session = {
      id: Date.now(),
      ...newSession
    };

    const updatedSessions = [...sessions, session];
    saveSessions(updatedSessions);
    
    setNewSession({ time: "", topic: "", speaker: "", description: "" });
    setIsAdding(false);
  };

  const updateSession = (id: number, updatedData: Partial<Session>) => {
    const updatedSessions = sessions.map(session =>
      session.id === id ? { ...session, ...updatedData } : session
    );
    saveSessions(updatedSessions);
    setEditingId(null);
  };

  const deleteSession = (id: number) => {
    const updatedSessions = sessions.filter(session => session.id !== id);
    saveSessions(updatedSessions);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-red-200/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-red-600" />
          <span>Program Outline Editor</span>
        </CardTitle>
        <CardDescription>
          Manage the cybersecurity training session schedule and speakers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Session Button */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Training Sessions</h3>
          <Button
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
          >
            <Plus className="w-4 h-4" />
            <span>Add Session</span>
          </Button>
        </div>

        {/* Add New Session Form */}
        {isAdding && (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    value={newSession.time}
                    onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                    placeholder="e.g., 9:00 AM"
                  />
                </div>
                <div>
                  <Label htmlFor="speaker">Speaker</Label>
                  <Input
                    id="speaker"
                    value={newSession.speaker}
                    onChange={(e) => setNewSession({ ...newSession, speaker: e.target.value })}
                    placeholder="Speaker name"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    value={newSession.topic}
                    onChange={(e) => setNewSession({ ...newSession, topic: e.target.value })}
                    placeholder="Session topic"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={newSession.description}
                    onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
                    placeholder="Brief description of the session"
                    className="resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  onClick={() => {
                    setIsAdding(false);
                    setNewSession({ time: "", topic: "", speaker: "", description: "" });
                  }}
                  variant="outline"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={addSession}>
                  <Save className="w-4 h-4 mr-2" />
                  Add Session
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sessions Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Speaker</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No sessions scheduled yet. Add your first session above!
                  </TableCell>
                </TableRow>
              ) : (
                sessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.time}</TableCell>
                    <TableCell>{session.topic}</TableCell>
                    <TableCell>{session.speaker}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {session.description || "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          onClick={() => setEditingId(session.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => deleteSession(session.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Program Preview */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800">Preview for Attendees</h4>
          <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-4 border border-blue-200/50">
            <p className="text-sm text-gray-600 mb-3">This is how the schedule appears in the program page:</p>
            <div className="bg-white rounded-md p-4 space-y-3">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-start space-x-3 text-sm">
                  <span className="font-semibold text-blue-600 min-w-[80px]">{session.time}</span>
                  <div>
                    <p className="font-medium text-gray-800">{session.topic}</p>
                    <p className="text-gray-600">Speaker: {session.speaker}</p>
                    {session.description && (
                      <p className="text-gray-500 text-xs mt-1">{session.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramOutlineEditor;
