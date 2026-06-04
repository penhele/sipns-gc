import { api } from "@/lib/api/axios";

export const deleteScore = async (id: string): Promise<void> => {
  await api.delete(`/scores/${id}`);
};
