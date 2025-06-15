
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, PlusCircle, Trash2, Edit, AlertCircle } from "lucide-react";
import ResourceFormDialog from "./ResourceFormDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Database } from "@/integrations/supabase/types";

export type Resource = Database['public']['Tables']['resources']['Row'];

const ResourceManager = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const { data: resources, isLoading, error } = useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      const { data, error } = await supabase.from('resources').select('*').order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const handleAdd = () => {
    setSelectedResource(null);
    setIsFormOpen(true);
  };

  const handleEdit = (resource: Resource) => {
    setSelectedResource(resource);
    setIsFormOpen(true);
  };
  
  const handleDelete = async (resource: Resource) => {
    if (resource.file_path) {
      const { error: storageError } = await supabase.storage.from('resources').remove([resource.file_path]);
      if (storageError) {
        toast.error(`Failed to delete file from storage: ${storageError.message}`);
      }
    }

    const { error: dbError } = await supabase.from('resources').delete().eq('id', resource.id);
    if (dbError) {
      toast.error(`Failed to delete resource: ${dbError.message}`);
    } else {
      toast.success('Resource deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    }
  };

  if (isLoading) return <div className="flex justify-center p-8"><div className="animate-spin w-8 h-8 border-4 border-green-300 border-t-green-600 rounded-full"></div></div>;
  if (error) return <div className="text-red-400">Error loading resources: {error.message}</div>;

  return (
    <>
      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-lg sm:text-xl flex items-center"><Download className="mr-2" /> Manage Resources</CardTitle>
          <Button onClick={handleAdd} size="sm" className="bg-green-600 hover:bg-green-700 text-white">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Resource
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-600 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-600 bg-gray-700/50">
                    <TableHead className="text-gray-300">Title</TableHead>
                    <TableHead className="text-gray-300">Type</TableHead>
                    <TableHead className="text-gray-300">Downloadable</TableHead>
                    <TableHead className="text-gray-300">Created</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources && resources.length > 0 ? resources.map((resource) => (
                    <TableRow key={resource.id} className="border-gray-600 bg-gray-800/50">
                      <TableCell className="text-white font-medium">{resource.title}</TableCell>
                      <TableCell><Badge variant="outline" className="text-cyan-300 border-cyan-300/50">{resource.type || 'N/A'}</Badge></TableCell>
                      <TableCell>
                        <Badge variant={resource.is_downloadable ? 'default' : 'secondary'} className={resource.is_downloadable ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}>
                          {resource.is_downloadable ? 'Yes' : 'No'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-400">{new Date(resource.created_at!).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="icon" variant="outline" onClick={() => handleEdit(resource)} className="border-blue-500/30 text-blue-400 hover:bg-blue-900/20 hover:border-blue-400">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="icon" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-900/20 hover:border-red-400">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-gray-900 border-red-500/50 text-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center"><AlertCircle className="mr-2 text-red-400" />Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-400">
                                  This will permanently delete the resource "{resource.title}". If a file is associated, it will be deleted from storage. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 border-none">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(resource)} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                        No resources found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
      <ResourceFormDialog
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        resource={selectedResource}
      />
    </>
  );
};

export default ResourceManager;
