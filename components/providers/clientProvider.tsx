"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "../ui/tooltip";
import AuthGuard from "../elementary/AuthGuard";

export function ClientProviders({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        forcedTheme="light"
      >
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </AuthGuard>
  );
}
