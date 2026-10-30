import { http, HttpResponse } from "msw";
import { server } from "@/test/server";

export type Method = "get" | "post" | "put" | "patch" | "delete";

export interface Captured {
  method: string;
  path: string;
  search: string;
  body: unknown;
}

function parse(text: string): unknown {
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text; // e.g. multipart form data
  }
}

export function capture(method: Method, path: string, status = 200) {
  const seen: Captured = { method: "", path: "", search: "", body: undefined };
  server.use(
    http[method](`*${path}`, async ({ request }) => {
      const url = new URL(request.url);
      seen.method = request.method;
      seen.path = url.pathname;
      seen.search = url.search;
      seen.body = parse(await request.text());
      return HttpResponse.json({ data: {} }, { status });
    }),
  );
  return seen;
}
