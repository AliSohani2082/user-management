"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading: boolean
  userName: string
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  userName,
}: DeleteConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            تأیید حذف کاربر
          </DialogTitle>
          <DialogDescription className="text-right">
            آیا از حذف کاربر <strong>{userName}</strong> اطمینان دارید؟
            <br />
            این عمل قابل بازگشت نیست.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 pt-4">
          <Button onClick={onConfirm} disabled={isLoading} variant="destructive" className="flex-1">
            {isLoading ? "در حال حذف..." : "بله، حذف کن"}
          </Button>
          <Button onClick={onClose} variant="outline" disabled={isLoading}>
            انصراف
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
