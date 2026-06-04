import { api } from "@/lib/api/axios";
import { Student } from "../types/student";

export interface UpdateStudentParams {
  id: string;
  name?: string;
  nisn?: string;
  class?: string;
}

export const updateStudent = async ({ id, ...data }: UpdateStudentParams): Promise<Student> => {
  const response = await api.patch(`/students/${id}`, data);
  return response.data;
};
