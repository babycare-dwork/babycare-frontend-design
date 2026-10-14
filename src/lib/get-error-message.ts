export function getErrorMessage(
  error: any,
  fallback = "Something went wrong",
): string {
  const fieldErrors = error?.errors ?? error?.response?.data?.errors;
  if (fieldErrors && typeof fieldErrors === "object") {
    const first = Object.values(fieldErrors).flat()[0];
    if (typeof first === "string") return first;
  }

  return (
    error?.response?.data?.message ||
    error?.data?.message ||
    error?.message ||
    fallback
  );
}
