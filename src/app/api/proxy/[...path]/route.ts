import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import {
  cleanToken,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/session";

const API_URL = process.env.API_URL!;
const TOKEN_ROUTES = new Set(["login", "login/google"]);

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const subPath = path.join("/");
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;

  const headers = new Headers({ Accept: "application/json" });
  const ct = req.headers.get("content-type");
  if (ct) headers.set("content-type", ct); // keeps the multipart boundary
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const xff = req.headers.get("x-forwarded-for");
  if (xff) headers.set("x-forwarded-for", xff);

  const hasBody = !["GET", "HEAD"].includes(req.method);
  const upstream = await fetch(`${API_URL}/${subPath}${req.nextUrl.search}`, {
    method: req.method,
    headers,
    body: hasBody ? req.body : undefined, // streamed, so file uploads work
    cache: "no-store",
    // @ts-expect-error required by Node when streaming a body
    duplex: "half",
  });

  // Login: move the token into the HttpOnly cookie, never send it to the browser
  if (TOKEN_ROUTES.has(subPath) && upstream.ok) {
    const json = await upstream.json();
    const newToken = json?.data?.token;
    if (newToken) {
      delete json.data.token;
      jar.set(SESSION_COOKIE, cleanToken(newToken), sessionCookieOptions);
    }
    return Response.json(json, { status: upstream.status });
  }

  // Logout: always clear the cookie, even if Laravel errors
  if (subPath === "logout") jar.delete(SESSION_COOKIE);

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "content-type":
        upstream.headers.get("content-type") ?? "application/json",
    },
  });
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
