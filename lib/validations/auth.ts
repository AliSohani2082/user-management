import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "ایمیل الزامی است").email("فرمت ایمیل صحیح نیست"),
  password: z
    .string()
    .min(1, "رمز عبور الزامی است")
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
    .max(100, "رمز عبور نباید بیش از ۱۰۰ کاراکتر باشد"),
});

export const passwordSchema = z
  .string()
  .regex(/^.{5,20}$/, "تعداد حروف بین ۵ تا ۲۰ کاراکتر باشد")
  .regex(/[a-z]/, "حداقل یک حرف کوچک داشته باشد")
  .regex(/[A-Z]/, "حداقل یک حرف بزرگ داشته باشد")
  .regex(/\d/, "حداقل یک عدد داشته باشد");

export const registerSchema = z
  .object({
    email: z.string().min(1, "ایمیل الزامی است").email("فرمت ایمیل صحیح نیست"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن باید یکسان باشند",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
