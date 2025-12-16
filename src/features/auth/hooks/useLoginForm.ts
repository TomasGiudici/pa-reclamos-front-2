import { useRouter } from "next/navigation"
import { useLoginMutation } from "./useAuthMutations"

export function useLoginForm() {
  const router = useRouter()
  const { mutateAsync, isPending, error } = useLoginMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (email && password) {
      try {
        await mutateAsync({ email, contraseña: password })
        // Redirigir a la página principal después de login exitoso
        router.push("/")
      } catch {
        // Error is handled by TanStack Query
      }
    }
  }

  return {
    handleSubmit,
    loading: isPending,
    error: error?.message || null,
  };
}

