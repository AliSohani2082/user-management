"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useDeleteUserMutation, useGetUserQuery } from "@/store/api/usersApi"
import {
  ArrowLeft,
  ArrowRight,
  Edit,
  Mail,
  Trash2,
  UserIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"

import { useRouter } from "@/lib/i18n/navigation"
import { useToast } from "@/hooks/use-toast"
import DeleteConfirmModal from "@/components/elementary/DeleteConfirmModal"
import ErrorMessage from "@/components/elementary/ErrorMessage"
import LoadingSpinner from "@/components/elementary/LoadingSpinner"
import UserModal from "@/components/elementary/UserModal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const t = useTranslations()
  const userId = Number.parseInt(params.id as string)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  // RTK Query hooks
  const { data: user, error, isLoading, refetch } = useGetUserQuery(userId)
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

  const handleEdit = () => {
    setIsEditModalOpen(true)
  }

  const handleDelete = () => {
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    try {
      await deleteUser(userId).unwrap()
      toast({
        title: t("common.success"),
        description: t("users.userDeleted"),
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("users.userDeleteError"),
        variant: "destructive",
      })
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} onRetry={refetch} />
  if (!user)
    return <ErrorMessage error={t("users.noUsers")} onRetry={refetch} />

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="size-4 ltr:block rtl:hidden" />
          <ArrowRight className="size-4 ltr:hidden rtl:block" />
          {t("common.back")}
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("users.userDetails")}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleEdit} variant="outline" size="sm">
            <Edit className="mr-2 size-4" />
            {t("common.edit")}
          </Button>
          <Button onClick={handleDelete} variant="destructive" size="sm">
            <Trash2 className="mr-2 size-4" />
            {t("common.delete")}
          </Button>
        </div>
      </div>

      {/* User Details Card */}
      <div className="mx-auto max-w-2xl">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center gap-4">
              <Image
                src={user.data.avatar || "/placeholder.svg"}
                alt={`${user.data.first_name} ${user.data.last_name}`}
                className="size-20 rounded-full border-4 border-white object-cover"
              />
              <div>
                <CardTitle className="text-2xl text-white">
                  {user.data.first_name} {user.data.last_name}
                </CardTitle>
                <p className="mt-1 text-blue-100">{user.data.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100">
                    <UserIcon className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      {t("users.firstName")}
                    </p>
                    <p className="font-semibold">{user.data.first_name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-green-100">
                    <UserIcon className="size-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      {t("users.lastName")}
                    </p>
                    <p className="font-semibold">{user.data.last_name}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-purple-100">
                    <Mail className="size-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("users.email")}</p>
                    <p className="font-semibold">{user.data.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-orange-100">
                    <Badge className="bg-orange-600">{t("users.id")}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("users.id")}</p>
                    <p className="font-semibold">{user.data.id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Information */}
            {user.support && (
              <div className="mt-8 rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">
                  {t("users.support")}
                </h3>
                <p className="mb-2 text-sm text-gray-600">
                  {user.support.text}
                </p>
                <a
                  href={user.support.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                >
                  {user.support.url}
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <UserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user.data}
        mode="edit"
        onSuccess={() => {
          setIsEditModalOpen(false)
          refetch()
        }}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        userName={`${user.data.first_name} ${user.data.last_name}`}
      />
    </div>
  )
}
