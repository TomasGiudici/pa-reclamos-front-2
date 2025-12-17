"use client";

import { useAuthStore } from "@/stores/auth";

export function useAuth() {
  const { auth, user, clearAuth, _hasHydrated } = useAuthStore();

  const logout = () => {
    clearAuth();
    // Note: Auth data is now automatically cleared from localStorage by the store
  };

  return {
    user,
    token: auth?.access_token,
    isAuthenticated: !!auth && !!user,
    hasHydrated: _hasHydrated,
    logout,
  };
}
