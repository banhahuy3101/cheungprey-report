import { NextResponse } from "next/server";
import { createServiceClient } from "@/utils/supabase/service-client";
import { createClient } from "@/utils/supabase/server";
import { PERMISSIONS, type PermissionFlag } from "@/lib/data";
import type { UserRole } from "@/lib/types";

const ALL_ROLES: UserRole[] = [
  "super_admin", "district_chief", "district_admin",
  "commune_chief", "commune_staff", "finance_viewer",
];

const serviceClient = createServiceClient();

async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await serviceClient
    .from("role_permissions")
    .select("*");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const dbMap = new Map<string, Record<string, boolean>>();
  for (const row of data) {
    dbMap.set(row.role, row.permissions as Record<string, boolean>);
  }

  const result = ALL_ROLES.map((role) => ({
    role,
    permissions: dbMap.get(role) ?? PERMISSIONS[role],
  }));

  return NextResponse.json(result);
}

export async function PUT(request: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await serviceClient
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "super_admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { role, permissions } = body;

  if (!role || !permissions) {
    return NextResponse.json({ error: "Missing role or permissions" }, { status: 400 });
  }

  const { error } = await serviceClient
    .from("role_permissions")
    .upsert({ role, permissions }, { onConflict: "role" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
