import { NextResponse } from "next/server";
import { createServiceClient } from "@/utils/supabase/service-client";
import { createClient } from "@/utils/supabase/server";

const serviceClient = createServiceClient();

async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function GET(request: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id");

  if (!userId) return NextResponse.json({ error: "Missing user_id" }, { status: 400 });

  const { data, error } = await serviceClient
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data?.map((r) => r.role) ?? []);
}

export async function POST(request: Request) {
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
  const { user_id, roles } = body as { user_id: string; roles: string[] };

  if (!user_id || !Array.isArray(roles)) {
    return NextResponse.json({ error: "Missing user_id or roles array" }, { status: 400 });
  }

  // Replace all roles for this user in a transaction
  const { error: delError } = await serviceClient
    .from("user_roles")
    .delete()
    .eq("user_id", user_id);

  if (delError) return NextResponse.json({ error: delError.message }, { status: 500 });

  if (roles.length > 0) {
    const rows = roles.map((role) => ({ user_id: user_id, role }));
    const { error: insError } = await serviceClient
      .from("user_roles")
      .insert(rows);

    if (insError) return NextResponse.json({ error: insError.message }, { status: 500 });
  }

  // Also update profiles.role to the highest-level role (last match = highest)
  const ORDER: string[] = [
    "finance_viewer", "commune_staff", "commune_chief",
    "district_admin", "district_chief", "super_admin",
  ];
  let primaryRole = roles[0] ?? "";
  for (const r of ORDER) {
    if (roles.includes(r)) primaryRole = r;
  }
  if (primaryRole) {
    await serviceClient.from("profiles").update({ role: primaryRole }).eq("id", user_id);
  }

  return NextResponse.json({ success: true, roles });
}
