import { ListaProyectos } from "@/features/dashboard/cliente/reclamos/components/lista-proyectos"

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Mis Proyectos</h1>
      </div>
      <ListaProyectos />
    </div>
  )
}
