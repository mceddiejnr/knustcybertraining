
-- Create a new table to store resources
CREATE TABLE public.resources (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  type text,
  file_path text,
  preview_content text,
  is_downloadable boolean NOT NULL DEFAULT true,
  read_time text,
  popularity text,
  downloads integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Function to check if a user is an admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = user_id AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Policies for the resources table
-- Admins can manage all resources
CREATE POLICY "Admins can manage resources" ON public.resources
  FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Authenticated users can view all resources
CREATE POLICY "Authenticated users can view resources" ON public.resources
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create a storage bucket for resource files
INSERT INTO storage.buckets (id, name, public)
VALUES ('resources', 'resources', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for the storage bucket
-- Authenticated users can view/download files
CREATE POLICY "Authenticated users can view resource files"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'resources' AND auth.role() = 'authenticated' );

-- Admins can insert files
CREATE POLICY "Admins can insert resource files"
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'resources' AND public.is_admin(auth.uid()) );

-- Admins can update files
CREATE POLICY "Admins can update resource files"
  ON storage.objects FOR UPDATE
  USING ( bucket_id = 'resources' AND public.is_admin(auth.uid()) );

-- Admins can delete files
CREATE POLICY "Admins can delete resource files"
  ON storage.objects FOR DELETE
  USING ( bucket_id = 'resources' AND public.is_admin(auth.uid()) );

-- Add a trigger to update 'updated_at' timestamp on change
CREATE TRIGGER on_resources_update
  BEFORE UPDATE ON public.resources
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_updated_at_column();
