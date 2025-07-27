import usersReducer, { setCurrentPage } from "@/store/slices/usersSlice"

describe("usersSlice", () => {
  const initialState = {
    currentPage: 1,
  }

  it("should return the initial state", () => {
    expect(usersReducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  it("should handle setCurrentPage", () => {
    const actual = usersReducer(initialState, setCurrentPage(3))
    expect(actual.currentPage).toBe(3)
  })

  it("should handle setCurrentPage with page 1", () => {
    const currentState = { currentPage: 5 }
    const actual = usersReducer(currentState, setCurrentPage(1))
    expect(actual.currentPage).toBe(1)
  })

  it("should handle setCurrentPage with large page number", () => {
    const actual = usersReducer(initialState, setCurrentPage(999))
    expect(actual.currentPage).toBe(999)
  })
})
