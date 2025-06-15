
-- Make the 'name' column nullable since it's not collected in the feedback form
ALTER TABLE public.feedback ALTER COLUMN name DROP NOT NULL;

-- Add new columns to store the detailed feedback from your form
ALTER TABLE public.feedback ADD COLUMN IF NOT EXISTS overall_satisfaction TEXT;
ALTER TABLE public.feedback ADD COLUMN IF NOT EXISTS most_valuable TEXT;
ALTER TABLE public.feedback ADD COLUMN IF NOT EXISTS improvements TEXT;
ALTER TABLE public.feedback ADD COLUMN IF NOT EXISTS additional_comments TEXT;
ALTER TABLE public.feedback ADD COLUMN IF NOT EXISTS would_recommend TEXT;

-- We are keeping the 'message' column for now to avoid data loss, but new feedback will use the specific fields above.

-- Ensure Row Level Security is enabled on the table
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Remove the old, permissive policies
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.feedback;
DROP POLICY IF EXISTS "Admins can view all feedback" ON public.feedback;

-- Create a new policy to allow any authenticated user to submit feedback
CREATE POLICY "Authenticated users can insert their own feedback"
  ON public.feedback
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create a new policy so that administrators can view all feedback submissions
CREATE POLICY "Admins can view all feedback"
  ON public.feedback
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Enable realtime updates on the feedback table for the admin dashboard
ALTER TABLE public.feedback REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.feedback;
