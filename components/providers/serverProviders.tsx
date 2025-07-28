import React from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { AppLocale } from "@/types/general";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";

interface Props {
  readonly children: React.ReactNode;
  readonly locale: AppLocale;
}

export async function ServerProviders({ children, locale }: Props) {
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <Provider store={store}>
      <NuqsAdapter>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </NuqsAdapter>
    </Provider>
  );
}
