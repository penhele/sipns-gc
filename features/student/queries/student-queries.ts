import { queryOptions } from "@tanstack/react-query";
import { getStudents } from "../api/get-students";
import { getStudent } from "../api/get-student";

export const getStudentsQueryOptions = () =>
  queryOptions({
    queryKey: ["students"],
    queryFn: getStudents,
    staleTime: 1000 * 60 * 5,
  });

export const getStudentByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["students", id],
    queryFn: () => getStudent(id),
    staleTime: 1000 * 60 * 5,
  });
