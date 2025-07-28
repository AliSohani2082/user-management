import "@/styles/globals.css";

import { notFound } from "next/navigation";
import { LayoutProps } from "@/types/next";

import { fontSans } from "@/lib/fonts";
import { locales } from "@/lib/i18n";
import { ClientProviders } from "@/components/providers/clientProvider";
import { ServerProviders } from "@/components/providers/serverProviders";
import { Toaster } from "@/components/ui/sonner";
import { Seo } from "@/lib/seo";
import { TailwindIndicator } from "@/components/elementary/TailwindIndicator";
import { AppLocale } from "@/types/general";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return Seo({ params });
}

export default async function RootLayout({ children, params }: LayoutProps) {
  if (!locales.includes(params.locale)) {
    notFound();
  }

  return (
    <html
      lang={params.locale}
      className={`${fontSans.variable} font-sans`}
      dir={params.locale === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body>
        <ServerProviders locale={params.locale}>
          <ClientProviders>
            {children}
            <TailwindIndicator />
            <Toaster />
          </ClientProviders>
        </ServerProviders>
      </body>
    </html>
  );
}
