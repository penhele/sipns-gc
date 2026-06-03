import { api } from "@/lib/api/axios";
import { CreateScorePayload } from "../types/score";

export const createScore = async (data: CreateScorePayload) => {
  const response = await api.post("/scores", data);

  return response.data;
};
