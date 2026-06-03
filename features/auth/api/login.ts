import { api } from "@/lib/api/axios";
import { Login } from "../login/types/login";

export const login = async (data: Login) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};
