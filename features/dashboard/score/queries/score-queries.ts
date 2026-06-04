import { queryOptions } from "@tanstack/react-query";
import { getScores } from "../api/get-scores";

export const getScoresQueryOptions = (teacherId?: string) =>
  queryOptions({
    queryKey: ["scores", { teacherId }],
    queryFn: () => getScores(teacherId),
    staleTime: 1000 * 60 * 5,
  });
