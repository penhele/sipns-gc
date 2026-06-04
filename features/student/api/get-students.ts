import { api } from "@/lib/api/axios";
import { Student } from "../types/student";

export const getStudents = async ():Promise<Student[]> => {
  const response = await api.get("/students");

  return response.data;
};
