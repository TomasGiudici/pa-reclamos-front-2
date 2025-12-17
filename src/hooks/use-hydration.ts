"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth";

/**
 * Custom hook to check if the auth store has finished hydrating from localStorage
 * Based on Zustand persist middleware documentation
 */
export function useHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Note: This is just in case you want to take into account manual rehydration.
    // You can remove the following line if you don't need it.
    const unsubHydrate = useAuthStore.persist.onHydrate(() => setHydrated(false));

    const unsubFinishHydration = useAuthStore.persist.onFinishHydration(() => setHydrated(true));

    setHydrated(useAuthStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
}

