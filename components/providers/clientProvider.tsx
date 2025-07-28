"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TooltipProvider } from "../ui/tooltip";
import AuthGuard from "../elementary/AuthGuard";
import { PersistGate } from "redux-persist/integration/react";
import { store, persister } from "@/store/store";

export function ClientProviders({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <NuqsAdapter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
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
        </PersistGate>
      </Provider>
    </NuqsAdapter>
  );
}
