"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const isAuthPage = pathname.startsWith("/auth")

  useEffect(() => {
    if (!isAuthenticated && !isAuthPage && pathname !== "/") {
      router.push("/auth/login")
    } else if (isAuthenticated && isAuthPage) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isAuthPage, pathname, router])

  return <>{children}</>
}
