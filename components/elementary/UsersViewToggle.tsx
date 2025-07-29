"use client"

import { LayoutGrid, Table } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface UsersViewToggleProps {
  view: "card" | "table"
  onViewChange: (view: "card" | "table") => void
}

export default function UsersViewToggle({
  view,
  onViewChange,
}: UsersViewToggleProps) {
  const t = useTranslations("views")

  return (
    <div className="flex items-center rounded-lg border p-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("card")}
        className={cn(
          "h-8 px-3",
          view === "card" && "bg-primary text-primary-foreground shadow-sm"
        )}
      >
        <LayoutGrid className="mr-2 size-4" />
        {t("card")}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("table")}
        className={cn(
          "h-8 px-3",
          view === "table" && "bg-primary text-primary-foreground shadow-sm"
        )}
      >
        <Table className="mr-2 size-4" />
        {t("table")}
      </Button>
    </div>
  )
}
