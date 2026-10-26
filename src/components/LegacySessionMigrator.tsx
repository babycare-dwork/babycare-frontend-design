"use client";
import { useEffect } from "react";

export function LegacySessionMigrator() {
  useEffect(() => {
    const legacy = localStorage.getItem("_baby");
    if (!legacy) return;
    fetch("/api/auth/migrate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: legacy }),
    })
      .then((r) => {
        localStorage.removeItem("_baby");
        if (r.ok) location.reload();
      })
      .catch(() => {});
  }, []);
  return null;
}
