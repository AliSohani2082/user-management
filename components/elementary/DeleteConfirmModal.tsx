"use client";

import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  userName: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  userName,
}: DeleteConfirmModalProps) {
  const t = useTranslations();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle
            className="flex items-center gap-2 text-red-600"
            data-testid="delete-confirmation"
          >
            <AlertTriangle className="size-5" />
            {t("modals.deleteConfirm")}
          </DialogTitle>
          <DialogDescription>
            {t("modals.deleteMessage", { name: userName })}
            <br />
            {t("modals.deleteWarning")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 pt-4">
          <Button
            data-testid="yes"
            onClick={onConfirm}
            disabled={isLoading}
            variant="destructive"
            className="flex-1"
          >
            {isLoading
              ? t("modals.deleting")
              : t("common.yes") + ", " + t("common.delete")}
          </Button>
          <Button
            onClick={onClose}
            data-testid="cancel"
            variant="outline"
            disabled={isLoading}
          >
            {t("common.cancel")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
