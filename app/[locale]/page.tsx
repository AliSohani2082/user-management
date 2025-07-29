"use client"

import { useEffect } from "react"
import { useSelector } from "react-redux"

import type { RootState } from "@/store/store"

import { useRouter } from "@/lib/i18n/navigation"

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    } else {
      router.push("/auth/login")
    }
  }, [isAuthenticated, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="mx-auto size-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
      </div>
    </div>
  )
}
