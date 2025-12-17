# Módulo de Reportes - Cliente

Este módulo contiene la funcionalidad de reportes y estadísticas para clientes.

## Estructura

```
reportes/
├── components/               # Componentes visuales de gráficos
│   ├── reclamos-por-estado-chart.tsx      # Gráfico de barras por estado
│   ├── distribucion-estados-chart.tsx     # Gráfico circular (pie) de distribución
│   ├── evolucion-reclamos-chart.tsx       # Gráfico de líneas temporal
│   ├── estadisticas-promedios.tsx         # Cards de estadísticas
│   └── index.ts                           # Barrel export
├── hooks/                   # Custom hooks para datos
│   └── use-reportes.ts                    # Hooks de React Query
└── README.md               # Este archivo
```

## Componentes

### ReclamosPorEstadoChart
Gráfico de barras que muestra la cantidad de reclamos por estado (Pendiente, En Proceso, Resuelto).

**Tecnología:** Recharts BarChart

### DistribucionEstadosChart
Gráfico circular (pie chart) que muestra la distribución porcentual de reclamos por estado con estadísticas numéricas debajo.

**Tecnología:** Recharts PieChart

### EvolucionReclamosChart
Gráfico de líneas que muestra la evolución temporal de los reclamos con selector de periodo (7, 30, 90 días).

**Tecnología:** Recharts LineChart

### EstadisticasPromedios
Cards que muestran:
- Tiempo promedio de resolución (en días)
- Cantidad promedio de resoluciones por mes

**Nota:** Estos datos no usan gráficos, solo texto.

## Hooks

### useReclamosPorEstado
Obtiene la cantidad de reclamos agrupados por estado usando el endpoint `/cambio-estado/estado/:estado`.

### useReclamosFiltrados
Obtiene reclamos filtrados por fecha y cliente usando el endpoint `/reclamo/filtros`.

### useTiempoPromedioResolucion
Obtiene el tiempo promedio de resolución desde `/reclamo/tiempo-promedio-resolucion`.

### useCantidadPromedioResolucion
Obtiene la cantidad promedio de resoluciones desde `/reclamo/cantidad-promedio-resolucion`.

## APIs Utilizadas

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/cambio-estado/estado/:estado` | GET | Lista cambios de estado por estado específico |
| `/reclamo/filtros` | GET | Lista reclamos con filtros (estado, fechas, cliente) |
| `/reclamo/tiempo-promedio-resolucion` | GET | Obtiene tiempo promedio de resolución |
| `/reclamo/cantidad-promedio-resolucion` | GET | Obtiene cantidad promedio de resoluciones |

## Uso

La página de reportes se encuentra en `/cliente/reportes` y está integrada en la navegación del cliente.

```typescript
import { ReclamosPorEstadoChart } from "@/features/dashboard/cliente/reportes/components/reclamos-por-estado-chart"
import { EstadisticasPromedios } from "@/features/dashboard/cliente/reportes/components/estadisticas-promedios"
import { EvolucionReclamosChart } from "@/features/dashboard/cliente/reportes/components/evolucion-reclamos-chart"
```

## Dependencias

- `recharts`: Librería de gráficos
- `@tanstack/react-query`: Manejo de estado de servidor
- `@/components/chart`: Wrappers de recharts con estilos propios

