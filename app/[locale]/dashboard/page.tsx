"use client";

import { Suspense, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Plus,
  RefreshCw,
  Users,
  TrendingUp,
  BarChart3,
  PieChart,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import type { RootState } from "@/store/store";
import { useGetUsersQuery, useDeleteUserMutation } from "@/store/api/usersApi";
import { setCurrentPage } from "@/store/slices/usersSlice";
import { useUsersFilters } from "@/hooks/use-users-filters";
import UserModal from "@/components/elementary/UserModal";
import DeleteConfirmModal from "@/components/elementary/DeleteConfirmModal";
import Pagination from "@/components/elementary/Pagination";
import LoadingSpinner from "@/components/elementary/LoadingSpinner";
import ErrorMessage from "@/components/elementary/ErrorMessage";
import UsersFilters from "@/components/elementary/UsersFilters";
import UsersViewToggle from "@/components/elementary/UsersViewToggle";
import UsersTableView from "@/components/elementary/UsersTableView";
import type { User } from "@/types/user";

function DashboardContent() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const t = useTranslations();
  const { currentPage } = useSelector((state: RootState) => state.users);
  const { filters, updateFilter, resetFilters, filterUsers } =
    useUsersFilters();

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
  } = useGetUsersQuery(filters.page);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handlePageChange = (page: number) => {
    updateFilter("page", page);
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
        title: t("common.success"),
        description: t("users.userDeleted"),
      });
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      refetch();
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("users.userDeleteError"),
        variant: "destructive",
      });
    }
  };

  const handleReload = () => {
    refetch();
    toast({
      title: t("common.refresh"),
      description: t("users.dataRefreshed"),
    });
  };

  const handleSort = (field: string) => {
    if (filters.sortBy === field) {
      updateFilter("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc");
    } else {
      updateFilter("sortBy", field);
      updateFilter("sortOrder", "asc");
    }
  };

  const handleViewChange = (view: "card" | "table") => {
    updateFilter("view", view);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;

  // Filter and sort users
  const allUsers = usersData?.data || [];
  const filteredUsers = filterUsers(allUsers);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("users.dashboardTitle")}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleReload} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("common.refresh")}
          </Button>
          <Button onClick={handleCreateUser} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            {t("users.newUser")}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.totalUsers")}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersData?.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              {t("stats.inPages", { count: usersData?.total_pages || 0 })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.currentPage")}
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filters.page}</div>
            <p className="text-xs text-muted-foreground">
              {t("stats.ofPages", { count: usersData?.total_pages || 0 })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.displayedUsers")}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              {t("stats.fromUsers", { count: allUsers.length })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.perPage")}
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersData?.per_page || 0}</div>
            <p className="text-xs text-muted-foreground">
              {t("users.usersPerPage")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users Section */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {t("users.usersList")}
            </CardTitle>
            <UsersViewToggle
              view={filters.view}
              onViewChange={handleViewChange}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filters */}
          <UsersFilters
            users={allUsers}
            filters={filters}
            onFilterChange={updateFilter}
            onResetFilters={resetFilters}
          />

          {/* Users List */}
          {filters.view === "table" ? (
            <UsersTableView
              users={filteredUsers}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
              onSort={handleSort}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredUsers.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  {filters.search || filters.domain ? (
                    <div>
                      <p className="text-lg mb-2">
                        {t("users.noUsersWithFilters")}
                      </p>
                      <Button variant="outline" onClick={resetFilters}>
                        {t("users.clearFilters")}
                      </Button>
                    </div>
                  ) : (
                    t("users.noUsers")
                  )}
                </div>
              ) : (
                filteredUsers.map((user: User) => (
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
                        <Badge variant="secondary">
                          {t("users.id")}: {user.id}
                        </Badge>
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
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {usersData && (
        <Pagination
          currentPage={filters.page}
          totalPages={usersData.total_pages}
          onPageChange={handlePageChange}
        />
      )}

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

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardContent />
    </Suspense>
  );
}
