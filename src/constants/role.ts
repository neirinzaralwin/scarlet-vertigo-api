export const USER_ROLE = {
    admin: "admin",
    moderator: "moderator",
    customer: "customer",
  } as const;
  
  export type RoleType = "admin" | "moderator" | "customer";
  
  export interface User {
    _id: string;
    roleId: number;
    role: RoleType;
  }
  