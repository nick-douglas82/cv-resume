"use client";

import { signOut } from "next-auth/react";

export default function DashboardPage() {
  return (
    <div>
      <div>Dashboard</div>
      <button type="button" onClick={() => signOut({
        callbackUrl: "/login",
      })}>Sign Out</button>
    </div>
  );
}