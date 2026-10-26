import {
  SESSION_COOKIE,
  sessionCookieOptions,
  cleanToken,
} from "@/lib/session";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { token } = await req.json();
  const raw = cleanToken(String(token ?? ""));
  const check = await fetch(`${process.env.API_URL}/user`, {
    headers: { Authorization: `Bearer ${raw}`, Accept: "application/json" },
  });
  if (!check.ok) return Response.json({ ok: false }, { status: 401 });
  (await cookies()).set(SESSION_COOKIE, raw, sessionCookieOptions);
  return Response.json({ ok: true });
}
