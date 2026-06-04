import { api } from "@/lib/api/axios";
import { Student } from "../types/student";

export const getStudent = async (id: string): Promise<Student> => {
  const response = await api.get(`/students/${id}`);

  return response.data;
};
