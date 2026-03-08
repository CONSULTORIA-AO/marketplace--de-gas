import { LoginFormData } from "@/schema/customer.schema";
import { AuthResponse } from "@/types/auth";
import { api } from "@/utils/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useAuth(
  options?: UseMutationOptions<AuthResponse, AxiosError, LoginFormData>
) {
  return useMutation<AuthResponse, AxiosError, LoginFormData>({
    mutationFn: async (data: LoginFormData) => {
      const response = await api.post<AuthResponse>("/clientes/login", data);
      return response.data;
    },
    retry: 1,
    ...options,
  });
}