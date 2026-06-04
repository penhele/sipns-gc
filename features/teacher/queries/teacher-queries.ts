import { queryOptions } from "@tanstack/react-query";
import { getTeachers } from "../api/get-teachers";

export const getTeachersQueryOptions = () =>
    queryOptions({
        queryKey: ["teachers"],
        queryFn: getTeachers,
        staleTime: 1000 * 60 * 5,
    });
