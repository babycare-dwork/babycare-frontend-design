import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { serverFetch } from "@/lib/api-server";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const me = await serverFetch("user");
  if (!me) redirect("/login");

  const qc = new QueryClient();
  qc.setQueryData(["auth", "me"], me);

  return (
    <HydrationBoundary state={dehydrate(qc)}>{children}</HydrationBoundary>
  );
}
