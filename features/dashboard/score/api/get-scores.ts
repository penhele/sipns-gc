import { api } from "@/lib/api/axios";
import { Score } from "../types/score";

export const getScores = async (teacherId?: string): Promise<Score[]> => {
  const response = await api.get("/scores", {
    params: teacherId ? { teacherId } : undefined,
  });

  return response.data;
};
