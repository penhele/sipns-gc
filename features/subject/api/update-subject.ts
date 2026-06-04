import { api } from "@/lib/api/axios";
import { Subject } from "../types/subject";

export const updateSubject = async ({ id, name }: { id: string; name: string }): Promise<Subject> => {
  const response = await api.patch(`/subjects/${id}`, { name });
  return response.data;
};
