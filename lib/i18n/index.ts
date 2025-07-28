import { Pathnames } from "next-intl/routing";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./navigation";

export const locales = ["en", "fa"] as const;
export const defaultLocale = "fa";

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
    fa: "/masir",
  },
};
export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (
      await (locale === "en"
        ? // When using Turbopack, this will enable HMR for `en`
          import("../../messages/en.json")
        : import(`../../messages/${locale}.json`))
    ).default,
    timeZone: "Europe/Prague",
  };
});
