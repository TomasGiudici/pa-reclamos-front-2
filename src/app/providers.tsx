'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"

const queryClient = new QueryClient()

function TanstackQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanstackQueryProvider>
      <Toaster position="top-right" richColors />
      {children}
    </TanstackQueryProvider>
  )
}