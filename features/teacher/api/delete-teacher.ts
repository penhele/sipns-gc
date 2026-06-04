import { api } from "@/lib/api/axios";

export const deleteTeacher = async (id: string): Promise<void> => {
  await api.delete(`/teachers/${id}`);
};
