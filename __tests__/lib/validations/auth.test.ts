import { createAuthSchema } from "@/lib/validations/auth";

const t = (key: string, values?: any) => key;

const { loginSchema, registerSchema, passwordSchema } = createAuthSchema(t);

describe("Authentication Validations", () => {
  describe("loginSchema", () => {
    it("should validate correct login data", () => {
      const validData = {
        email: "test@example.com",
        password: "password123",
      };

      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const invalidData = {
        email: "invalid-email",
        password: "password123",
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("email");
      }
    });

    it("should reject short password", () => {
      const invalidData = {
        email: "test@example.com",
        password: "123",
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("password");
      }
    });
  });

  describe("passwordSchema", () => {
    it("should validate strong password", () => {
      const strongPassword = "Password123";
      const result = passwordSchema.safeParse(strongPassword);
      expect(result.success).toBe(true);
    });

    it("should reject password without lowercase", () => {
      const weakPassword = "PASSWORD123";
      const result = passwordSchema.safeParse(weakPassword);
      expect(result.success).toBe(false);
    });
  });

  describe("registerSchema", () => {
    it("should validate correct registration data", () => {
      const validData = {
        email: "test@example.com",
        password: "Password123",
        confirmPassword: "Password123",
      };

      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject mismatched passwords", () => {
      const invalidData = {
        email: "test@example.com",
        password: "Password123",
        confirmPassword: "DifferentPassword123",
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("confirmPassword");
      }
    });
  });
});
