"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"

const ROLE_LABELS: Record<string, string> = {
  cliente: "Cliente",
  empleado: "Empleado",
  admin: "Administrador",
}

// Helper function to get display name
function getDisplayName(name: string, role: string): string {
  // If name looks like an ID, show a friendly name instead
  if (/^[a-f0-9]{24}$/.test(name)) {
    return `Usuario ${ROLE_LABELS[role] || 'Cliente'}`
  }
  return name
}


export function UserCard() {
  const { user, logout, isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  function handleLogout() {
    logout()
    router.push("/login")
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-input rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-muted rounded w-24 mb-2"></div>
        <div className="h-3 bg-muted rounded w-16"></div>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-input rounded-lg p-4 text-left hover:bg-muted transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">
              {user.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {getDisplayName(user.name, user.role)}
            </p>
            <p className="text-xs text-muted-foreground">
              {ROLE_LABELS[user.role?.toLowerCase()]}
            </p>
          </div>
          <svg
            className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-card rounded-lg shadow-lg overflow-hidden">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-muted transition-all flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}
