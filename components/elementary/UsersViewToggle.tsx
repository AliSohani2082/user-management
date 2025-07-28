"use client";

import { LayoutGrid, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface UsersViewToggleProps {
  view: "card" | "table";
  onViewChange: (view: "card" | "table") => void;
}

export default function UsersViewToggle({
  view,
  onViewChange,
}: UsersViewToggleProps) {
  const t = useTranslations("views");

  return (
    <div className="flex items-center border rounded-lg p-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("card")}
        className={cn(
          "h-8 px-3",
          view === "card" && "bg-primary text-primary-foreground shadow-sm"
        )}
      >
        <LayoutGrid className="w-4 h-4 mr-2" />
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
        <Table className="w-4 h-4 mr-2" />
        {t("table")}
      </Button>
    </div>
  );
}
