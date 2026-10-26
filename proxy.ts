import { NextResponse, type NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  if (!req.cookies.has("_baby")) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/baby/:path*", "/order/:path*", "/profile/:path*"],
};
