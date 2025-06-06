
export const getDefaultPermissions = (role: string): string[] => {
  switch (role) {
    case "admin":
      return ["all"];
    case "facilitator":
      return ["manage_program", "view_analytics", "manage_attendance"];
    case "participant":
      return ["view_program"];
    case "guest":
      return ["view_program"];
    default:
      return [];
  }
};

export const getDefaultUsers = () => [
  {
    id: "1",
    name: "Admin User",
    role: "admin" as const,
    email: "admin@knust.edu.gh",
    password: "admin123",
    permissions: ["all"],
    lastActive: new Date().toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Deputy Director, ISTAD",
    role: "facilitator" as const,
    email: "istad@knust.edu.gh",
    password: "istad123",
    permissions: ["manage_program", "view_analytics"],
    lastActive: new Date().toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "University Librarian",
    role: "facilitator" as const,
    email: "librarian@knust.edu.gh",
    password: "lib123",
    permissions: ["manage_program"],
    lastActive: new Date().toISOString(),
    createdAt: new Date().toISOString()
  }
];
