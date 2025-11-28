"use client";

import { getQueryClient } from "@/lib/query/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
