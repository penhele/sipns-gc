import { api } from "@/lib/api/axios";
import { Teacher } from "../types/teacher";

export interface CreateTeacherParams {
  name: string;
  email: string;
  password: string;
  subjectId: string;
}

export const createTeacher = async (
  data: CreateTeacherParams,
): Promise<Teacher> => {
  const response = await api.post("/teachers", data);
  return response.data;
};
