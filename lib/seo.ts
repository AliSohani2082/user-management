import { Metadata } from "next"
import { env } from "@/env.mjs"
import { getTranslations } from "next-intl/server"

type SeoProps = {
  locale: string
  pageName?: "dashboard" | "blog" | "pathFinder" | "users" | "about" | "contact"
}

export async function Seo({ locale, pageName = "dashboard" }: SeoProps) {
  const t = await getTranslations()

  return generateMetadata(t, locale, pageName)
}

function generateMetadata(t: any, locale: string, pageName: string): Metadata {
  // Page-specific titles and descriptions
  const pageKeywords: Record<string, string> = {
    dashboard: t("metadata.dashboard.keywords"),
    users: t("metadata.users.keywords"),
  }

  const pageTitles: Record<string, string> = {
    dashboard: t("metadata.dashboard.title"),
    users: t("metadata.users.title"),
  }

  const pageDescriptions: Record<string, string> = {
    dashboard: t("metadata.dashboard.description"),
    users: t("metadata.users.description"),
  }

  return {
    title: pageTitles[pageName] || t("metadata.title"),
    description: pageDescriptions[pageName] || t("metadata.description"),
    keywords: pageKeywords[pageName] || t("metadata.keywords"),
    metadataBase: new URL(env.NEXT_PUBLIC_URL),
    alternates: {
      canonical: `/${pageName === "dashboard" ? "" : pageName}`,
      languages: {
        en: `/en${pageName === "dashboard" ? "" : `/${pageName}`}`,
        fa: `/fa${pageName === "dashboard" ? "" : `/${pageName}`}`,
      },
    },
    openGraph: {
      title: pageTitles[pageName] || t("metadata.title"),
      description: pageDescriptions[pageName] || t("metadata.description"),
      images: t("metadata.ogImage"),
      locale: locale,
      type: "website",
      siteName: t("metadata.siteName"),
      url: `${env.NEXT_PUBLIC_URL}/${locale}${pageName === "dashboard" ? "" : `/${pageName}`}`,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitles[pageName] || t("metadata.title"),
      description: pageDescriptions[pageName] || t("metadata.description"),
      images: t("metadata.ogImage"),
      creator: "@toubin.ai",
      site: "@tourbin.ai",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: t("metadata.logo"),
    },
    authors: [{ name: "Tourbin" }],
    category: "travel",
  }
}
