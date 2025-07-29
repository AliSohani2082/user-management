"use client"

import { useState } from "react"
import { Filter, RotateCcw, Search, SortAsc, SortDesc, X } from "lucide-react"
import { useTranslations } from "next-intl"

import type { User } from "@/types/user"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface UsersFiltersProps {
  users: User[]
  filters: {
    search: string
    domain: string
    sortBy: string
    sortOrder: string
  }
  onFilterChange: (key: string, value: string | null) => void
  onResetFilters: () => void
}

export default function UsersFilters({
  users,
  filters,
  onFilterChange,
  onResetFilters,
}: UsersFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const t = useTranslations()

  // Extract unique domains from users
  const domains = Array.from(
    new Set(users.map((user) => user.email.split("@")[1]))
  ).sort()

  const activeFiltersCount = [
    filters.search,
    filters.domain,
    filters.sortBy !== "id" ? filters.sortBy : null,
    filters.sortOrder !== "asc" ? filters.sortOrder : null,
  ].filter(Boolean).length

  const handleSearchChange = (value: string) => {
    onFilterChange("search", value || null)
  }

  const handleDomainChange = (value: string) => {
    onFilterChange("domain", value === "all" ? null : value)
  }

  const handleSortChange = (value: string) => {
    onFilterChange("sortBy", value)
  }

  const handleSortOrderChange = (value: string) => {
    onFilterChange("sortOrder", value)
  }

  const getSortFieldLabel = (field: string) => {
    switch (field) {
      case "id":
        return t("users.id")
      case "first_name":
        return t("users.firstName")
      case "last_name":
        return t("users.lastName")
      case "email":
        return t("users.email")
      default:
        return field
    }
  }

  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      {/* Search Input */}
      <div className="relative min-w-0 flex-1">
        <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder={t("filters.searchPlaceholder")}
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pr-10"
        />
        {filters.search && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-1 top-1/2 size-6 -translate-y-1/2 p-0"
            onClick={() => handleSearchChange("")}
          >
            <X className="size-3" />
          </Button>
        )}
      </div>

      {/* Filters Popover */}
      <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="relative bg-transparent">
            <Filter className="mr-2 size-4" />
            {t("common.filter")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{t("filters.filtersAndSorting")}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onResetFilters()
                  setIsFilterOpen(false)
                }}
                className="h-8 px-2"
              >
                <RotateCcw className="mr-1 size-3" />
                {t("common.reset")}
              </Button>
            </div>

            {/* Domain Filter */}
            <div className="space-y-2">
              <Label>{t("filters.domainFilter")}</Label>
              <Select
                value={filters.domain || "all"}
                onValueChange={handleDomainChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("filters.selectDomain")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("filters.allDomains")}</SelectItem>
                  {domains.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <Label>{t("filters.sortBy")}</Label>
              <Select value={filters.sortBy} onValueChange={handleSortChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">{t("users.id")}</SelectItem>
                  <SelectItem value="first_name">
                    {t("users.firstName")}
                  </SelectItem>
                  <SelectItem value="last_name">
                    {t("users.lastName")}
                  </SelectItem>
                  <SelectItem value="email">{t("users.email")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <Label>{t("filters.sortOrder")}</Label>
              <Select
                value={filters.sortOrder}
                onValueChange={handleSortOrderChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">
                    <div className="flex items-center">
                      <SortAsc className="mr-2 size-4" />
                      {t("filters.ascending")}
                    </div>
                  </SelectItem>
                  <SelectItem value="desc">
                    <div className="flex items-center">
                      <SortDesc className="mr-2 size-4" />
                      {t("filters.descending")}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
