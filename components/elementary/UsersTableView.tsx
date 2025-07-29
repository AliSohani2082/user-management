"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Edit, Eye, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"

import type { User } from "@/types/user"

import { Link } from "@/lib/i18n/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface UsersTableViewProps {
  users: User[]
  onEditUser: (user: User) => void
  onDeleteUser: (user: User) => void
  sortBy: string
  sortOrder: string
  onSort: (field: string) => void
}

export default function UsersTableView({
  users,
  onEditUser,
  onDeleteUser,
  sortBy,
  sortOrder,
  onSort,
}: UsersTableViewProps) {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const t = useTranslations()

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map((user) => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectUser = (userId: number, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, userId])
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId))
    }
  }

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return null
    return sortOrder === "asc" ? (
      <ChevronUp className="size-4" />
    ) : (
      <ChevronDown className="size-4" />
    )
  }

  const handleSort = (field: string) => {
    onSort(field)
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="flex items-center gap-4 rounded-lg bg-blue-50 p-4">
          <span className="text-sm font-medium">
            {t("filters.selectedUsers", { count: selectedUsers.length })}
          </span>
          <Button variant="outline" size="sm">
            {t("filters.bulkDelete")}
          </Button>
          <Button variant="outline" size="sm">
            {t("filters.export")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedUsers([])}
          >
            {t("filters.deselectAll")}
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedUsers.length === users.length && users.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>{t("users.avatar")}</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-medium hover:bg-transparent"
                  onClick={() => handleSort("id")}
                >
                  {t("users.id")}
                  {getSortIcon("id")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-medium hover:bg-transparent"
                  onClick={() => handleSort("first_name")}
                >
                  {t("users.firstName")}
                  {getSortIcon("first_name")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-medium hover:bg-transparent"
                  onClick={() => handleSort("last_name")}
                >
                  {t("users.lastName")}
                  {getSortIcon("last_name")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-medium hover:bg-transparent"
                  onClick={() => handleSort("email")}
                >
                  {t("users.email")}
                  {getSortIcon("email")}
                </Button>
              </TableHead>
              <TableHead>{t("users.domain")}</TableHead>
              <TableHead className="text-center">
                {t("users.actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-8 text-center text-gray-500"
                >
                  {t("users.noUsers")}
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  className={
                    selectedUsers.includes(user.id) ? "bg-blue-50" : ""
                  }
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={(checked) =>
                        handleSelectUser(user.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Avatar className="size-10">
                      <AvatarImage
                        src={user.avatar || "/placeholder.svg"}
                        alt={`${user.first_name} ${user.last_name}`}
                      />
                      <AvatarFallback>
                        {getInitials(user.first_name, user.last_name)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.id}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {user.first_name}
                  </TableCell>
                  <TableCell className="font-medium">
                    {user.last_name}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate" title={user.email}>
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {user.email.split("@")[1]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEditUser(user)}
                        className="size-8 p-0"
                        title={t("users.editUser")}
                      >
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDeleteUser(user)}
                        className="size-8 p-0 text-red-600 hover:text-red-700"
                        title={t("users.deleteUser")}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                      <Link href={`/users/${user.id}`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="size-8 p-0"
                          title={t("users.userDetails")}
                        >
                          <Eye className="size-4" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Table Footer */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div>
          {t("views.showing", { count: users.length })}
          {selectedUsers.length > 0 &&
            ` ${t("views.selected", { count: selectedUsers.length })}`}
        </div>
        <div className="flex items-center gap-4">
          <span>{t("views.sortedBy", { field: sortBy })}</span>
          <span>
            {t("views.order", {
              order:
                sortOrder === "asc"
                  ? t("filters.ascending")
                  : t("filters.descending"),
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
