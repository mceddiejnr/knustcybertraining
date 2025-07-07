
-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  theme TEXT,
  date DATE,
  start_time TIME,
  end_time TIME,
  location TEXT,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Admins can manage events
CREATE POLICY "Admins can manage events" 
  ON public.events 
  FOR ALL 
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Users can view active events
CREATE POLICY "Users can view active events" 
  ON public.events 
  FOR SELECT 
  USING (is_active = true);

-- Create trigger to ensure only one active event
CREATE OR REPLACE FUNCTION public.ensure_single_active_event()
RETURNS TRIGGER AS $$
BEGIN
  -- If setting this event to active, deactivate all others
  IF NEW.is_active = true THEN
    UPDATE public.events 
    SET is_active = false 
    WHERE id != NEW.id AND is_active = true;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_single_active_event_trigger
  BEFORE INSERT OR UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.ensure_single_active_event();

-- Add updated_at trigger
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default event (current cybersecurity training)
INSERT INTO public.events (
  name, 
  description, 
  theme, 
  date, 
  start_time, 
  end_time, 
  location, 
  is_active
) VALUES (
  'CYBERSECURITY TRAINING',
  'Organized by Library & UITS, KNUST',
  'Cybersecurity Essentials: Staying Safe in a Digital Workplace',
  '2025-06-03',
  '10:00:00',
  '12:00:00',
  'Library Mall Conference Room',
  true
);
