"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "@/server-functions/auth";
import { LogOut } from "lucide-react";

import { redirect } from "next/navigation";

export const SignoutButton = () => {
  return (
    <DropdownMenuItem
      onClick={async () => {
        await logout();
        redirect("/auth/signin");
      }}
    >
      <span className="text-destructive flex items-center gap-2">
        <LogOut size={16} />
        Sign out
      </span>
    </DropdownMenuItem>
  );
};
