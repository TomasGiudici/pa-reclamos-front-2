export type ClaimType = "product_failure" | "service_question" | "incident"
export type Priority = "high" | "medium" | "low"
export type Criticality = "high" | "medium" | "low"
export type ClaimStatus = "pending" | "in_progress" | "resolved" | "rejected"

export interface Claim {
  id: string
  title: string
  description: string
  type: ClaimType
  priority: Priority
  criticality: Criticality
  status: ClaimStatus
  attachments: string[]
  createdAt: Date
  updatedAt: Date
  userId: string
}

export interface CreateClaimPayload {
  title: string
  description: string
  type: ClaimType
  priority: Priority
  criticality: Criticality
  attachments: File[]
}
