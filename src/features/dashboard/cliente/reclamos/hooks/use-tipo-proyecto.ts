"use client"

import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useAuthStore } from "@/stores/auth"

export interface TipoProyecto {
  id: string
  nombre: string
  descripcion?: string
}

/**
 * Hook para listar tipos de proyecto usando TanStack Query
 * Usa la API global: api.tipoProyecto.listar
 */
export function useTipoProyecto() {
  const token = useAuthStore((state) => state.auth?.access_token)

  return useQuery<TipoProyecto[]>({
    queryKey: ["tipo-proyecto"],
    enabled: !!token,
    queryFn: async () => {
      if (!token) throw new Error("No hay token de autenticación")
      return api.tipoProyecto.listar(token) as Promise<TipoProyecto[]>
    },
  })
}
