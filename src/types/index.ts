export type Role = "admin" | "employee";
export type UserType = "software" | "hardware" | null;

export interface User {
  username: string;
  name: string;
  role: Role;
  type: UserType;
}

export interface WorkUpdate {
  id?: number;
  username?: string;
  name?: string;
  userType?: UserType;
  date: string;
  projectType: string;
  projectName: string;
  workDone: string;
  task: string;
  helpTaken: string;
  status: "work" | "leave";
  timestamp?: string;
}
