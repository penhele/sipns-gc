import { api } from "@/lib/api/axios";
import { Student } from "../types/student";

export interface CreateStudentParams {
  name: string;
  nisn: string;
  class: string;
  email: string;
  password: string;
}

export const createStudent = async (data: CreateStudentParams): Promise<Student> => {
  const response = await api.post("/students", data);
  return response.data;
};
