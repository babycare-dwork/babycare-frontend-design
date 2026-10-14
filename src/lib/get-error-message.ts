export function getErrorMessage(
  error: any,
  fallback = "Something went wrong",
): string {
  return (
    error?.response?.data?.message ||
    error?.data?.message ||
    error?.message ||
    fallback
  );
}
