
export const getDefaultPermissions = (role: string): string[] => {
  switch (role) {
    case "admin":
      return ["read", "write", "delete", "manage_users", "manage_settings"];
    case "facilitator":
      return ["read", "write", "manage_content"];
    case "participant":
      return ["read", "write"];
    case "guest":
      return ["read"];
    default:
      return ["read"];
  }
};
