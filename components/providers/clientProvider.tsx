"use client"

import React from "react"
import { persister, store } from "@/store/store"
import { ThemeProvider } from "next-themes"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import AuthGuard from "../elementary/AuthGuard"
import { TooltipProvider } from "../ui/tooltip"

export function ClientProviders({
  children,
}: {
  readonly children: React.ReactNode
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
  )
}
