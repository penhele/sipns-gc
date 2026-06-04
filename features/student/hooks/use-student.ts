import { useQuery } from "@tanstack/react-query";
import { getStudentByIdQueryOptions } from "../queries/student-queries";
import { Student } from "../types/student";

export default function useStudent(id: string) {
  return useQuery(getStudentByIdQueryOptions(id));
}
