import { useQuery } from "@tanstack/react-query";
import { getScoresQueryOptions } from "../queries/score-queries";

export default function useScores() {
    return useQuery(getScoresQueryOptions())
}