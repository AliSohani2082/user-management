"use client"

import { Suspense, useState } from "react"
import { useDeleteUserMutation, useGetUsersQuery } from "@/store/api/usersApi"
import { setCurrentPage } from "@/store/slices/usersSlice"
import {
  BarChart3,
  Edit,
  Eye,
  PieChart,
  Plus,
  RefreshCw,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { useDispatch, useSelector } from "react-redux"

import type { RootState } from "@/store/store"
import type { User } from "@/types/user"

import { Link } from "@/lib/i18n/navigation"
import { useToast } from "@/hooks/use-toast"
import { useUsersFilters } from "@/hooks/use-users-filters"
import DeleteConfirmModal from "@/components/elementary/DeleteConfirmModal"
import ErrorMessage from "@/components/elementary/ErrorMessage"
import LoadingSpinner from "@/components/elementary/LoadingSpinner"
import Pagination from "@/components/elementary/Pagination"
import UserModal from "@/components/elementary/UserModal"
import UsersFilters from "@/components/elementary/UsersFilters"
import UsersTableView from "@/components/elementary/UsersTableView"
import UsersViewToggle from "@/components/elementary/UsersViewToggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function DashboardContent() {
  const dispatch = useDispatch()
  const { toast } = useToast()
  const t = useTranslations()
  const { currentPage } = useSelector((state: RootState) => state.users)
  const { filters, updateFilter, resetFilters, filterUsers } = useUsersFilters()

  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")

  // RTK Query hooks
  const {
    data: usersData,
    error,
    isLoading,
    refetch,
  } = useGetUsersQuery(filters.page)
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

  const handlePageChange = (page: number) => {
    updateFilter("page", page)
    dispatch(setCurrentPage(page))
  }

  const handleCreateUser = () => {
    setSelectedUser(null)
    setModalMode("create")
    setIsUserModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setModalMode("edit")
    setIsUserModalOpen(true)
  }

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedUser) return

    try {
      await deleteUser(selectedUser.id).unwrap()
      toast({
        title: t("common.success"),
        description: t("users.userDeleted"),
      })
      setIsDeleteModalOpen(false)
      setSelectedUser(null)
      refetch()
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("users.userDeleteError"),
        variant: "destructive",
      })
    }
  }

  const handleReload = () => {
    refetch()
    toast({
      title: t("common.refresh"),
      description: t("users.dataRefreshed"),
    })
  }

  const handleSort = (field: string) => {
    if (filters.sortBy === field) {
      updateFilter("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc")
    } else {
      updateFilter("sortBy", field)
      updateFilter("sortOrder", "asc")
    }
  }

  const handleViewChange = (view: "card" | "table") => {
    updateFilter("view", view)
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} onRetry={refetch} />

  // Filter and sort users
  const allUsers = usersData?.data || []
  const filteredUsers = filterUsers(allUsers)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("users.dashboardTitle")}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleReload} variant="outline" size="sm">
            <RefreshCw className="mr-2 size-4" />
            {t("common.refresh")}
          </Button>
          <Button onClick={handleCreateUser} size="sm">
            <Plus className="mr-2 size-4" />
            {t("users.newUser")}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.totalUsers")}
            </CardTitle>
            <Users className="size-4 text-muted-foreground" />
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
            <BarChart3 className="size-4 text-muted-foreground" />
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
            <TrendingUp className="size-4 text-muted-foreground" />
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
            <PieChart className="size-4 text-muted-foreground" />
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
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5" />
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredUsers.length === 0 ? (
                <div className="col-span-full py-12 text-center text-gray-500">
                  {filters.search || filters.domain ? (
                    <div>
                      <p className="mb-2 text-lg">
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
                    className="transition-shadow hover:shadow-lg"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 space-x-reverse">
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={`${user.first_name} ${user.last_name}`}
                          className="size-12 rounded-full object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <CardTitle className="truncate text-lg">
                            {user.first_name} {user.last_name}
                          </CardTitle>
                          <p className="truncate text-sm text-gray-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">
                          {t("users.id")}: {user.id}
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditUser(user)}
                            className="size-8 p-0"
                          >
                            <Edit className="size-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteUser(user)}
                            className="size-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                          <Link href={`/users/${user.id}`}>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="size-8 p-0"
                            >
                              <Eye className="size-4" />
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
          setIsUserModalOpen(false)
          refetch()
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
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardContent />
    </Suspense>
  )
}
