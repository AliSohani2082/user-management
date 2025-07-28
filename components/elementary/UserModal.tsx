"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Edit, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "@/store/api/usersApi";
import { useTranslations } from "next-intl";
import type { User as UserType } from "@/types/user";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserType | null;
  mode: "create" | "edit";
  onSuccess: () => void;
}

export default function UserModal({
  isOpen,
  onClose,
  user,
  mode,
  onSuccess,
}: UserModalProps) {
  const { toast } = useToast();
  const t = useTranslations();

  const userSchema = z.object({
    name: z
      .string()
      .min(1, t("forms.required"))
      .min(2, t("forms.minLength", { min: 2 }))
      .max(100, t("forms.maxLength", { max: 100 })),
    job: z
      .string()
      .min(1, t("forms.required"))
      .min(2, t("forms.minLength", { min: 2 }))
      .max(50, t("forms.maxLength", { max: 50 })),
  });

  type UserFormData = z.infer<typeof userSchema>;

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      job: "",
    },
  });

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (mode === "edit" && user) {
      form.reset({
        name: `${user.first_name} ${user.last_name}`,
        job: t("users.job"), // Default job since API doesn't provide this
      });
    } else {
      form.reset({
        name: "",
        job: "",
      });
    }
  }, [mode, user, isOpen, form, t]);

  const onSubmit = async (data: UserFormData) => {
    try {
      if (mode === "create") {
        await createUser(data).unwrap();
        toast({
          title: t("common.success"),
          description: t("users.userCreated"),
        });
      } else {
        await updateUser({ id: user!.id, ...data }).unwrap();
        toast({
          title: t("common.success"),
          description: t("users.userUpdated"),
        });
      }

      onSuccess();
    } catch (error: any) {
      toast({
        title: t("common.error"),
        description:
          error?.data?.error ||
          (mode === "create"
            ? t("users.userCreateError")
            : t("users.userUpdateError")),
        variant: "destructive",
      });
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === "create" ? (
              <>
                <Plus className="w-5 h-5" />
                {t("modals.createUser")}
              </>
            ) : (
              <>
                <Edit className="w-5 h-5" />
                {t("modals.editUser")}
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? t("modals.createUserDescription")
              : t("modals.editUserDescription")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("users.fullName")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("forms.enterFullName")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("users.job")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("forms.enterJob")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {mode === "create"
                      ? t("modals.creating")
                      : t("modals.updating")}
                  </>
                ) : mode === "create" ? (
                  t("users.newUser")
                ) : (
                  t("common.update")
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                {t("common.cancel")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
