
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserCheck, UserX, Clock, Mail, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PendingUser {
  id: string;
  name: string;
  email: string;
  created_at: string;
  approved: boolean;
}

const UserApprovalManager = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPendingUsers = async () => {
    try {
      setLoading(true);
      
      // Get users from user_roles table who don't have last_active set (meaning not approved yet)
      const { data: userRoles, error: userRolesError } = await supabase
        .from('user_roles')
        .select('*')
        .is('last_active', null)
        .order('created_at', { ascending: false });
      
      if (userRolesError) {
        console.error('Error loading pending users:', userRolesError);
        toast.error('Failed to load pending users');
        return;
      }

      const pendingUsersData = userRoles?.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        approved: false
      })) || [];

      setPendingUsers(pendingUsersData);
    } catch (error) {
      console.error('Error loading pending users:', error);
      toast.error('Failed to load pending users');
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (userId: string, email: string) => {
    try {
      // Find the auth user by email
      const { data: authUsers, error: authUsersError } = await supabase.auth.admin.listUsers();
      
      if (authUsersError) {
        console.error('Error fetching auth users:', authUsersError);
        toast.error('Failed to approve user');
        return;
      }

      const authUser = authUsers.users.find((user: any) => user.email === email);
      
      if (authUser) {
        // Confirm the user's email in auth
        const { error: confirmError } = await supabase.auth.admin.updateUserById(
          authUser.id,
          { email_confirm: true }
        );

        if (confirmError) {
          console.error('Error approving user:', confirmError);
          toast.error('Failed to approve user');
          return;
        }
      }

      // Update the user_roles table to mark as approved
      const { error: roleError } = await supabase
        .from('user_roles')
        .update({ last_active: new Date().toISOString() })
        .eq('email', email);

      if (roleError) {
        console.error('Error updating user role:', roleError);
        toast.error('Failed to update user status');
        return;
      }

      toast.success('User approved successfully');
      loadPendingUsers(); // Refresh the list
    } catch (error) {
      console.error('Error approving user:', error);
      toast.error('Failed to approve user');
    }
  };

  const rejectUser = async (userId: string, email: string) => {
    try {
      // Find the auth user by email
      const { data: authUsers, error: authUsersError } = await supabase.auth.admin.listUsers();
      
      if (authUsersError) {
        console.error('Error fetching auth users:', authUsersError);
        toast.error('Failed to reject user');
        return;
      }

      const authUser = authUsers.users.find((user: any) => user.email === email);
      
      if (authUser) {
        // Delete from auth
        const { error: deleteError } = await supabase.auth.admin.deleteUser(authUser.id);

        if (deleteError) {
          console.error('Error rejecting user:', deleteError);
          toast.error('Failed to reject user');
          return;
        }
      }

      // Delete from user_roles table
      const { error: roleError } = await supabase
        .from('user_roles')
        .delete()
        .eq('email', email);

      if (roleError) {
        console.error('Error deleting user role:', roleError);
      }

      toast.success('User rejected and removed');
      loadPendingUsers(); // Refresh the list
    } catch (error) {
      console.error('Error rejecting user:', error);
      toast.error('Failed to reject user');
    }
  };

  useEffect(() => {
    loadPendingUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-green-300 border-t-green-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-yellow-400" />
          <span className="text-white text-lg sm:text-xl">Pending User Approvals</span>
          <Badge variant="secondary" className="ml-2">
            {pendingUsers.length} pending
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {pendingUsers.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <UserCheck className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No pending user approvals</p>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-600 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-600 bg-gray-700/50">
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">Email</TableHead>
                    <TableHead className="text-gray-300">Registration Date</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingUsers.map((user) => (
                    <TableRow key={user.id} className="border-gray-600 bg-gray-800/50">
                      <TableCell className="text-white font-medium">
                        {user.name}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4" />
                          <span>{user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(user.created_at).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => approveUser(user.id, user.email)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <UserCheck className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => rejectUser(user.id, user.email)}
                            className="border-red-500/30 text-red-400 hover:bg-red-900/20 hover:border-red-400"
                          >
                            <UserX className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserApprovalManager;
