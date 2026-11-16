import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/session";

export async function serverFetch<T>(path: string): Promise<T | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const res = await fetch(`${process.env.API_URL}/${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    cache: "no-store",
  });
  return res.ok ? res.json() : null;
}
