"use client"

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { AuthData } from "@/features/auth/types/auth"
import { decodeJWT, isTokenExpired } from "@/utils/jwt"

export interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthState {
  auth: AuthData | null
  user: User | null
  _hasHydrated: boolean
  setAuth: (auth: AuthData | null) => void
  clearAuth: () => void
  setHasHydrated: (state: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      auth: null,
      user: null,
      _hasHydrated: false,
      setAuth: (auth) => {
        set({ auth })
        if (auth?.access_token) {
          const decoded = decodeJWT(auth.access_token)
          if (decoded) {
            const user: User = {
              id: decoded.sub || "",
              email: decoded.email || `usuario-${decoded.sub}@example.com`,
              name: decoded.name || decoded.sub || `Usuario ${decoded.role || 'Cliente'}`,
              role: decoded.role?.toLowerCase() || "cliente",
            }
            set({ user })
          }
        } else {
          set({ user: null })
        }
      },
      clearAuth: () => set({ auth: null, user: null }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "auth-storage",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        auth: state.auth,
        user: state.user,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Auth store hydration error:", error)
          return
        }

        // When rehydrating from localStorage, check if token is expired
        if (state?.auth?.access_token) {
          if (isTokenExpired(state.auth.access_token)) {
            // Token is expired, clear the state
            state.auth = null
            state.user = null
          } else {
            // Token is valid, ensure user info is decoded
            const decoded = decodeJWT(state.auth.access_token)
            if (decoded && !state.user) {
              state.user = {
                id: decoded.sub || "",
                email: decoded.email || `usuario-${decoded.sub}@example.com`,
                name: decoded.name || decoded.sub || `Usuario ${decoded.role || 'Cliente'}`,
                role: decoded.role?.toLowerCase() || "cliente",
              }
            }
          }
        }

        // Mark hydration as complete
        state?.setHasHydrated(true)
      },
    },
  ),
)
