-- Create discussions table for forum posts
CREATE TABLE public.discussions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_pinned BOOLEAN DEFAULT false,
  category TEXT DEFAULT 'general',
  views INTEGER DEFAULT 0
);

-- Create discussion_replies table for replies to discussions
CREATE TABLE public.discussion_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  discussion_id UUID NOT NULL REFERENCES public.discussions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;

-- Policies for discussions - allow public viewing and posting
CREATE POLICY "Anyone can view discussions" 
ON public.discussions 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create discussions" 
ON public.discussions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage discussions" 
ON public.discussions 
FOR ALL 
USING (is_admin(auth.uid()));

-- Policies for discussion replies - allow public viewing and posting
CREATE POLICY "Anyone can view discussion replies" 
ON public.discussion_replies 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create discussion replies" 
ON public.discussion_replies 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage discussion replies" 
ON public.discussion_replies 
FOR ALL 
USING (is_admin(auth.uid()));

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_discussions_updated_at
BEFORE UPDATE ON public.discussions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_discussion_replies_updated_at
BEFORE UPDATE ON public.discussion_replies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to increment view count
CREATE OR REPLACE FUNCTION public.increment_discussion_views(discussion_id UUID)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE public.discussions 
  SET views = views + 1 
  WHERE id = discussion_id;
$$;