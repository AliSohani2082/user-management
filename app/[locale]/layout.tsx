import "@/styles/globals.css";

import { notFound } from "next/navigation";

import { LayoutProps } from "@/types/next";

import Navbar from "@/components/elementary/Navbar";
import { TailwindIndicator } from "@/components/elementary/TailwindIndicator";
import { ClientProviders } from "@/components/providers/clientProvider";
import { ServerProviders } from "@/components/providers/serverProviders";
import { Toaster } from "@/components/ui/sonner";
import { fontSans } from "@/lib/fonts";
import { locales } from "@/lib/i18n";
import { Seo } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  return Seo({ locale });
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${fontSans.variable} font-sans`}
      dir={locale === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body>
        <ServerProviders locale={locale}>
          <ClientProviders>
            <Navbar />
            {children}
            <TailwindIndicator />
            <Toaster />
          </ClientProviders>
        </ServerProviders>
      </body>
    </html>
  );
}
