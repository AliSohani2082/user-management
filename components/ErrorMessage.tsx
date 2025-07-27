"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ErrorMessageProps {
  error: any
  onRetry?: () => void
}

export default function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  const getErrorMessage = (error: any) => {
    if (typeof error === "string") return error
    if (error?.data?.error) return error.data.error
    if (error?.message) return error.message
    return "خطای غیرمنتظره رخ داده است"
  }

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">خطا در بارگذاری</h3>
          <p className="text-gray-600 mb-4">{getErrorMessage(error)}</p>
          {onRetry && (
            <Button onClick={onRetry} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              تلاش مجدد
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
