"use client";

import { useMemo } from "react";
import { useAuth } from "@/lib/supabase-auth";
import { ROLE_LEVEL } from "@/lib/types";
import type { User, UserRole, ReportStatus } from "@/lib/types";

// ─── Resource & action type definitions ──────────────────────

export type Resource =
  | "commune_report"
  | "district_report"
  | "transaction"
  | "budget"
  | "user"
  | "finance_summary"
  | "audit_log"
  | "notification"
  | "system_config";

export type Action =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "submit"
  | "approve"
  | "reject"
  | "finalize"
  | "send_to_province";

/** Contextual information needed to make a permission decision. */
export interface PermissionContext {
  communeId?: string;
  districtId?: string;
  entityType?: "commune" | "district";
  entityId?: string;
  status?: ReportStatus;
  transactionStatus?: string;
}

// ─── Permission evaluation engine ────────────────────────────

/**
 * Evaluate whether `user` can perform `action` on `resource` given
 * the supplied `context`.
 *
 * Rules are documented in detail in docs/business.txt section 4.
 */
export function canAccess(
  user: User | null,
  action: Action,
  resource: Resource,
  context: Omit<PermissionContext, "user"> = {}
): boolean {
  if (!user) return false;

  const { role, districtId, communeId } = user;
  const level = ROLE_LEVEL[role];

  // Super admin can do everything
  if (role === "super_admin") return true;

  switch (resource) {
    // ── Commune Monthly Reports ──────────────────────────
    case "commune_report": {
      const rDistrict = context.districtId ?? context.entityId;
      const rCommune = context.communeId ?? context.entityId;
      const rStatus = context.status;

      if (action === "create") {
        return role === "commune_chief" || role === "commune_staff";
      }
      if (action === "read") {
        return (
          ((role === "commune_chief" || role === "commune_staff" || role === "finance_viewer") &&
            rCommune === communeId) ||
          ((role === "district_admin" || role === "district_chief") && rDistrict === districtId)
        );
      }
      if (action === "update") {
        return (
          (role === "commune_chief" || role === "commune_staff") &&
          rCommune === communeId &&
          rStatus === "draft"
        );
      }
      if (action === "submit") {
        return (
          role === "commune_chief" && rCommune === communeId && rStatus === "draft"
        );
      }
      if (action === "approve" || action === "reject") {
        return (
          (role === "district_admin" || role === "district_chief") &&
          rDistrict === districtId &&
          rStatus === "submitted"
        );
      }
      return false;
    }

    // ── District Monthly Reports ─────────────────────────
    case "district_report": {
      const dDistrict = context.districtId ?? context.entityId;
      const dStatus = context.status;

      if (action === "create") return role === "district_admin" || role === "district_chief";
      if (action === "read") return level >= ROLE_LEVEL.commune_chief && dDistrict === districtId;
      if (action === "update") {
        return (
          (role === "district_admin" || role === "district_chief") &&
          dDistrict === districtId &&
          dStatus !== "sent_to_province"
        );
      }
      if (action === "finalize") return role === "district_chief" && dDistrict === districtId;
      if (action === "send_to_province") return role === "district_chief" && dDistrict === districtId;
      return false;
    }

    // ── Transactions ─────────────────────────────────────
    case "transaction": {
      const tEntityType = context.entityType;
      const tEntityId = context.entityId;
      const tStatus = context.transactionStatus;

      if (action === "read") {
        return (
          level >= ROLE_LEVEL.commune_staff &&
          (!context.districtId || context.districtId === districtId)
        );
      }
      if (action === "create" || action === "update") {
        if (tEntityType === "commune") {
          return (
            (role === "commune_chief" || role === "commune_staff") &&
            tEntityId === communeId
          );
        }
        if (tEntityType === "district") {
          return (
            (role === "district_admin" || role === "district_chief") &&
            tEntityId === districtId
          );
        }
        return false;
      }
      if (action === "delete") {
        if (role === "district_admin" || role === "district_chief") return true;
        if (role === "commune_chief" && tEntityId === communeId && tStatus === "pending") return true;
        return false;
      }
      return false;
    }

    // ── Budgets ──────────────────────────────────────────
    case "budget": {
      const bEntityType = context.entityType;
      const bEntityId = context.entityId;

      if (action === "read") {
        return (
          level >= ROLE_LEVEL.commune_staff &&
          (!context.districtId || context.districtId === districtId)
        );
      }
      if (action === "create" || action === "update") {
        if (bEntityType === "commune") {
          return role === "commune_chief" && bEntityId === communeId;
        }
        if (bEntityType === "district") {
          return (
            (role === "district_admin" || role === "district_chief") &&
            bEntityId === districtId
          );
        }
        return false;
      }
      return false;
    }

    // ── Users / User Management ──────────────────────────
    case "user": {
      if (action === "read") {
        return level >= ROLE_LEVEL.district_admin;
      }
      if (action === "create" || action === "update" || action === "delete") {
        const targetRole = (context as Record<string, unknown>).targetRole as UserRole | undefined;
        const targetLevel = targetRole ? ROLE_LEVEL[targetRole] ?? 0 : 0;
        return level > targetLevel;
      }
      return false;
    }

    // ── Finance summaries ────────────────────────────────
    case "finance_summary": {
      if (action === "read") {
        return (
          level >= ROLE_LEVEL.commune_staff &&
          (!context.districtId || context.districtId === districtId)
        );
      }
      return false;
    }

    // ── Audit logs ───────────────────────────────────────
    case "audit_log": {
      return action === "read" && level >= ROLE_LEVEL.district_admin;
    }

    // ── Notifications ────────────────────────────────────
    case "notification": {
      return true; // filtered downstream by userId
    }

    default:
      return false;
  }
}

// ─── React hook wrapper ─────────────────────────────────────

/**
 * Access fine-grained resource+action permissions for the currently
 * logged-in user.
 *
 * ```tsx
 * const { can } = usePermissions();
 * if (can('submit', 'commune_report', { communeId, status: 'draft' })) { ... }
 * ```
 */
export function usePermissions() {
  const { user } = useAuth();

  return useMemo(() => {
    const can = (
      action: Action,
      resource: Resource,
      context: Omit<PermissionContext, "user"> = {}
    ): boolean => {
      return canAccess(user, action, resource, context);
    };

    return {
      can,
      isDistrictLevel: user ? ROLE_LEVEL[user.role] >= ROLE_LEVEL.district_admin : false,
      isCommuneLevel: user
        ? user.role === "commune_chief" || user.role === "commune_staff"
        : false,
      level: user ? ROLE_LEVEL[user.role] : 0,
    };
  }, [user]);
}