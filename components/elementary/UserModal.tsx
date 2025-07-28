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
import type { User as UserType } from "@/types/user";

const userSchema = z.object({
  name: z
    .string()
    .min(1, "نام کامل الزامی است")
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(100, "نام نباید بیش از ۱۰۰ کاراکتر باشد"),
  job: z
    .string()
    .min(1, "شغل الزامی است")
    .min(2, "شغل باید حداقل ۲ کاراکتر باشد")
    .max(50, "شغل نباید بیش از ۵۰ کاراکتر باشد"),
});

type UserFormData = z.infer<typeof userSchema>;

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
        job: "کاربر سیستم", // Default job since API doesn't provide this
      });
    } else {
      form.reset({
        name: "",
        job: "",
      });
    }
  }, [mode, user, isOpen, form]);

  const onSubmit = async (data: UserFormData) => {
    try {
      if (mode === "create") {
        await createUser(data).unwrap();
        toast({
          title: "موفقیت",
          description: "کاربر جدید با موفقیت ایجاد شد",
        });
      } else {
        await updateUser({ id: user!.id, ...data }).unwrap();
        toast({
          title: "موفقیت",
          description: "اطلاعات کاربر با موفقیت بروزرسانی شد",
        });
      }

      onSuccess();
    } catch (error: any) {
      toast({
        title: "خطا",
        description:
          error?.data?.error ||
          `خطا در ${mode === "create" ? "ایجاد" : "بروزرسانی"} کاربر`,
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
                ایجاد کاربر جدید
              </>
            ) : (
              <>
                <Edit className="w-5 h-5" />
                ویرایش کاربر
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "اطلاعات کاربر جدید را وارد کنید"
              : "اطلاعات کاربر را ویرایش کنید"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام کامل</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="نام و نام خانوادگی را وارد کنید"
                      {...field}
                    />
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
                  <FormLabel>شغل</FormLabel>
                  <FormControl>
                    <Input placeholder="شغل را وارد کنید" {...field} />
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
                      ? "در حال ایجاد..."
                      : "در حال بروزرسانی..."}
                  </>
                ) : mode === "create" ? (
                  "ایجاد کاربر"
                ) : (
                  "بروزرسانی"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                انصراف
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
