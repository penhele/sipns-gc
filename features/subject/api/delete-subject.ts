import { api } from "@/lib/api/axios";

export const deleteSubject = async (id: string): Promise<void> => {
  await api.delete(`/subjects/${id}`);
};
