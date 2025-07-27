"use client"

import { useSelector, useDispatch } from "react-redux"
import { useRouter, usePathname } from "next/navigation"
import { Users, LogOut, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { RootState } from "@/store/store"
import { logout } from "@/store/slices/authSlice"
import { useLogoutMutation } from "@/store/api/authApi"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function Navbar() {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const [logoutMutation] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap()
    } catch (error) {
      // Continue with logout even if API call fails
    } finally {
      dispatch(logout())
      toast({
        title: "خروج موفق",
        description: "با موفقیت از سیستم خارج شدید",
      })
      router.push("/auth/login")
    }
  }

  // Don't show navbar on auth pages
  if (pathname.startsWith("/auth")) {
    return null
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/dashboard" className="flex items-center space-x-2 space-x-reverse">
              <Users className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">پنل مدیریت کاربران</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Link
              href="/dashboard"
              className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/dashboard"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>داشبورد</span>
            </Link>

            <Link
              href="/users"
              className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname.startsWith("/users")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>کاربران</span>
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex items-center space-x-3 space-x-reverse">
              <span className="text-sm text-gray-600">خوش آمدید، {user?.username || user?.email}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 space-x-reverse bg-transparent"
              >
                <LogOut className="w-4 h-4" />
                <span>خروج</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
