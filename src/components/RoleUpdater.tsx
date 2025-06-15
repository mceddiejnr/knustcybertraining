
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const RoleUpdater = () => {
  const [updating, setUpdating] = useState(false);
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const updateToAdmin = async () => {
    if (!user) return;
    
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating role:', error);
        toast({
          title: "Error",
          description: "Failed to update role",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Role updated to admin. Please refresh the page.",
        });
        // Refresh the page to reload the profile
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (profile?.role === 'admin') {
    return (
      <div className="text-green-400 text-sm">
        You already have admin privileges
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-white text-sm">
        Current role: {profile?.role || 'loading...'}
      </div>
      <Button 
        onClick={updateToAdmin}
        disabled={updating}
        className="bg-green-600 hover:bg-green-700"
      >
        {updating ? "Updating..." : "Grant Admin Access"}
      </Button>
    </div>
  );
};

export default RoleUpdater;
