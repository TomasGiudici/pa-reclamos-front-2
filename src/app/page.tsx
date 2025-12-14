import { MainLayout } from "@/components/layout/main-layout"
import { ClaimForm } from "@/features/dashboard/cliente/reclamos/components/claim-form"

export default function Home() {
  return (
    <MainLayout>
      <ClaimForm />
    </MainLayout>
  )
}
