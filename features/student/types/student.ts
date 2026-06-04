import { User } from "@/features/auth/types/user";

export interface Student {
  id: string;
  nisn: string;
  name: string;
  class: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}
