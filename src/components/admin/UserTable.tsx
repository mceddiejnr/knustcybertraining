
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UserTableRow from "./UserTableRow";
import { UserRole } from "@/types/user";

interface UserTableProps {
  filteredUsers: UserRole[];
  onRoleUpdate: (userId: string, newRole: "admin" | "facilitator" | "participant" | "guest") => void;
  onPasswordUpdate: (userId: string, newPassword: string) => void;
  onDelete: (userId: string) => void;
}

const UserTable = ({ filteredUsers, onRoleUpdate, onPasswordUpdate, onDelete }: UserTableProps) => {
  return (
    <div className="rounded-lg border border-gray-600 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-600 bg-gray-700/50">
              <TableHead className="text-gray-300 min-w-[120px]">Name</TableHead>
              <TableHead className="text-gray-300 min-w-[150px] hidden sm:table-cell">Email</TableHead>
              <TableHead className="text-gray-300 min-w-[100px]">Role</TableHead>
              <TableHead className="text-gray-300 min-w-[120px] hidden md:table-cell">Permissions</TableHead>
              <TableHead className="text-gray-300 min-w-[100px] hidden lg:table-cell">Created</TableHead>
              <TableHead className="text-gray-300 min-w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                onRoleUpdate={onRoleUpdate}
                onPasswordUpdate={onPasswordUpdate}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No users found matching your search.
        </div>
      )}
    </div>
  );
};

export default UserTable;
