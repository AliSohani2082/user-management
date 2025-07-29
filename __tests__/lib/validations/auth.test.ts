import {
  loginSchema,
  registerSchema,
  passwordSchema,
} from "@/lib/validations/auth";

describe("Authentication Validations", () => {
  describe("loginSchema", () => {
    it("should validate correct login data", () => {
      const validData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };

      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const invalidData = {
        username: "testuser",
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
        username: "testuser",
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

    it("should reject password without uppercase", () => {
      const weakPassword = "password123";
      const result = passwordSchema.safeParse(weakPassword);
      expect(result.success).toBe(false);
    });

    it("should reject short password", () => {
      const shortPassword = "Pa1";
      const result = passwordSchema.safeParse(shortPassword);
      expect(result.success).toBe(false);
    });
  });

  describe("registerSchema", () => {
    it("should validate correct registration data", () => {
      const validData = {
        username: "testuser",
        email: "test@example.com",
        password: "Password123",
        confirmPassword: "Password123",
      };

      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject mismatched passwords", () => {
      const invalidData = {
        username: "testuser",
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
