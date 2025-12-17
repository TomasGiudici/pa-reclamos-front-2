import { ListaReclamos } from "@/features/dashboard/cliente/reclamos/components/lista-reclamos"

export default function ClaimsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Mis Reclamos</h1>
      </div>
      <ListaReclamos />
    </div>
  )
}
