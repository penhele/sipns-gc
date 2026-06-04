import { useQuery } from "@tanstack/react-query";
import { getSubjects } from "../api/get-subjects";

export default function useSubjects() {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
    staleTime: 1000 * 60 * 5,
  });
}
