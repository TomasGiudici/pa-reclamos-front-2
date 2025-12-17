'use client'

import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useAuthStore } from "@/stores/auth"
import type { AuthData } from "../types/auth"

export interface LoginCredentials {
  email: string
  contraseña: string
}

export interface RegisterCredentials {
  email: string
  contraseña: string
  nombre: string
  telefono: string
}

/**
 * Hook for login mutation using TanStack Query
 * Usa la API global: api.auth.login
 */
export function useLoginMutation() {
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation<AuthData, Error, LoginCredentials>({
    mutationFn: (credentials) => api.auth.login(credentials),
    onSuccess: (data) => {
      // Set the auth data (JWT contains basic user info)
      setAuth(data)
    },
  })
}

/**
 * Hook for register mutation using TanStack Query
 * Usa la API global: api.auth.registerCliente
 */
export function useRegisterMutation() {
  return useMutation<AuthData, Error, RegisterCredentials>({
    mutationFn: (credentials) => api.auth.registerCliente(credentials),
  })
}

