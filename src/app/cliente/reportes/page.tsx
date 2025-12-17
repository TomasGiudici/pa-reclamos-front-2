import { ReclamosPorEstadoChart } from "@/features/dashboard/cliente/reportes/components/reclamos-por-estado-chart"
import { EstadisticasPromedios } from "@/features/dashboard/cliente/reportes/components/estadisticas-promedios"
import { EvolucionReclamosChart } from "@/features/dashboard/cliente/reportes/components/evolucion-reclamos-chart"
import { DistribucionEstadosChart } from "@/features/dashboard/cliente/reportes/components/distribucion-estados-chart"
import "@/features/dashboard/cliente/reportes/components/charts.css"

export default function ReportesPage() {
  return (
    <div className="space-y-6 [&_text]:!fill-white [&_.recharts-text]:!fill-white"
      style={{
        // @ts-ignore
        '--chart-text-color': '#FFFFFF',
      }}
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reportes</h1>
        <p className="text-muted-foreground">
          Visualiza estadísticas y métricas de tus reclamos
        </p>
      </div>

      <div className="space-y-6">
        {/* Estadísticas de promedios */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">
            Estadísticas Generales
          </h2>
          <EstadisticasPromedios />
        </div>

        {/* Gráficos de estado */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Gráfico de barras */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">
              Reclamos por Estado
            </h2>
            <div className="rounded-lg border bg-card p-6">
              <ReclamosPorEstadoChart />
            </div>
          </div>

          {/* Gráfico circular */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">
              Distribución de Estados
            </h2>
            <div className="rounded-lg border bg-card p-6">
              <DistribucionEstadosChart />
            </div>
          </div>
        </div>

        {/* Gráfico de evolución temporal */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">
            Evolución de Reclamos
          </h2>
          <div className="rounded-lg border bg-card p-6">
            <EvolucionReclamosChart />
          </div>
        </div>
      </div>
    </div>
  )
}

