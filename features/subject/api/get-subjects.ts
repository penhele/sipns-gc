import { api } from "@/lib/api/axios";
import { Subject } from "../types/subject";

export const getSubjects = async (): Promise<Subject[]> => {
  const response = await api.get("/subjects");
  return response.data;
};
