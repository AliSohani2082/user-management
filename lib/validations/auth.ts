import { z } from "zod";

export const createAuthSchema = (t: (key: string, values?: any) => string) => {
  const loginSchema = z.object({
    email: z
      .string()
      .min(1, t("forms.required"))
      .email(t("forms.invalidEmail")),
    password: z
      .string()
      .min(1, t("forms.required"))
      .min(6, t("forms.minLength", { min: 6 }))
      .max(100, t("forms.maxLength", { max: 100 })),
  });

  const passwordSchema = z
    .string()
    .regex(/^.{5,20}$/, t("forms.passwordRequirements.minMax"))
    .regex(/[a-z]/, t("forms.passwordRequirements.lowercase"));
  const registerSchema = z
    .object({
      email: z
        .string()
        .min(1, t("forms.required"))
        .email(t("forms.invalidEmail")),
      password: passwordSchema,
      confirmPassword: z.string().min(1, t("forms.required")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("forms.passwordMismatch"),
      path: ["confirmPassword"],
    });
  return { loginSchema, passwordSchema, registerSchema };
};

export type LoginFormData = z.infer<
  ReturnType<typeof createAuthSchema>["loginSchema"]
>;
export type RegisterFormData = z.infer<
  ReturnType<typeof createAuthSchema>["registerSchema"]
>;
export type PasswordSchema = ReturnType<
  typeof createAuthSchema
>["passwordSchema"];
