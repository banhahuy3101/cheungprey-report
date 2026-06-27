"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { useAuth, roleLabel } from "@/lib/supabase-auth";
import { rolesAssignableBy } from "@/lib/data";
import type { User, UserRole } from "@/lib/types";

type ProfileRow = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  district_id: string;
  commune_id: string | null;
  created_at: string;
};

function profileToUser(p: ProfileRow): User {
  return {
    uid: p.id,
    id: p.id,
    email: p.email,
    name: p.name,
    displayName: p.name,
    role: p.role,
    districtId: p.district_id,
    communeId: p.commune_id,
    status: "active",
    createdAt: p.created_at,
  };
}

const DEFAULT_PASSWORD = "user1234";

export default function UsersPage() {
  const { user: currentUser, can, role } = useAuth();
  const [items, setItems] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<{ email: string; password: string; name: string; role: UserRole; districtId: string; communeId: string }>({ email: "", password: DEFAULT_PASSWORD, name: "", role: "commune_chief", districtId: "district_101", communeId: "" });
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch");
      const data: ProfileRow[] = await res.json();
      setItems(data.map(profileToUser));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const assignableRoles = role ? rolesAssignableBy(role) : [];

  const onAdd = () => {
    setEditing(null);
    setForm({ email: "", password: DEFAULT_PASSWORD, name: "", role: "commune_chief", districtId: currentUser?.districtId ?? "district_101", communeId: "" });
    setError(null);
    setOpen(true);
  };

  const onEdit = (u: User) => {
    setEditing(u);
    setForm({ email: u.email, password: DEFAULT_PASSWORD, name: u.displayName, role: u.role, districtId: u.districtId, communeId: u.communeId ?? "" });
    setError(null);
    setOpen(true);
  };

  const onDelete = async (u: User) => {
    if (!confirm(`លុបអ្នកប្រើ "${u.displayName}"?`)) return;
    try {
      const res = await fetch(`/api/users?id=${u.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.email.trim() || !form.name.trim()) {
      setError("សូមបញ្ចូលអ៊ីមែល និងឈ្មោះ");
      return;
    }
    if (!assignableRoles.includes(form.role) && currentUser?.role !== "super_admin") {
      setError("អ្នកមិនមានសិទ្ធិកំណត់តួនាទីនេះទេ");
      return;
    }
    setSubmitting(true);
    try {
      if (editing) {
        const res = await fetch("/api/users", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editing.id,
            email: form.email,
            name: form.name,
            role: form.role,
            districtId: form.districtId,
            communeId: form.communeId || null,
          }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Update failed");
        }
      } else {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            name: form.name,
            role: form.role,
            districtId: form.districtId,
            communeId: form.communeId || null,
          }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Create failed");
        }
      }
      setOpen(false);
      fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Operation failed");
    }
    setSubmitting(false);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>អ្នកប្រើប្រាស់</CardTitle>
            {(can("canManageUsers") || currentUser?.role === "super_admin") && (
              <Button onClick={onAdd}><Plus size={16} /> បន្ថែមអ្នកប្រើ</Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              កំពុងផ្ទុក...
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              មិនទាន់មានអ្នកប្រើប្រាស់ទេ។
            </div>
          ) : (
            <Table>
              <THead>
                <TR><TH>អ៊ីមែល</TH><TH>ឈ្មោះ</TH><TH>តួនាទី</TH><TH>ស្រុក</TH><TH>ឃុំ</TH><TH>ស្ថានភាព</TH><TH></TH></TR>
              </THead>
              <TBody>
                {items.map((u) => (
                  <TR key={u.id}>
                    <TD>{u.email}</TD>
                    <TD>{u.displayName}</TD>
                    <TD><Badge variant="info">{roleLabel(u.role)}</Badge></TD>
                    <TD>{u.districtId}</TD>
                    <TD>{u.communeId || "—"}</TD>
                    <TD><Badge variant={u.status === "active" ? "success" : "default"}>{u.status}</Badge></TD>
                    <TD>
                      {(can("canManageUsers") || currentUser?.role === "super_admin") && (
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => onEdit(u)}><Pencil size={14} /></Button>
                          <Button size="sm" variant="ghost" className="text-red-600" onClick={() => onDelete(u)}><Trash2 size={14} /></Button>
                        </div>
                      )}
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "កែសម្រួលអ្នកប្រើ" : "បន្ថែមអ្នកប្រើ"}
        footer={<><Button variant="outline" onClick={() => setOpen(false)}>បោះបង់</Button><Button onClick={onSubmit} disabled={submitting}>{submitting ? "កំពុងដំណើរការ..." : editing ? "រក្សាទុក" : "បង្កើត"}</Button></>}
      >
        <form className="space-y-3" onSubmit={onSubmit}>
          <Label htmlFor="email" required>អ៊ីមែល</Label>
          <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          {!editing && (
            <>
              <Label htmlFor="password" required>ពាក្យសម្ងាត់</Label>
              <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </>
          )}
          <Label htmlFor="name" required>ឈ្មោះ</Label>
          <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Label htmlFor="role" required>តួនាទី</Label>
          <Select id="role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}>
            {(currentUser?.role === "super_admin" ? (["super_admin", "district_chief", "district_admin", "commune_chief", "commune_staff", "finance_viewer"] as UserRole[]) : assignableRoles).map((r) => (
              <option key={r} value={r}>{roleLabel(r)}</option>
            ))}
          </Select>
          <Label htmlFor="districtId">ស្រុក ID</Label>
          <Input id="districtId" value={form.districtId} onChange={(e) => setForm({ ...form, districtId: e.target.value })} />
          <Label htmlFor="communeId">ឃុំ ID (សម្រាប់តួនាទីឃុំ)</Label>
          <Input id="communeId" value={form.communeId} onChange={(e) => setForm({ ...form, communeId: e.target.value })} />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </Modal>
    </div>
  );
}