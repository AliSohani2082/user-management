import { env } from "process";

import React from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { AppLocale } from "@/types/general";

interface Props {
  readonly children: React.ReactNode;
  readonly locale: AppLocale;
}

export async function ServerProviders({ children, locale }: Props) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
