import { useCallback, useEffect, useState } from "react";
import {
  type BackendSession,
  type BackendUser,
  getCurrentUser,
  logoutEmpresa,
} from "@/lib/api/client";

function canAccessLeadAdmin(user: BackendUser | null) {
  if (!user) return false;
  const role = user.role?.toLowerCase();
  return Boolean(
    role &&
      [
        "empresa",
        "admin",
        "superadmin",
        "super_admin",
        "empresa_admin",
        "empresa_operador",
        "empresa_soporte",
        "empresa_financiero",
      ].includes(role),
  );
}

export function useAuth() {
  const [user, setUser] = useState<BackendUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const current = await getCurrentUser();
      setUser(current);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const signOut = useCallback(async () => {
    try {
      await logoutEmpresa();
    } finally {
      setUser(null);
    }
  }, []);

  const session: BackendSession | null = user ? { user } : null;

  return {
    session,
    user,
    isAdmin: canAccessLeadAdmin(user),
    loading,
    refresh,
    signOut,
  };
}
