"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/utils/supabase/client";
import type { User, UserRole } from "@/lib/types";
import { PERMISSIONS, type PermissionFlag } from "@/lib/data";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  setupAdmin: (email: string, password: string) => Promise<{ id: string; email: string }>;
  logout: () => Promise<void>;
  can: (action: PermissionFlag) => boolean;
  role: UserRole | undefined;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ROLE_COOKIE = "finance-role";

async function fetchProfile(supabase: ReturnType<typeof createClient>, email: string): Promise<User | null> {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (data) {
    return {
      uid: data.id,
      id: data.id,
      email: data.email,
      name: data.name,
      displayName: data.name,
      role: data.role as UserRole,
      districtId: data.district_id ?? "",
      communeId: data.commune_id ?? null,
      status: "active",
      createdAt: data.created_at ?? new Date().toISOString(),
    };
  }
  return null;
}

function setRoleCookie(role: UserRole) {
  try {
    document.cookie = `${ROLE_COOKIE}=${encodeURIComponent(role)}; path=/; max-age=86400; SameSite=Lax`;
  } catch {
    // ignore
  }
}

function clearRoleCookie() {
  try {
    document.cookie = `${ROLE_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
  } catch {
    // ignore
  }
}

export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const resolveUser = useCallback(async (authUser: { id: string; email?: string | null }) => {
    const email = authUser.email ?? "";
    const profile = await fetchProfile(supabase, email);
    if (profile) {
      setUser(profile);
      setRoleCookie(profile.role);
      return;
    }
    const fallback: User = {
      uid: authUser.id,
      id: authUser.id,
      email: email,
      name: email,
      displayName: email,
      role: "super_admin",
      districtId: "",
      communeId: null,
      status: "active",
      createdAt: new Date().toISOString(),
    };
    setUser(fallback);
    setRoleCookie(fallback.role);
  }, [supabase]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await resolveUser(session.user);
        } else {
          setUser(null);
          clearRoleCookie();
        }
        setLoading(false);
      },
    );

    return () => subscription.unsubscribe();
  }, [supabase, resolveUser]);

  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    if (!data.user) return null;

    const profile = await fetchProfile(supabase, email);
    if (profile) {
      setUser(profile);
      setRoleCookie(profile.role);
      return profile;
    }

    // No profile yet — create a minimal user from auth data
    const fallback: User = {
      uid: data.user.id,
      id: data.user.id,
      email: data.user.email ?? email,
      name: data.user.email ?? email,
      displayName: data.user.email ?? email,
      role: "super_admin",
      districtId: "",
      communeId: null,
      status: "active",
      createdAt: new Date().toISOString(),
    };
    setUser(fallback);
    setRoleCookie(fallback.role);
    return fallback;
  }, [supabase]);

  const setupAdmin = useCallback(async (adminEmail: string, adminPassword: string) => {
    // Step 1: signUp creates user with correct GoTrue password hash
    const { error: signUpError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
    });
    if (signUpError && !signUpError.message.includes("already registered")) {
      throw new Error(signUpError.message);
    }

    // Step 2: ensure profile exists
    await supabase.rpc("ensure_profile", { profile_email: adminEmail });

    // Step 4: login
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });
    if (loginError) throw new Error(loginError.message);
    if (!loginData.user) throw new Error("Login failed after creating user");

    const appUser: User = {
      uid: loginData.user.id,
      id: loginData.user.id,
      email: loginData.user.email ?? adminEmail,
      name: loginData.user.email ?? adminEmail,
      displayName: loginData.user.email ?? adminEmail,
      role: "super_admin",
      districtId: "",
      communeId: null,
      status: "active",
      createdAt: new Date().toISOString(),
    };
    setUser(appUser);
    setRoleCookie(appUser.role);
    return { id: loginData.user.id, email: loginData.user.email ?? "" };
  }, [supabase]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    clearRoleCookie();
  }, [supabase]);

  const can = useCallback(
    (action: PermissionFlag) => {
      if (!user) return false;
      return PERMISSIONS[user.role]?.[action] ?? false;
    },
    [user],
  );

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      setupAdmin,
      logout,
      can,
      role: user?.role,
    }),
    [user, loading, login, setupAdmin, logout, can],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside SupabaseAuthProvider");
  return ctx;
}

export function roleLabel(role: UserRole): string {
  switch (role) {
    case "super_admin":
      return "Super Admin";
    case "district_chief":
      return "ប្រធានបក្សស្រុក (District Chief)";
    case "district_admin":
      return "មន្ត្រីរដ្ឋបាលស្រុក (District Admin)";
    case "commune_chief":
      return "ប្រធានបក្សឃុំ (Commune Chief)";
    case "commune_staff":
      return "សមាជិកបក្សឃុំ (Commune Staff)";
    case "finance_viewer":
      return "Finance Viewer";
    default:
      return role;
  }
}

export function roleShortLabel(role: UserRole): string {
  switch (role) {
    case "super_admin":
      return "Super";
    case "district_chief":
      return "D. Chief";
    case "district_admin":
      return "D. Admin";
    case "commune_chief":
      return "C. Chief";
    case "commune_staff":
      return "C. Staff";
    case "finance_viewer":
      return "F. Viewer";
  }
}
