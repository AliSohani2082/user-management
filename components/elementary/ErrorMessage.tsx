"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ErrorMessageProps {
  error: any
  onRetry?: () => void
}

export default function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  const t = useTranslations("common")

  const getErrorMessage = (error: any) => {
    if (typeof error === "string") return error
    if (error?.data?.error) return error.data.error
    if (error?.message) return error.message
    return t("error")
  }

  return (
    <div className="flex min-h-[400px] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <AlertCircle className="mx-auto mb-4 size-12 text-red-500" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {t("error")}
          </h3>
          <p className="mb-4 text-gray-600">{getErrorMessage(error)}</p>
          {onRetry && (
            <Button onClick={onRetry} className="flex items-center gap-2">
              <RefreshCw className="size-4" />
              {t("refresh")}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
