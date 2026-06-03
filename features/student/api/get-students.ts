import { api } from "@/lib/api/axios";

export const getStudents = async () => {
  const response = await api.get("/students");

  return response.data;
};
