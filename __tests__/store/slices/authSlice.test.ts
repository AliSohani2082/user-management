import authReducer, { login, logout } from "@/store/slices/authSlice"

describe("authSlice", () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
  }

  it("should return the initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  it("should handle login", () => {
    const userData = {
      user: { email: "test@example.com", username: "testuser" },
      token: "test-token",
    }

    const actual = authReducer(initialState, login(userData))

    expect(actual.isAuthenticated).toBe(true)
    expect(actual.user).toEqual(userData.user)
    expect(actual.token).toBe(userData.token)
  })

  it("should handle logout", () => {
    const loggedInState = {
      isAuthenticated: true,
      user: { email: "test@example.com", username: "testuser" },
      token: "test-token",
    }

    const actual = authReducer(loggedInState, logout())

    expect(actual.isAuthenticated).toBe(false)
    expect(actual.user).toBe(null)
    expect(actual.token).toBe(null)
  })

  it("should handle login with partial user data", () => {
    const userData = {
      user: { email: "test@example.com" },
      token: "test-token",
    }

    const actual = authReducer(initialState, login(userData))

    expect(actual.isAuthenticated).toBe(true)
    expect(actual.user).toEqual(userData.user)
    expect(actual.token).toBe(userData.token)
  })
})
