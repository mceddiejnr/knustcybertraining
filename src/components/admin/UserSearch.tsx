
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { UserRole } from "@/types/user";

interface UserSearchProps {
  users: UserRole[];
  onFilteredUsersChange: (filteredUsers: UserRole[]) => void;
}

const UserSearch = ({ users, onFilteredUsersChange }: UserSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(value.toLowerCase()) ||
      user.role.toLowerCase().includes(value.toLowerCase()) ||
      user.email.toLowerCase().includes(value.toLowerCase())
    );
    onFilteredUsersChange(filtered);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        placeholder="Search users by name, email, or role..."
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
      />
    </div>
  );
};

export default UserSearch;
