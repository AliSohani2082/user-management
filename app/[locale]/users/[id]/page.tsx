"use client";

import { useState } from "react";
import { useRouter } from "@/lib/i18n/navigation";
import { useParams } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Mail, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useGetUserQuery, useDeleteUserMutation } from "@/store/api/usersApi";
import UserModal from "@/components/elementary/UserModal";
import DeleteConfirmModal from "@/components/elementary/DeleteConfirmModal";
import LoadingSpinner from "@/components/elementary/LoadingSpinner";
import ErrorMessage from "@/components/elementary/ErrorMessage";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const userId = Number.parseInt(params.id as string);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // RTK Query hooks
  const { data: user, error, isLoading, refetch } = useGetUserQuery(userId);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(userId).unwrap();
      toast({
        title: "موفقیت",
        description: "کاربر با موفقیت حذف شد",
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در حذف کاربر",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;
  if (!user) return <ErrorMessage error="کاربر یافت نشد" onRetry={refetch} />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          بازگشت
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">جزئیات کاربر</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleEdit} variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            ویرایش
          </Button>
          <Button onClick={handleDelete} variant="destructive" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            حذف
          </Button>
        </div>
      </div>

      {/* User Details Card */}
      <div className="max-w-2xl mx-auto">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center space-x-4 space-x-reverse">
              <img
                src={user.data.avatar || "/placeholder.svg"}
                alt={`${user.data.first_name} ${user.data.last_name}`}
                className="w-20 h-20 rounded-full border-4 border-white object-cover"
              />
              <div>
                <CardTitle className="text-2xl text-white">
                  {user.data.first_name} {user.data.last_name}
                </CardTitle>
                <p className="text-blue-100 mt-1">{user.data.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">نام</p>
                    <p className="font-semibold">{user.data.first_name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">نام خانوادگی</p>
                    <p className="font-semibold">{user.data.last_name}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ایمیل</p>
                    <p className="font-semibold">{user.data.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Badge className="bg-orange-600">ID</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">شناسه کاربر</p>
                    <p className="font-semibold">{user.data.id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Information */}
            {user.support && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  اطلاعات پشتیبانی
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {user.support.text}
                </p>
                <a
                  href={user.support.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
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
          setIsEditModalOpen(false);
          refetch();
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
  );
}
