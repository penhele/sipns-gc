import { api } from "@/lib/api/axios";
import { Teacher } from "../types/teacher";

export interface UpdateTeacherParams {
  id: string;
  name?: string;
  subjectId?: string;
}

export const updateTeacher = async ({
  id,
  ...data
}: UpdateTeacherParams): Promise<Teacher> => {
  const response = await api.patch(`/teachers/${id}`, data);
  return response.data;
};
