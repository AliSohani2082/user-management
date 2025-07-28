"use client";

import { useQueryStates } from "nuqs";
import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs";
import { useMemo } from "react";
import type { User } from "@/types/user";

export const useUsersFilters = () => {
  const [filters, setFilters] = useQueryStates({
    search: parseAsString.withDefault(""),
    domain: parseAsString.withDefault(""),
    sortBy: parseAsStringEnum([
      "id",
      "first_name",
      "last_name",
      "email",
    ]).withDefault("id"),
    sortOrder: parseAsStringEnum(["asc", "desc"]).withDefault("asc"),
    page: parseAsInteger.withDefault(1),
    view: parseAsStringEnum(["card", "table"]).withDefault("card"),
  });

  const updateFilter = (key: string, value: string | number | null) => {
    setFilters({ [key]: value });
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      domain: "",
      sortBy: "id",
      sortOrder: "asc",
      page: 1,
    });
  };

  const filterUsers = useMemo(() => {
    return (users: User[]) => {
      let filteredUsers = [...users];

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredUsers = filteredUsers.filter(
          (user) =>
            user.first_name.toLowerCase().includes(searchTerm) ||
            user.last_name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
      }

      // Domain filter
      if (filters.domain) {
        filteredUsers = filteredUsers.filter((user) =>
          user.email.includes(filters.domain)
        );
      }

      // Sorting
      filteredUsers.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (filters.sortBy) {
          case "id":
            aValue = a.id;
            bValue = b.id;
            break;
          case "first_name":
            aValue = a.first_name.toLowerCase();
            bValue = b.first_name.toLowerCase();
            break;
          case "last_name":
            aValue = a.last_name.toLowerCase();
            bValue = b.last_name.toLowerCase();
            break;
          case "email":
            aValue = a.email.toLowerCase();
            bValue = b.email.toLowerCase();
            break;
          default:
            aValue = a.id;
            bValue = b.id;
        }

        if (aValue < bValue) return filters.sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return filters.sortOrder === "asc" ? 1 : -1;
        return 0;
      });

      return filteredUsers;
    };
  }, [filters.search, filters.domain, filters.sortBy, filters.sortOrder]);

  return {
    filters,
    updateFilter,
    resetFilters,
    filterUsers,
  };
};
