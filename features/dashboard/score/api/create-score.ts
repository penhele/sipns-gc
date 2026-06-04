import { api } from "@/lib/api/axios";
import { CreateScorePayload } from "../types/create-score-payload";

export const createScore = async (data: CreateScorePayload) => {
  const response = await api.post("/scores", {
    ...data,
    nilaiTugas: Number(data.nilaiTugas),
    nilaiUts: Number(data.nilaiUts),
    nilaiUas: Number(data.nilaiUas),
  });

  return response.data;
};
