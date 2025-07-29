import { env } from "@/env.mjs"

import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${env.NEXT_PUBLIC_URL}/sitemap.xml`,
  }
}
