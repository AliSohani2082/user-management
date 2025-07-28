import { env } from "@/env.mjs"
import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["fa", "en"],

  // Used when no locale matches
  defaultLocale: "fa",

  localePrefix: "always",
})

// https://next-intl-docs.vercel.app/docs/routing/navigation
export const {
  Link,
  getPathname,
  redirect: _redirect,
  usePathname,
  useRouter,
} = createNavigation(routing)

// Help TypeScript detect unreachable code
// https://next-intl-docs.vercel.app/docs/routing/navigation#redirect
export const redirect: typeof _redirect = _redirect

export function isAppLink(link: string): boolean {
  try {
    const baseUrl = `https://${env.NEXT_PUBLIC_APP_PUBLIC_URL}`
    const url = new URL(link, baseUrl)
    return url.hostname === new URL(baseUrl).hostname
  } catch (error) {
    return false
  }
}
