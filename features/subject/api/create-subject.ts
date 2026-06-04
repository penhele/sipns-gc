import { api } from "@/lib/api/axios";
import { Subject } from "../types/subject";

export const createSubject = async (data: { name: string }): Promise<Subject> => {
  const response = await api.post("/subjects", data);
  return response.data;
};
