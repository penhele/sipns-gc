import { useQuery } from "@tanstack/react-query";
import { getTeachersQueryOptions } from "../queries/teacher-queries";

export default function useTeachers() {
    return useQuery(getTeachersQueryOptions())
}