import { queryOptions } from "@tanstack/react-query";
import { getMe } from "../api/get-me";

export const getMetQueryOptions = () =>
  queryOptions({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
  });
