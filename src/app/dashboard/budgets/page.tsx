"use client";

import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";
import { useAuth } from "@/lib/supabase-auth";
import { createBudget, formatKHR, listBudgets, updateBudget, getBudgetActualSpent } from "@/lib/data";
import type { Budget, Category } from "@/lib/types";

const CATEGORIES: Category[] = ["operation", "salary", "marketing", "utility", "service", "other"];
const CATEGORY_LABELS: Record<Category, string> = { operation: "ប្រតិបត្តិការ", salary: "ប្រាក់ខែ", marketing: "ទីផ្សារ", utility: "ទឹកភ្លើង", service: "សេវាកម្ម", other: "ផ្សេងៗ" };

export default function BudgetsPage() {
  const { can } = useAuth();
  const [items, setItems] = useState<(Budget & { spent: number; remaining: number; pct: number })[]>(() =>
    listBudgets().map((b) => {
      const spent = getBudgetActualSpent(b);
      return { ...b, spent, remaining: b.allocatedAmount - spent, pct: b.allocatedAmount > 0 ? (spent / b.allocatedAmount) * 100 : 0 };
    })
  );
  const [editing, setEditing] = useState<Budget | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ category: "operation" as Category, allocatedAmount: "", year: "2026", month: "6" });

  const refresh = () => setItems(
    listBudgets().map((b) => {
      const spent = getBudgetActualSpent(b);
      return { ...b, spent, remaining: b.allocatedAmount - spent, pct: b.allocatedAmount > 0 ? (spent / b.allocatedAmount) * 100 : 0 };
    })
  );

  const onAdd = () => {
    setEditing(null);
    setForm({ category: "operation", allocatedAmount: "", year: "2026", month: "6" });
    setOpen(true);
  };

  const onEdit = (b: Budget) => {
    setEditing(b);
    setForm({ category: b.category, allocatedAmount: String(b.allocatedAmount), year: String(b.year), month: b.month ? String(b.month) : "" });
    setOpen(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(form.allocatedAmount);
    if (!Number.isFinite(amount) || amount <= 0) return;
    const year = Number(form.year);
    const month = form.month ? Number(form.month) : null;
    if (editing) {
      updateBudget(editing.id, { category: form.category, allocatedAmount: amount, year, month });
    } else {
      createBudget({ category: form.category, allocatedAmount: amount, year, month, entityType: "district", entityId: "district_101" });
    }
    setOpen(false);
    refresh();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>ថវិការ</CardTitle>
            {can("canWriteBudget") && <Button onClick={onAdd}><Plus size={16} /> បន្ថែមថវិកា</Button>}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <THead>
              <TR><TH>ប្រភេទ</TH><TH>ឆ្នាំ</TH><TH>ខែ</TH><TH className="text-right">ថវិការ</TH><TH className="text-right">ចំណាយ</TH><TH className="text-right">នៅសល់</TH><TH>ការប្រើប្រាស់</TH><TH></TH></TR>
            </THead>
            <TBody>
              {items.map((b) => (
                <TR key={b.id}>
                  <TD className="font-medium">{CATEGORY_LABELS[b.category]}</TD>
                  <TD>{b.year}</TD>
                  <TD>{b.month ? `ខែ ${b.month}` : "ប្រចាំឆ្នាំ"}</TD>
                  <TD className="text-right">{formatKHR(b.allocatedAmount)}</TD>
                  <TD className="text-right">{formatKHR(b.spent)}</TD>
                  <TD className={`text-right font-medium ${b.remaining < 0 ? "text-red-600" : "text-emerald-700"}`}>{formatKHR(b.remaining)}</TD>
                  <TD>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 bg-slate-100 rounded overflow-hidden">
                        <div className={`h-full rounded ${b.pct > 100 ? "bg-red-500" : b.pct > 80 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${Math.min(100, b.pct)}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{Math.round(b.pct)}%</span>
                    </div>
                  </TD>
                  <TD>
                    {can("canWriteBudget") && (
                      <Button size="sm" variant="ghost" onClick={() => onEdit(b)}><Pencil size={14} /></Button>
                    )}
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "កែសម្រួលថវិកា" : "បន្ថែមថវិកា"}
        footer={<><Button variant="outline" onClick={() => setOpen(false)}>បោះបង់</Button><Button onClick={onSubmit}>{editing ? "រក្សាទុក" : "បង្កើត"}</Button></>}
      >
        <form className="space-y-3" onSubmit={onSubmit}>
          <Label required>ប្រភេទ</Label>
          <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
          </Select>
          <Label required>ទឹកប្រាក់</Label>
          <Input type="number" min="0" value={form.allocatedAmount} onChange={(e) => setForm({ ...form, allocatedAmount: e.target.value })} required />
          <div className="grid grid-cols-2 gap-2">
            <div><Label>ឆ្នាំ</Label><Input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} /></div>
            <div><Label>ខែ (ទុកចោល=ប្រចាំឆ្នាំ)</Label><Input value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} /></div>
          </div>
        </form>
      </Modal>
    </div>
  );
}