import { queryOptions } from "@tanstack/react-query";
import { getStudents } from "../api/get-students";

export const getStudentsQueryOptions = () =>
  queryOptions({
    queryKey: ["students"],
    queryFn: getStudents,
    staleTime: 1000 * 60 * 5,
  });
