import { useQuery } from "@tanstack/react-query";
import { getMetQueryOptions } from "../queries/getMeQueryOptions";

export default function useMe() {
  return useQuery(getMetQueryOptions());
}
