import { CrearReclamoForm } from "@/features/dashboard/cliente/reclamos/components/crear-reclamo-form"

export default function CreateClaimPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Crear Reclamo</h1>
      </div>
      <div className="max-w-2xl">
        <CrearReclamoForm />
      </div>
    </div>
  )
}
