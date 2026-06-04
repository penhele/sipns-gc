import { api } from "@/lib/api/axios";

export const deleteStudent = async (id: string): Promise<void> => {
  await api.delete(`/students/${id}`);
};
