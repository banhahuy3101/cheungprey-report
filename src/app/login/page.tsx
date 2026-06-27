"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/supabase-auth";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";
import { FileText } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("super.admin@company.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const { login, setupAdmin, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const result = await login(email.trim(), password);
        if (!result) {
          setError("អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។");
        } else {
          router.replace("/dashboard");
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "ការចូលប្រើប្រាស់មិនជោគជ័យ។");
      }
    });
  };

  const onCreateAdmin = () => {
    startTransition(async () => {
      try {
        setError(null);
        await setupAdmin(email.trim(), password);
        // If user was set (session from signUp), redirect; otherwise show message
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "";
        if (msg.includes("rate limit") || msg.includes("already registered")) {
          setError(msg);
        } else {
          setError("បង្កើតអ្នកប្រើមិនជោគជ័យ។ សូមបង្កើតក្នុង Supabase Dashboard។");
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 text-blue-700">
            <FileText size={32} />
            <span className="text-xl font-bold">District Report System</span>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ចូលប្រើប្រាស់ប្រព័ន្ធ</CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              សូមបញ្ចូលអ៊ីមែល និងពាក្យសម្ងាត់
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" required>អ៊ីមែល</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" required>ពាក្យសម្ងាត់</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && (
                <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                  {error}
                  {error.includes("Invalid login credentials") && (
                    <button
                      type="button"
                      onClick={onCreateAdmin}
                      disabled={pending}
                      className="mt-2 block w-full rounded-md bg-blue-600 px-3 py-1.5 text-xs text-white hover:bg-blue-700"
                    >
                      {pending ? "កំពុងបង្កើត..." : "បង្កើតអ្នកប្រើ super admin"}
                    </button>
                  )}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "កំពុងចូល..." : "ចូលប្រើប្រាស់"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={onCreateAdmin}
                disabled={pending}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                មិនទាន់មានអ្នកប្រើ? ចុចបង្កើត super admin
              </button>
            </div>
          </CardContent>
        </Card>
        <p className="text-center text-xs text-slate-500 mt-4">
          © 2026 District Monthly Report System
        </p>
      </div>
    </div>
  );
}
