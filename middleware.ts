import { NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"

import { defaultLocale, locales } from "./lib/i18n"

// https://next-intl-docs.vercel.app/docs/getting-started/app-router
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
})

const publicPages = [
  "/",
  "/auth",
  "/auth/login",
  "/auth/register",
  "/dashboard",
  "/users",
  "/users/.*",
]

export default function middleware(req: NextRequest) {
  // If accessing the root domain without a locale, redirect to the default locale (fa)
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, req.url))
  }

  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i"
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    return intlMiddleware(req)
  }
}

export const config = {
  matcher: [
    // Match all paths except those starting with:
    // - api (API routes)
    // - _next (Next.js internals)
    // - .*\\..*$ (files with extensions, e.g. logo.png)
    "/((?!api|_next|.*\\..*).*)",
  ],
}
