import { User } from "@/features/auth/types/user";
import { Score } from "@/features/dashboard/score/types/score";

export interface Student {
  id: string;
  nisn: string;
  name: string;
  class: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  scores: Score[];
}
