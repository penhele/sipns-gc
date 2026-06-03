import { Student } from "@/features/student/types/student";
import { Teacher } from "@/features/teacher/types/teacher";

export interface User {
  id: string;
  email: string;
  role: string;
  teacher?: Teacher;
  student?: Student;
}
