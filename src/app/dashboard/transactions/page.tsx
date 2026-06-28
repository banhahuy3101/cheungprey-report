"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import ComingSoon from "@/components/ui/ComingSoon";
import {
  createTransaction,
  deleteTransaction,
  formatKHR,
  formatDate,
  listTransactions,
  updateTransaction,
} from "@/lib/data";
import type { Transaction, TransactionType, TransactionStatus, Category, Currency, PaymentMethod } from "@/lib/types";

const CATEGORIES: Category[] = ["operation", "salary", "marketing", "utility", "service", "other"];
const CATEGORY_LABELS: Record<Category, string> = {
  operation: "ប្រតិបត្តិការ",
  salary: "ប្រាក់ខែ",
  marketing: "ទីផ្សារ",
  utility: "ទឹកភ្លើង",
  service: "សេវាកម្ម",
  other: "ផ្សេងៗ",
};

const STATUS_LABELS: Record<TransactionStatus, string> = {
  pending: "កំពុងរង់ចាំ",
  completed: "បានបញ្ចប់",
  cancelled: "បានលុបចោល",
};

const TYPE_LABELS: Record<TransactionType, string> = {
  income: "ចំណូល",
  expense: "ចំណាយ",
};

export default function TransactionsPage() {
  const isComing = process.env.NODE_ENV !== "development" && process.env.NEXT_PUBLIC_IS_COMING === "true";
  if (isComing) return <ComingSoon />;

  const [items, setItems] = useState<Transaction[]>(() => listTransactions());
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    type: "expense" as TransactionType,
    category: "operation" as Category,
    amount: "",
    currency: "KHR" as Currency,
    description: "",
    date: new Date().toISOString().slice(0, 10),
    paymentMethod: "cash" as PaymentMethod,
    reference: "",
    status: "completed" as TransactionStatus,
    entityType: "district" as "district" | "commune",
    entityId: "district_101",
    createdBy: "",
  });

  const refresh = () => setItems(listTransactions());

  const onAdd = () => {
    setEditing(null);
    setForm({
      type: "expense",
      category: "operation",
      amount: "",
      currency: "KHR",
      description: "",
      date: new Date().toISOString().slice(0, 10),
      paymentMethod: "cash",
      reference: "",
      status: "completed",
      entityType: "district",
      entityId: "district_101",
      createdBy: "",
    });
    setOpen(true);
  };

  const onEdit = (t: Transaction) => {
    setEditing(t);
    setForm({
      type: t.type,
      category: t.category,
      amount: String(t.amount),
      currency: t.currency,
      description: t.description,
      date: t.date.slice(0, 10),
      paymentMethod: t.paymentMethod,
      reference: t.reference,
      status: t.status,
      entityType: t.entityType,
      entityId: t.entityId,
      createdBy: t.createdBy,
    });
    setOpen(true);
  };

  const onDelete = (t: Transaction) => {
    if (!confirm(`លុបប្រតិបត្តិការនេះ?`)) return;
    deleteTransaction(t.id);
    refresh();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!Number.isFinite(amount) || amount <= 0) return;
    if (editing) {
      updateTransaction(editing.id, {
        ...form,
        amount,
        date: new Date(form.date).toISOString(),
      });
    } else {
      createTransaction({
        ...form,
        amount,
        date: new Date(form.date).toISOString(),
      });
    }
    setOpen(false);
    refresh();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>ប្រតិបត្តិការ</CardTitle>
            <Button onClick={onAdd}><Plus size={16} /> បន្ថែមប្រតិបត្តិការ</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">កាលបរិច្ឆេទ</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">ប្រភេទ</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">ចំណាត់ថ្នាក់</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">បរិយាយ</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-slate-500">ទឹកប្រាក់</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">ស្ថានភាព</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-slate-500">សកម្មភាព</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {items.map((t) => (
                  <tr key={t.id}>
                    <td className="px-4 py-4 text-sm text-slate-700">{formatDate(t.date)}</td>
                    <td className="px-4 py-4 text-sm">
                      <Badge variant={t.type === "income" ? "success" : "danger"}>
                        {TYPE_LABELS[t.type]}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">{CATEGORY_LABELS[t.category]}</td>
                    <td className="px-4 py-4 text-sm text-slate-700 max-w-xs truncate">{t.description}</td>
                    <td className="px-4 py-4 text-sm text-right font-medium">
                      <span className={t.type === "income" ? "text-emerald-700" : "text-red-700"}>
                        {t.type === "income" ? "+" : "-"}{formatKHR(t.amount)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <Badge variant={t.status === "completed" ? "success" : t.status === "pending" ? "warning" : "default"}>
                        {STATUS_LABELS[t.status]}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-right text-sm">
                      <div className="flex justify-end gap-1">
                        <Button size="sm" variant="ghost" onClick={() => onEdit(t)}><Pencil size={14} /></Button>
                        <Button size="sm" variant="ghost" className="text-red-600" onClick={() => onDelete(t)}><Trash2 size={14} /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-500">
                      មិនទាន់មានប្រតិបត្តិការ
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "កែសម្រួលប្រតិបត្តិការ" : "បន្ថែមប្រតិបត្តិការ"}
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>បោះបង់</Button>
            <Button onClick={onSubmit}>{editing ? "រក្សាទុក" : "បង្កើត"}</Button>
          </>
        }
      >
        <form className="space-y-3" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label required>ប្រភេទ</Label>
              <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as TransactionType })}>
                <option value="expense">{TYPE_LABELS.expense}</option>
                <option value="income">{TYPE_LABELS.income}</option>
              </Select>
            </div>
            <div>
              <Label required>ចំណាត់ថ្នាក់</Label>
              <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label required>ទឹកប្រាក់</Label>
              <Input type="number" min="0" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
            </div>
            <div>
              <Label>រូបិយប័ណ្ណ</Label>
              <Select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value as Currency })}>
                <option value="KHR">KHR</option>
                <option value="USD">USD</option>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label required>កាលបរិច្ឆេទ</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div>
              <Label>វិធីបង់ប្រាក់</Label>
              <Select value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value as PaymentMethod })}>
                <option value="cash">សាច់ប្រាក់</option>
                <option value="bank_transfer">ផ្ទេរតាមធនាគារ</option>
                <option value="ABA_KHQR">ABA KHQR</option>
              </Select>
            </div>
          </div>
          <div>
            <Label>បរិយាយ</Label>
            <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>ឯកសារយោង</Label>
              <Input value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })} />
            </div>
            <div>
              <Label>ស្ថានភាព</Label>
              <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as TransactionStatus })}>
                <option value="completed">{STATUS_LABELS.completed}</option>
                <option value="pending">{STATUS_LABELS.pending}</option>
                <option value="cancelled">{STATUS_LABELS.cancelled}</option>
              </Select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
