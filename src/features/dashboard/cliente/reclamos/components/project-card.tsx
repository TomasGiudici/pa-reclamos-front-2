import type { Proyecto } from "../hooks/use-proyectos"
import { formatDate } from "@/helpers/format"

interface ProjectCardProps {
  project: Proyecto
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground">{project.nombre}</h3>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
          Activo
        </span>
      </div>

      {project.descripcion && (
        <p className="text-muted-foreground text-sm line-clamp-2">{project.descripcion}</p>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs text-muted-foreground">{formatDate(new Date())}</span>
      </div>
    </div>
  )
}
