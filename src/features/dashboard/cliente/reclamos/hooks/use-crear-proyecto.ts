"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useAuthStore } from "@/stores/auth"

export interface CrearProyectoPayload {
  nombre: string
  descripcion?: string
  tipoProyectoId: string
}

/**
 * Hook para crear un proyecto usando TanStack Query
 * Usa la API global: api.proyectos.crear
 */
export function useCrearProyecto() {
  const token = useAuthStore((state) => state.auth?.access_token)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CrearProyectoPayload) => {
      if (!token) throw new Error("No hay token de autenticación")
      return api.proyectos.crear(payload, token)
    },
    onSuccess: () => {
      // Invalidar la query de proyectos para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ["proyectos"] })
    },
  })
}
