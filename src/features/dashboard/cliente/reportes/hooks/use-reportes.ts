"use client"

import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useAuthStore } from "@/stores/auth"

export function useReclamosPorEstado() {
  const token = useAuthStore((state) => state.auth?.access_token)

  return useQuery({
    queryKey: ["reportes", "reclamos-por-estado"],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token")

      // Obtener reclamos para cada estado
      const [pendientes, enProceso, resueltos] = await Promise.all([
        api.cambioEstado.listarPorEstado("PENDIENTE", token),
        api.cambioEstado.listarPorEstado("EN_PROCESO", token),
        api.cambioEstado.listarPorEstado("RESUELTO", token),
      ])

      return {
        pendientes: Array.isArray(pendientes) ? pendientes.length : 0,
        enProceso: Array.isArray(enProceso) ? enProceso.length : 0,
        resueltos: Array.isArray(resueltos) ? resueltos.length : 0,
      }
    },
    enabled: !!token,
  })
}

export function useTiempoPromedioResolucion() {
  const token = useAuthStore((state) => state.auth?.access_token)

  return useQuery({
    queryKey: ["reportes", "tiempo-promedio-resolucion"],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token")
      try {
        return await api.reclamos.tiempoPromedioResolucion(token)
      } catch (error) {
        console.warn('Tiempo promedio endpoint not available:', error)
        // Si falla, calcular manualmente desde los reclamos resueltos
        const cambiosResueltos = await api.cambioEstado.listarPorEstado("RESUELTO", token)
        if (!Array.isArray(cambiosResueltos) || cambiosResueltos.length === 0) {
          return { promedio: 0, total: 0 }
        }
        
        const tiempos = cambiosResueltos
          .filter((c: any) => c.fechaInicio && c.fechaFin)
          .map((c: any) => {
            const inicio = new Date(c.fechaInicio)
            const fin = new Date(c.fechaFin)
            return (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24) // días
          })
        
        const promedio = tiempos.length > 0 
          ? tiempos.reduce((a: number, b: number) => a + b, 0) / tiempos.length 
          : 0
        
        return { promedio, total: tiempos.length }
      }
    },
    enabled: !!token,
    retry: false,
  })
}

export function useCantidadPromedioResolucion() {
  const token = useAuthStore((state) => state.auth?.access_token)

  return useQuery({
    queryKey: ["reportes", "cantidad-promedio-resolucion"],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token")
      try {
        return await api.reclamos.cantidadPromedioResolucion(token)
      } catch (error) {
        console.warn('Cantidad promedio endpoint not available:', error)
        // Si falla, calcular manualmente
        const cambiosResueltos = await api.cambioEstado.listarPorEstado("RESUELTO", token)
        if (!Array.isArray(cambiosResueltos)) {
          return { promedio: 0, total: 0 }
        }
        
        // Agrupar por mes
        const resolucionesPorMes: Record<string, number> = {}
        cambiosResueltos.forEach((c: any) => {
          const fecha = new Date(c.fechaFin || c.fechaInicio)
          const mesAno = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`
          resolucionesPorMes[mesAno] = (resolucionesPorMes[mesAno] || 0) + 1
        })
        
        const meses = Object.keys(resolucionesPorMes).length
        const promedio = meses > 0 
          ? cambiosResueltos.length / meses 
          : cambiosResueltos.length
        
        return { promedio, total: cambiosResueltos.length }
      }
    },
    enabled: !!token,
    retry: false,
  })
}

export function useReclamosFiltrados(
  filtros: {
    estado?: string
    fechaDesde?: string
    fechaFin?: string
  }
) {
  const token = useAuthStore((state) => state.auth?.access_token)
  const user = useAuthStore((state) => state.user)

  return useQuery({
    queryKey: ["reportes", "reclamos-filtrados", filtros],
    queryFn: async () => {
      if (!token || !user) throw new Error("No authentication token or user")
      
      try {
        return await api.reclamos.filtros(
          {
            ...filtros,
            clienteId: user.id,
          },
          token
        )
      } catch (error: any) {
        // Si el endpoint no existe, usamos los reclamos del cliente
        console.warn('Filtros endpoint failed, falling back to client claims:', error.message)
        const allClaims = await api.reclamos.listarPorCliente(token)
        
        // Filtrar manualmente por fechas
        if (!Array.isArray(allClaims)) return []
        
        return allClaims.filter((claim: any) => {
          // Validar que createdAt existe
          if (!claim.createdAt) return false
          
          try {
            const claimDate = new Date(claim.createdAt)
            // Verificar que la fecha es válida
            if (isNaN(claimDate.getTime())) return false
            
            const desde = filtros.fechaDesde ? new Date(filtros.fechaDesde) : null
            const hasta = filtros.fechaFin ? new Date(filtros.fechaFin) : null
            
            if (desde && claimDate < desde) return false
            if (hasta && claimDate > hasta) return false
            if (filtros.estado && claim.estado !== filtros.estado) return false
            
            return true
          } catch (e) {
            console.warn('Invalid date in claim:', claim.createdAt)
            return false
          }
        })
      }
    },
    enabled: !!token && !!user,
  })
}

