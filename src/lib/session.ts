export const SESSION_COOKIE = "_baby";

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};

export const cleanToken = (t: string) => t.replace(/^Bearer\s+/i, "").trim();
