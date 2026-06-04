import { useQuery } from "@tanstack/react-query";
import { getScoresQueryOptions } from "../queries/score-queries";

export default function useScores(teacherId?: string) {
    return useQuery(getScoresQueryOptions(teacherId))
}