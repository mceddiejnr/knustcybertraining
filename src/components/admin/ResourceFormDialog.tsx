
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Resource } from "./ResourceManager";
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z.string().optional(),
  type: z.string().optional(),
  is_downloadable: z.boolean().default(true),
  file: z.instanceof(File).optional(),
});

interface ResourceFormDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  resource: Resource | null;
}

const ResourceFormDialog = ({ isOpen, setIsOpen, resource }: ResourceFormDialogProps) => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      is_downloadable: true,
    },
  });

  useEffect(() => {
    if (resource) {
      form.reset({
        title: resource.title,
        description: resource.description || "",
        type: resource.type || "",
        is_downloadable: resource.is_downloadable,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        type: "",
        is_downloadable: true,
      });
    }
  }, [resource, form, isOpen]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      let filePath: string | null = resource?.file_path || null;
      
      if (values.file) {
        if (resource && resource.file_path) {
          await supabase.storage.from('resources').remove([resource.file_path]);
        }
        const fileExt = values.file.name.split('.').pop();
        filePath = `${uuidv4()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('resources')
          .upload(filePath, values.file);

        if (uploadError) throw new Error(`File upload failed: ${uploadError.message}`);
      }

      const resourceData = {
        title: values.title,
        description: values.description,
        type: values.type,
        is_downloadable: values.is_downloadable,
        file_path: filePath,
      };
      
      let error;
      if (resource) {
        const { error: updateError } = await supabase
          .from('resources')
          .update(resourceData)
          .eq('id', resource.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('resources')
          .insert([resourceData]);
        error = insertError;
      }

      if (error) throw new Error(error.message);

      toast.success(`Resource ${resource ? 'updated' : 'created'} successfully!`);
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gray-900 border-green-500/50 text-white sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{resource ? "Edit Resource" : "Add New Resource"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {resource ? "Update the details of the resource." : "Fill in the details for the new resource."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Cybersecurity Checklist" {...field} className="bg-gray-800 border-gray-600 focus:border-green-500"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A brief description of the resource." {...field} className="bg-gray-800 border-gray-600 focus:border-green-500"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., PDF, Video, Link" {...field} className="bg-gray-800 border-gray-600 focus:border-green-500"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File (optional)</FormLabel>
                  <FormControl>
                    <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} className="bg-gray-800 border-gray-600 file:text-green-400"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="is_downloadable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-600 p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Downloadable</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                {isSubmitting ? "Saving..." : (resource ? "Save Changes" : "Create Resource")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceFormDialog;
