"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Plus,
  RefreshCw,
  Edit,
  Trash2,
  Eye,
  Users,
  TrendingUp,
  BarChart3,
  PieChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { RootState } from "@/store/store";
import { useGetUsersQuery, useDeleteUserMutation } from "@/store/api/usersApi";
import { setCurrentPage } from "@/store/slices/usersSlice";
import UserModal from "@/components/UserModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import Pagination from "@/components/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import UserChart from "@/components/UserChart";
import UserStatsChart from "@/components/UserStatsChart";
import type { User } from "@/types/user";
import Link from "next/link";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { currentPage } = useSelector((state: RootState) => state.users);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  // RTK Query hooks
  const {
    data: usersData,
    error,
    isLoading,
    refetch,
  } = useGetUsersQuery(currentPage);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setModalMode("create");
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setModalMode("edit");
    setIsUserModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.id).unwrap();
      toast({
        title: "موفقیت",
        description: "کاربر با موفقیت حذف شد",
      });
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      refetch();
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در حذف کاربر",
        variant: "destructive",
      });
    }
  };

  const handleReload = () => {
    refetch();
    toast({
      title: "بروزرسانی",
      description: "داده‌ها بروزرسانی شدند",
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            داشبورد مدیریت کاربران
          </h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleReload} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            بروزرسانی
          </Button>
          <Button onClick={handleCreateUser} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            کاربر جدید
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل کاربران</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersData?.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              در {usersData?.total_pages || 0} صفحه
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">صفحه فعلی</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentPage}</div>
            <p className="text-xs text-muted-foreground">
              از {usersData?.total_pages || 0} صفحه
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کاربران فعلی</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersData?.data?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">در این صفحه</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">هر صفحه</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersData?.per_page || 0}</div>
            <p className="text-xs text-muted-foreground">کاربر در هر صفحه</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div></div>
      <div className="flex flex-col justify-center items-center">
        {/* Users Grid */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              لیست کاربران
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {usersData?.data?.map((user: User) => (
                <Card
                  key={user.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">
                          {user.first_name} {user.last_name}
                        </CardTitle>
                        <p className="text-sm text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">ID: {user.id}</Badge>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditUser(user)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteUser(user)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Link href={`/users/${user.id}`}>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        {usersData && (
          <Pagination
            currentPage={currentPage}
            totalPages={usersData.total_pages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Modals */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        user={selectedUser}
        mode={modalMode}
        onSuccess={() => {
          setIsUserModalOpen(false);
          refetch();
        }}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        userName={
          selectedUser
            ? `${selectedUser.first_name} ${selectedUser.last_name}`
            : ""
        }
      />
    </div>
  );
}
