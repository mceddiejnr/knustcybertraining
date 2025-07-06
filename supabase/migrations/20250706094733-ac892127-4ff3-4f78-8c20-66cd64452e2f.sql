
-- Create a table for user questions
CREATE TABLE public.questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  email TEXT,
  question TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  answered_at TIMESTAMP WITH TIME ZONE,
  answer TEXT
);

-- Add Row Level Security (RLS) to manage access
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Policy for users to insert their own questions
CREATE POLICY "Users can submit questions" 
  ON public.questions 
  FOR INSERT 
  WITH CHECK (true);

-- Policy for admins to view all questions
CREATE POLICY "Admins can view all questions" 
  ON public.questions 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Policy for admins to update questions (for answering)
CREATE POLICY "Admins can update questions" 
  ON public.questions 
  FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));
