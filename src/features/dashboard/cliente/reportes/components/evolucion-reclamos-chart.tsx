"use client"

import { useState } from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/chart"
import { useReclamosFiltrados } from "../hooks/use-reportes"

const chartConfig = {
  cantidad: {
    label: "Cantidad",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function EvolucionReclamosChart() {
  const [periodo, setPeriodo] = useState<"7dias" | "30dias" | "90dias">("30dias")
  
  // Calcular fechas según el periodo seleccionado
  const getFechas = () => {
    const hoy = new Date()
    const fechaFin = hoy.toISOString().split('T')[0]
    
    const diasAtras = periodo === "7dias" ? 7 : periodo === "30dias" ? 30 : 90
    const fechaDesde = new Date(hoy)
    fechaDesde.setDate(fechaDesde.getDate() - diasAtras)
    
    return {
      fechaDesde: fechaDesde.toISOString().split('T')[0],
      fechaFin,
    }
  }

  const { fechaDesde, fechaFin } = getFechas()
  const { data, isLoading, error } = useReclamosFiltrados({
    fechaDesde,
    fechaFin,
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm">
            30 días
          </button>
        </div>
        <div className="flex items-center justify-center h-[300px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          {['7dias', '30dias', '90dias'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriodo(p as any)}
              className={`px-3 py-1 rounded-md text-sm ${
                periodo === p
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {p === '7dias' ? '7' : p === '30dias' ? '30' : '90'} días
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center h-[300px]">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">Error al cargar datos</p>
            <p className="text-xs text-red-400">{error.message}</p>
          </div>
        </div>
      </div>
    )
  }

  // Procesar datos para agrupar por fecha
  const reclamos = Array.isArray(data) ? data : []
  
  if (reclamos.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          {['7dias', '30dias', '90dias'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriodo(p as any)}
              className={`px-3 py-1 rounded-md text-sm ${
                periodo === p
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {p === '7dias' ? '7' : p === '30dias' ? '30' : '90'} días
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">No hay reclamos en este periodo</p>
        </div>
      </div>
    )
  }
  
  const reclamosPorFecha = reclamos.reduce((acc: Record<string, number>, reclamo: any) => {
    // Validar que createdAt existe y es válido
    if (!reclamo.createdAt) return acc
    
    try {
      const date = new Date(reclamo.createdAt)
      // Verificar que la fecha es válida
      if (isNaN(date.getTime())) return acc
      
      const fecha = date.toISOString().split('T')[0]
      acc[fecha] = (acc[fecha] || 0) + 1
    } catch (error) {
      // Si hay error al parsear la fecha, ignorar este reclamo
      console.warn('Invalid date for reclamo:', reclamo.createdAt)
    }
    
    return acc
  }, {})

  const chartData = Object.entries(reclamosPorFecha)
    .map(([fecha, cantidad]) => ({
      fecha: new Date(fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      fechaCompleta: fecha,
      cantidad,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.fechaCompleta)
      const dateB = new Date(b.fechaCompleta)
      return dateA.getTime() - dateB.getTime()
    })

  // Si después de filtrar no hay datos válidos
  if (chartData.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          {['7dias', '30dias', '90dias'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriodo(p as any)}
              className={`px-3 py-1 rounded-md text-sm ${
                periodo === p
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {p === '7dias' ? '7' : p === '30dias' ? '30' : '90'} días
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">
            {reclamos.length > 0 
              ? "No hay datos válidos para mostrar" 
              : "No hay reclamos en este periodo"
            }
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Selector de periodo */}
      <div className="flex gap-2">
        <button
          onClick={() => setPeriodo("7dias")}
          className={`px-3 py-1 rounded-md text-sm ${
            periodo === "7dias"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          7 días
        </button>
        <button
          onClick={() => setPeriodo("30dias")}
          className={`px-3 py-1 rounded-md text-sm ${
            periodo === "30dias"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          30 días
        </button>
        <button
          onClick={() => setPeriodo("90dias")}
          className={`px-3 py-1 rounded-md text-sm ${
            periodo === "90dias"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          90 días
        </button>
      </div>

      {/* Gráfico */}
      <div className="[&_.recharts-cartesian-axis-tick_text]:!fill-[#E5E7EB]">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="fecha"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "#E5E7EB", fontSize: 13 }}
            />
            <YAxis 
              tick={{ fill: "#E5E7EB", fontSize: 13 }} 
              axisLine={false}
              tickLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="cantidad"
              stroke="#FF9500"
              strokeWidth={3}
              dot={{ fill: "#FF9500", r: 5, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  )
}

