import { api } from "@/lib/api/axios";
import { Score } from "../types/score";

export interface UpdateScoreParams {
  id: string;
  nilaiTugas?: number;
  nilaiUts?: number;
  nilaiUas?: number;
}

export const updateScore = async ({
  id,
  ...data
}: UpdateScoreParams): Promise<Score> => {
  const response = await api.patch(`/scores/${id}`, data);
  return response.data;
};
