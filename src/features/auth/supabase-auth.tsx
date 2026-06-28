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
import type { PermissionFlag } from "@/lib/data";

// Default fallback permissions used when Supabase data hasn't loaded yet.
// These match the original hardcoded map so the app still works without the DB.
const DEFAULT_PERMS: Record<string, Record<string, boolean>> = {
  super_admin: {
    canWriteTransaction: true, canReadTransactions: true, canWriteBudget: true,
    canExportPdf: true, canManageUsers: true, canDownloadReceipt: true,
    canApproveTransaction: true, canSendToProvince: true, canManageSystem: true,
    canViewEvaluation: true, canCreateEvaluation: true, canEditEvaluation: true, canDeleteEvaluation: true,
  },
  district_chief: {
    canWriteTransaction: true, canReadTransactions: true, canWriteBudget: true,
    canExportPdf: true, canManageUsers: true, canDownloadReceipt: true,
    canApproveTransaction: true, canSendToProvince: true, canManageSystem: false,
    canViewEvaluation: true, canCreateEvaluation: true, canEditEvaluation: true, canDeleteEvaluation: true,
  },
  district_admin: {
    canWriteTransaction: true, canReadTransactions: true, canWriteBudget: true,
    canExportPdf: true, canManageUsers: true, canDownloadReceipt: true,
    canApproveTransaction: true, canSendToProvince: false, canManageSystem: false,
    canViewEvaluation: true, canCreateEvaluation: true, canEditEvaluation: true, canDeleteEvaluation: true,
  },
  commune_chief: {
    canWriteTransaction: true, canReadTransactions: true, canWriteBudget: true,
    canExportPdf: true, canManageUsers: false, canDownloadReceipt: true,
    canApproveTransaction: true, canSendToProvince: false, canManageSystem: false,
    canViewEvaluation: true, canCreateEvaluation: true, canEditEvaluation: true, canDeleteEvaluation: false,
  },
  commune_staff: {
    canWriteTransaction: true, canReadTransactions: true, canWriteBudget: false,
    canExportPdf: false, canManageUsers: false, canDownloadReceipt: true,
    canApproveTransaction: false, canSendToProvince: false, canManageSystem: false,
    canViewEvaluation: true, canCreateEvaluation: true, canEditEvaluation: false, canDeleteEvaluation: false,
  },
  finance_viewer: {
    canWriteTransaction: false, canReadTransactions: true, canWriteBudget: false,
    canExportPdf: true, canManageUsers: false, canDownloadReceipt: false,
    canApproveTransaction: false, canSendToProvince: false, canManageSystem: false,
    canViewEvaluation: true, canCreateEvaluation: false, canEditEvaluation: false, canDeleteEvaluation: false,
  },
};

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  setupAdmin: (email: string, password: string) => Promise<{ id: string; email: string }>;
  logout: () => Promise<void>;
  can: (action: PermissionFlag) => boolean;
  role: UserRole | undefined;
  refreshPermissions: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ROLE_COOKIE = "finance-role";

async function fetchRoles(supabase: ReturnType<typeof createClient>, userId: string): Promise<UserRole[]> {
  try {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    if (data && data.length > 0) {
      return data.map((r) => r.role as UserRole);
    }
  } catch { /* ignore */ }
  return [];
}

async function fetchProfile(supabase: ReturnType<typeof createClient>, email: string): Promise<User | null> {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (data) {
    const roles = await fetchRoles(supabase, data.id);
    const role = data.role as UserRole;
    // Ensure the profile.role is included in roles list
    if (roles.length === 0 && role) roles.push(role);
    return {
      uid: data.id,
      id: data.id,
      email: data.email,
      name: data.name,
      displayName: data.name,
      role,
      roles,
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

const ALL_ROLES: UserRole[] = [
  "super_admin", "district_chief", "district_admin",
  "commune_chief", "commune_staff", "finance_viewer",
];

async function fetchPermissions(supabase: ReturnType<typeof createClient>, userId: string): Promise<Record<string, boolean> | null> {
  try {
    const { data } = await supabase.rpc("get_user_permissions", { user_id: userId });
    return data as Record<string, boolean> | null;
  } catch {
    return null;
  }
}

export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userPerms, setUserPerms] = useState<Record<string, boolean> | null>(null);
  const supabase = createClient();

  const loadPermissions = useCallback(async (userId: string) => {
    const perms = await fetchPermissions(supabase, userId);
    if (perms) setUserPerms(perms);
  }, [supabase]);

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
      roles: ["super_admin"],
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

  useEffect(() => {
    if (user) {
      loadPermissions(user.id);
    }
  }, [user, loadPermissions]);

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
      roles: ["super_admin"],
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
      roles: ["super_admin"],
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
    setUserPerms(null);
  }, [supabase]);

  const can = useCallback(
    (action: PermissionFlag) => {
      if (!user) return false;
      if (userPerms?.[action] !== undefined) return userPerms[action];
      const roleList = user.roles && user.roles.length > 0 ? user.roles : [user.role];
      return roleList.some((r) => DEFAULT_PERMS[r]?.[action]) ?? false;
    },
    [user, userPerms],
  );

  const refreshPermissions = useCallback(async () => {
    if (!user) return;
    const perms = await fetchPermissions(supabase, user.id);
    if (perms) setUserPerms(perms);
    const roles = await fetchRoles(supabase, user.id);
    if (roles.length > 0) {
      setUser((prev) => (prev ? { ...prev, roles } : prev));
    }
  }, [user, supabase]);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      setupAdmin,
      logout,
      can,
      role: user?.role,
      refreshPermissions,
    }),
    [user, loading, login, setupAdmin, logout, can, refreshPermissions],
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
