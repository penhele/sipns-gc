import { api } from "@/lib/api/axios";
import { Login } from "../login/types/login";
import Cookies from "js-cookie";

export const login = async (data: Login) => {
  const response = await api.post("/auth/login", data);

  Cookies.set("access_token", response.data.access_token);

  return response.data;
};
