import { NextResponse } from "next/server";
import { createServiceClient } from "@/utils/supabase/service-client";
import { createClient } from "@/utils/supabase/server";

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
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { email, password, name, role, districtId, communeId } = body;

  if (!email || !password || !name || !role) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data: authData, error: authError } = await serviceClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError) return NextResponse.json({ error: authError.message }, { status: 400 });
  if (!authData.user) return NextResponse.json({ error: "Failed to create auth user" }, { status: 500 });

  const { data: profile, error: profileError } = await serviceClient
    .from("profiles")
    .insert({
      id: authData.user.id,
      email,
      name,
      role,
      district_id: districtId ?? "",
      commune_id: communeId ?? null,
    })
    .select()
    .single();

  if (profileError) {
    await serviceClient.auth.admin.deleteUser(authData.user.id);
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json(profile);
}

export async function PATCH(request: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { id, email, name, role, districtId, communeId } = body;

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { data, error } = await serviceClient
    .from("profiles")
    .update({
      ...(email !== undefined && { email }),
      ...(name !== undefined && { name }),
      ...(role !== undefined && { role }),
      ...(districtId !== undefined && { district_id: districtId }),
      ...(communeId !== undefined && { commune_id: communeId || null }),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error: profileError } = await serviceClient.from("profiles").delete().eq("id", id);
  if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 });

  const { error: authError } = await serviceClient.auth.admin.deleteUser(id);
  if (authError) return NextResponse.json({ error: authError.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
