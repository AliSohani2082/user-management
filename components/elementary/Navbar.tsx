"use client";

import { useLogoutMutation } from "@/store/api/authApi";
import { logout } from "@/store/slices/authSlice";
import { BarChart3, LogOut, Menu, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/store/store";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Link, usePathname, useRouter } from "@/lib/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const [logoutMutation] = useLogoutMutation();
  const t = useTranslations();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      // Continue with logout even if API call fails
    } finally {
      dispatch(logout());
      toast({
        title: t("auth.logoutSuccess"),
        description: t("auth.logoutSuccess"),
      });
      router.push("/auth/login");
    }
  };

  // Don't show navbar on auth pages
  if (pathname.startsWith("/auth")) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 space-x-reverse"
            >
              <Users className="size-8 text-blue-600" />
              <span className="text-xl sm:block hidden font-bold text-gray-900">
                {t("navigation.userManagement")}
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden items-center gap-6 space-x-reverse md:flex">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 space-x-reverse rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === "/dashboard"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <BarChart3 className="size-4" />
              <span>{t("navigation.dashboard")}</span>
            </Link>

            <Link
              href="/users"
              className={`flex items-center gap-2 space-x-reverse rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname.startsWith("/users")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Users className="size-4" />
              <span>{t("navigation.users")}</span>
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4 space-x-reverse">
            <LanguageSwitcher />
            <div className="flex items-center gap-3 space-x-reverse">
              <span className="text-sm sm:block hidden text-gray-600">
                {t("auth.welcome", {
                  name: user?.username || user?.email || "",
                })}
              </span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 space-x-reverse bg-transparent"
              >
                <LogOut className="size-4" />
                <span>{t("navigation.logout")}</span>
              </Button>
              <Sheet>
                <SheetTrigger asChild className="sm:hidden block">
                  <Button variant="ghost" className="rounded-full">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetTrigger />
                <SheetContent>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 space-x-reverse rounded-md px-3 py-2 text-sm font-medium transition-colors"
                  >
                    <BarChart3 className="size-4" />
                    <span>{t("navigation.dashboard")}</span>
                  </Link>
                  <Link
                    href="/users"
                    className="flex items-center gap-2 space-x-reverse w-full rounded-md px-3 py-2 text-sm font-medium transition-colors"
                  >
                    <Users className="size-4" />
                    <span>{t("navigation.users")}</span>
                  </Link>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
