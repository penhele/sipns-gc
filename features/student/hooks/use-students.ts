import { useQuery } from "@tanstack/react-query";
import { getStudentsQueryOptions } from "../queries/student-queries";

export default function useStudents() {
  return useQuery(getStudentsQueryOptions());
}
