import type { Claim } from "../types/claim"
import { STATUS_LABELS } from "../constants/claim-options"
import { formatDate } from "@/helpers/format"

interface ClaimCardProps {
  claim: Claim
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  in_progress: "bg-blue-500/20 text-blue-400",
  resolved: "bg-green-500/20 text-green-400",
  rejected: "bg-red-500/20 text-red-400",
}

const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-red-500/20 text-red-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  low: "bg-green-500/20 text-green-400",
}

export function ClaimCard({ claim }: ClaimCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground">{claim.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[claim.status]}`}>
          {STATUS_LABELS[claim.status]}
        </span>
      </div>

      <p className="text-muted-foreground text-sm line-clamp-2">{claim.description}</p>

      <div className="flex items-center gap-3 flex-wrap">
        <span className={`px-2 py-1 rounded text-xs font-medium ${PRIORITY_COLORS[claim.priority]}`}>
          Prioridad: {claim.priority === "high" ? "Alta" : claim.priority === "medium" ? "Media" : "Baja"}
        </span>
        <span className="text-xs text-muted-foreground">{formatDate(claim.createdAt)}</span>
      </div>
    </div>
  )
}
