import { api } from "@/lib/api/axios";
import { User } from "../types/user";

export const getMe = async (): Promise<User> => {
  const response = await api.get("/auth/me");

  return response.data;
};
