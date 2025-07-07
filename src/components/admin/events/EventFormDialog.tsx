
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEvents, Event } from "@/hooks/useEvents";

interface EventFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: Event;
}

const EventFormDialog = ({ open, onOpenChange, event }: EventFormDialogProps) => {
  const { createEvent, updateEvent } = useEvents();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    theme: "",
    date: "",
    start_time: "",
    end_time: "",
    location: "",
  });

  // Reset form when dialog opens/closes or event changes
  useEffect(() => {
    if (open) {
      setFormData({
        name: event?.name || "",
        description: event?.description || "",
        theme: event?.theme || "",
        date: event?.date || "",
        start_time: event?.start_time || "",
        end_time: event?.end_time || "",
        location: event?.location || "",
      });
    }
  }, [open, event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      return;
    }

    console.log('Submitting event data:', formData);

    const success = event 
      ? await updateEvent(event.id, formData)
      : await createEvent(formData);

    if (success) {
      onOpenChange(false);
      // Reset form after successful submission
      setFormData({
        name: "",
        description: "",
        theme: "",
        date: "",
        start_time: "",
        end_time: "",
        location: "",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-green-500/30 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">
            {event ? 'Edit Event' : 'Create New Event'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Event Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter event name"
              className="bg-gray-800/50 border-gray-600 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter event description"
              className="bg-gray-800/50 border-gray-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme" className="text-white">Theme</Label>
            <Textarea
              id="theme"
              value={formData.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
              placeholder="Enter event theme"
              className="bg-gray-800/50 border-gray-600 text-white"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-white">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="start_time" className="text-white">Start Time</Label>
              <Input
                id="start_time"
                type="time"
                value={formData.start_time}
                onChange={(e) => handleChange('start_time', e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_time" className="text-white">End Time</Label>
              <Input
                id="end_time"
                type="time"
                value={formData.end_time}
                onChange={(e) => handleChange('end_time', e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-white">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Enter event location"
              className="bg-gray-800/50 border-gray-600 text-white"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={!formData.name.trim()}
            >
              {event ? 'Update Event' : 'Create Event'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-500 text-gray-400"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventFormDialog;
