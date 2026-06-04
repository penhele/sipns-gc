import { queryOptions } from "@tanstack/react-query";
import { getScores } from "../api/get-scores";

export const getScoresQueryOptions = () =>
    queryOptions({
        queryKey: ["scores"],
        queryFn: getScores,
        staleTime: 1000 * 60 * 5,
    });
