import type { Claim, CreateClaimPayload } from "../types/claim"

const MOCK_CLAIMS: Claim[] = [
  {
    id: "1",
    title: "Producto defectuoso",
    description: "El producto llegó con daños visibles en el empaque y no funciona correctamente.",
    type: "product_failure",
    priority: "high",
    criticality: "high",
    status: "pending",
    attachments: ["foto1.jpg", "foto2.jpg"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    userId: "1",
  },
  {
    id: "2",
    title: "Consulta sobre garantía",
    description: "Necesito información sobre la cobertura de garantía de mi producto.",
    type: "service_question",
    priority: "medium",
    criticality: "low",
    status: "in_progress",
    attachments: [],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-12"),
    userId: "1",
  },
  {
    id: "3",
    title: "Error en facturación",
    description: "Me cobraron dos veces por el mismo producto.",
    type: "incident",
    priority: "high",
    criticality: "medium",
    status: "resolved",
    attachments: ["comprobante.pdf"],
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-08"),
    userId: "1",
  },
]

export const claimService = {
  async getClaims(): Promise<Claim[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return MOCK_CLAIMS
  },

  async createClaim(payload: CreateClaimPayload): Promise<Claim> {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newClaim: Claim = {
      id: String(Date.now()),
      title: payload.title,
      description: payload.description,
      type: payload.type,
      priority: payload.priority,
      criticality: payload.criticality,
      status: "pending",
      attachments: payload.attachments.map((f) => f.name),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: "1",
    }

    console.log("[API Mock] Claim created:", newClaim)
    return newClaim
  },
}
