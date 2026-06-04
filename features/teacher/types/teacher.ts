import { User } from "@/features/auth/types/user";
import { Subject } from "@/features/subject/types/subject";

export interface Teacher {
  id: string;
  name: string;
  userId: string;
  subjectId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  subject?: Subject;
}
