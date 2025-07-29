"use client"

import { useState } from "react"
import Link from "next/link"
import { useRegisterMutation } from "@/store/api/authApi"
import { login } from "@/store/slices/authSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2, Lock, Mail, UserPlus } from "lucide-react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import { useRouter } from "@/lib/i18n/navigation"
import { createAuthSchema, RegisterFormData } from "@/lib/validations/auth"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import PasswordInput from "@/components/ui/password-input"

export default function RegisterPage() {
  const t = useTranslations()
  const dispatch = useDispatch()
  const router = useRouter()
  const { toast } = useToast()
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { passwordSchema, registerSchema } = createAuthSchema(t)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const password = form.watch("password")

  const [registerMutation, { isLoading }] = useRegisterMutation()

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword, ...registerData } = data
      const result = await registerMutation(registerData).unwrap()

      dispatch(
        login({
          user: {
            email: data.email,
          },
          token: result.token,
        })
      )
      toast({
        title: t("common.success"),
        description: t("auth.registerSuccess"),
      })

      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: t("auth.registerError"),
        description: error?.data?.error || t("auth.invalidCredentials"),
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-600">
            <UserPlus className="size-8 text-white" />
          </div>
          <CardTitle className="text-2xl">{t("auth.registerTitle")}</CardTitle>
          <CardDescription>{t("auth.registerDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.email")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute right-3 top-3 size-4 text-gray-400" />
                        <Input
                          type="email"
                          placeholder={t("forms.enterEmail")}
                          className="pr-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.password")}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        schema={passwordSchema}
                        passwordValue={password}
                        field={field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.confirmPassword")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute right-3 top-3 size-4 text-gray-400" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder={t("forms.confirmPasswordPlaceholder")}
                          className="px-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    {t("auth.registering")}
                  </>
                ) : (
                  t("auth.registerButton")
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  t("auth.hasAccount"){" "}
                  <Link
                    href="/auth/login"
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    {t("auth.loginLink")}
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
