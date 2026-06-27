"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { listAuditLogs, formatDate } from "@/lib/data";
import type { AuditLog } from "@/lib/types";
import ComingSoon from "@/components/ui/ComingSoon";
import { RefreshCw } from "lucide-react";

const ACTION_LABEL: Record<string, string> = {
  create: "បង្កើត",
  update: "កែប្រែ",
  delete: "លុប",
  approve: "អនុម័ត",
  reject: "បដិសេធ",
  submit: "ដាក់ស្នើ",
  login: "ចូលប្រើ",
};

const ACTION_VARIANT: Record<string, "success" | "danger" | "info" | "warning" | "default"> = {
  create: "success",
  delete: "danger",
  update: "info",
  approve: "success",
  reject: "danger",
  submit: "warning",
  login: "default",
};

export default function AuditPage() {
  const isComing = process.env.NEXT_PUBLIC_IS_COMING === "true";
  if (isComing) return <ComingSoon />;

  const [logs, setLogs] = useState<AuditLog[]>(() => listAuditLogs());

  const refresh = () => setLogs(listAuditLogs());

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>កំណត់ត្រាសកម្មភាព (Audit Log)</CardTitle>
            <Button size="sm" variant="outline" onClick={refresh}><RefreshCw size={14} /> ធ្វើឱ្យស្រស់</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <THead>
              <TR><TH>ពេលវេលា</TH><TH>សកម្មភាព</TH><TH>បណ្ដុំ</TH><TH>ឯកសារ ID</TH><TH>អ្នកប្រើ</TH></TR>
            </THead>
            <TBody>
              {logs.map((log) => (
                <TR key={log.id}>
                  <TD className="text-slate-500 text-xs">{formatDate(log.timestamp)}</TD>
                  <TD><Badge variant={ACTION_VARIANT[log.action] ?? "default"}>{ACTION_LABEL[log.action] ?? log.action}</Badge></TD>
                  <TD>{log.collection}</TD>
                  <TD className="text-xs font-mono text-slate-500">{log.documentId}</TD>
                  <TD>{log.userId}</TD>
                </TR>
              ))}
              {logs.length === 0 && (
                <TR><TD colSpan={5} className="text-center text-slate-500 py-8">គ្មានកំណត់ត្រា</TD></TR>
              )}
            </TBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}