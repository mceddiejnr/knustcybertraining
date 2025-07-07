
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Event {
  id: string;
  name: string;
  description: string | null;
  theme: string | null;
  date: string | null;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading events:', error);
        toast.error('Failed to load events');
        return;
      }

      if (data) {
        setEvents(data);
        const active = data.find(event => event.is_active);
        setActiveEvent(active || null);
      }
    } catch (error) {
      console.error('Error loading events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at' | 'is_active'>) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([{ ...eventData, is_active: false }])
        .select()
        .single();

      if (error) {
        console.error('Error creating event:', error);
        toast.error('Failed to create event');
        return false;
      }

      toast.success('Event created successfully');
      await loadEvents();
      return true;
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to create event');
      return false;
    }
  };

  const updateEvent = async (eventId: string, updates: Partial<Event>) => {
    try {
      const { error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', eventId);

      if (error) {
        console.error('Error updating event:', error);
        toast.error('Failed to update event');
        return false;
      }

      toast.success('Event updated successfully');
      await loadEvents();
      return true;
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Failed to update event');
      return false;
    }
  };

  const activateEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ is_active: true })
        .eq('id', eventId);

      if (error) {
        console.error('Error activating event:', error);
        toast.error('Failed to activate event');
        return false;
      }

      toast.success('Event activated successfully');
      await loadEvents();
      return true;
    } catch (error) {
      console.error('Error activating event:', error);
      toast.error('Failed to activate event');
      return false;
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) {
        console.error('Error deleting event:', error);
        toast.error('Failed to delete event');
        return false;
      }

      toast.success('Event deleted successfully');
      await loadEvents();
      return true;
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
      return false;
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return {
    events,
    activeEvent,
    loading,
    createEvent,
    updateEvent,
    activateEvent,
    deleteEvent,
    loadEvents
  };
};
