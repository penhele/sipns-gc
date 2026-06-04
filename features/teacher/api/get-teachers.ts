import { api } from "@/lib/api/axios";
import { Teacher } from "../types/teacher";

export const getTeachers = async (): Promise<Teacher[]> => {
  const response = await api.get("/teachers");

  return response.data;
};
