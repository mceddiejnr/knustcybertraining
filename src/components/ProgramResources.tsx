
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type Resource = Database['public']['Tables']['resources']['Row'];

const ProgramResources = () => {
  const { data: resources, isLoading, error } = useQuery<Resource[]>({
    queryKey: ['resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  const handleDownload = async (resource: Resource) => {
    if (!resource.file_path) {
        toast.error("No file associated with this resource.");
        return;
    }
    
    try {
        const { data, error } = await supabase.storage.from('resources').download(resource.file_path);
        
        if (error) throw error;

        const blob = data;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = resource.title || 'resource';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        // Increment download count (optional, can be done via rpc)
        const { error: updateError } = await supabase
          .from('resources')
          .update({ downloads: (resource.downloads || 0) + 1 })
          .eq('id', resource.id);

        if (updateError) {
          console.error("Failed to update download count", updateError.message);
        }

    } catch(error: any) {
        toast.error(`Failed to download file: ${error.message}`);
    }
  };

  if (isLoading) return <div className="flex justify-center p-8"><div className="animate-spin w-8 h-8 border-4 border-green-300 border-t-green-600 rounded-full"></div></div>;
  if (error) return <div className="text-center py-8 text-red-400">Error loading resources: {(error as Error).message}</div>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {resources && resources.length > 0 ? resources.map((resource) => (
        <Card key={resource.id} className="bg-gray-800/80 backdrop-blur-sm border-green-500/30 text-white flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg font-bold">{resource.title}</CardTitle>
              <div className="flex-shrink-0 ml-4">
                  <FileText className="w-8 h-8 text-green-400" />
              </div>
            </div>
            {resource.type && <p className="text-sm text-cyan-300">{resource.type}</p>}
          </CardHeader>
          <CardContent className="flex-grow">
            <CardDescription className="text-gray-300">{resource.description}</CardDescription>
          </CardContent>
          <CardFooter>
            {resource.is_downloadable && resource.file_path ? (
              <Button onClick={() => handleDownload(resource)} className="w-full bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            ) : (
               <Button disabled className="w-full">
                View Only
              </Button>
            )}
          </CardFooter>
        </Card>
      )) : (
        <div className="col-span-full text-center py-12 text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No resources available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default ProgramResources;
