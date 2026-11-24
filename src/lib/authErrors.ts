export type AuthErrorKind = "rate_limited" | "unverified" | "other";

type ApiError = { status?: number; code?: string; message?: string };

export function classifyAuthError(error: unknown): AuthErrorKind {
  const e = (error ?? {}) as ApiError;
  if (e.status === 429) return "rate_limited";
  if (
    e.code === "email_not_verified" ||
    /verify your email/i.test(e.message ?? "")
  ) {
    return "unverified";
  }
  return "other";
}

export function getAuthErrorMessage(error: unknown, fallback: string): string {
  const kind = classifyAuthError(error);
  if (kind === "rate_limited") {
    return "Too many attempts. Please wait a few minutes and try again.";
  }
  if (kind === "unverified") {
    return "Please verify your email before signing in.";
  }
  return (error as ApiError)?.message || fallback;
}
