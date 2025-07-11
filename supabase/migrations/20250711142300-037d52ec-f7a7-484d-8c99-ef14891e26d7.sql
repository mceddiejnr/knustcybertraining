
-- Create a table to track user progress through training sessions
CREATE TABLE public.training_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  session_index INTEGER NOT NULL,
  session_title TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, event_id, session_index)
);

-- Enable Row Level Security
ALTER TABLE public.training_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own progress
CREATE POLICY "Users can view their own progress" 
  ON public.training_progress 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own progress
CREATE POLICY "Users can insert their own progress" 
  ON public.training_progress 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own progress
CREATE POLICY "Users can update their own progress" 
  ON public.training_progress 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own progress
CREATE POLICY "Users can delete their own progress" 
  ON public.training_progress 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Policy: Admins can view all progress
CREATE POLICY "Admins can view all progress" 
  ON public.training_progress 
  FOR SELECT 
  USING (is_admin(auth.uid()));

-- Add trigger to update the updated_at column
CREATE TRIGGER update_training_progress_updated_at
  BEFORE UPDATE ON public.training_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
