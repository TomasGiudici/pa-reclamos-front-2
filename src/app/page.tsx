import { MainLayout } from "@/components/layout/main-layout"

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <h1 className="text-3xl font-bold tracking-tight text-center text-white">
          Bienvenido al sistema de gestión de proyectos y reclamos
        </h1>

      </div>
    </MainLayout>
  )
}
