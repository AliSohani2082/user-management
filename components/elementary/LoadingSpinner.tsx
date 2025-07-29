"use client"

import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"

export default function LoadingSpinner() {
  const t = useTranslations("common")

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto mb-4 size-8 animate-spin text-blue-600" />
        <p className="text-gray-600">{t("loading")}</p>
      </div>
    </div>
  )
}
