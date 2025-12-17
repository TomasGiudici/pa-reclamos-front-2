"use client"

import { useProyectos } from "../hooks/use-proyectos"
import { ProjectCard } from "./project-card"

export function ListaProyectos() {
  const { data: projects = [], isLoading, error } = useProyectos()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">{error.message || "Error al cargar los proyectos"}</p>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No tienes proyectos registrados</p>
        <p className="text-sm text-muted-foreground mt-2">
          Crea tu primer proyecto para comenzar
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
