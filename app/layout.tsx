"use client";

import type React from "react";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { store } from "@/store/store";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/AuthGuard";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <Provider store={store}>
          <NuqsAdapter>
            <AuthGuard>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main>{children}</main>
              </div>
              <Toaster />
            </AuthGuard>
          </NuqsAdapter>
        </Provider>
      </body>
    </html>
  );
}
